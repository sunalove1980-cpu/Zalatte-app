import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, getDocs, increment } from 'firebase/firestore';
import { UserProfile, CoupleRoom, BucketItem, Comment, NotificationTarget } from '../types';
import { ListChecks, Plus, Trash2, CheckSquare, Square, X, Award, Check, Pencil, MessageSquare, MessageSquareHeart } from 'lucide-react';
import { JaraLatteHero, JaraIcon, LatteIcon } from './Illustrations';
import { createNotification } from '../lib/notifications';

interface BucketTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

const BUCKET_SUGGESTIONS = [
  '제주도 한라산 일출 같이 보기 🏔️',
  '서로에게 손편지 보내기 ✉️',
  '커플 도자기 만들기 공방 체험 🏺',
  '교복 입고 놀이공원 가기 🎒',
  '비 오는 날 포장마차 데이트 🌧️',
  '함께 하프 마라톤 완주하기 🏃‍♂️🏃‍♀️',
];

export const BucketTab: React.FC<BucketTabProps> = ({ userProfile, coupleRoom, notificationTarget, onTargetHandled }) => {
  const [items, setItems] = useState<BucketItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<BucketItem | null>(null);
  const [title, setTitle] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  // Comment state
  const [activeCommentsItem, setActiveCommentsItem] = useState<BucketItem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  // 1. Fetch bucket list items in real-time
  useEffect(() => {
    const bucketRef = collection(db, 'bucketlist');
    const q = query(bucketRef, where('coupleId', '==', coupleRoom.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: BucketItem[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as BucketItem);
      });
      setItems(fetched);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching bucket list:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleRoom.id]);

  useEffect(() => {
    if (!notificationTarget || items.length === 0) return;
    const item = items.find((entry) => entry.id === notificationTarget.id);
    if (item) {
      if (notificationTarget.type === 'bucket_comment') setActiveCommentsItem(item);
      requestAnimationFrame(() => document.querySelector(`[data-bucket-id="${item.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    onTargetHandled?.();
  }, [items, notificationTarget, onTargetHandled]);

  // Fetch comments for active bucket list item in real-time
  useEffect(() => {
    if (!activeCommentsItem) return;

    const commentsRef = collection(db, 'bucketlist', activeCommentsItem.id, 'comments');
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const fetched: Comment[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Comment);
      });
      // Sort client-side by createdAt asc
      fetched.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeA - timeB;
      });
      setComments(fetched);
    }, (error) => {
      console.error('Error fetching bucket comments:', error);
    });

    return () => unsubscribe();
  }, [activeCommentsItem]);

  // Backfill comment counts for existing bucket list items
  useEffect(() => {
    if (items.length === 0) return;
    items.forEach(async (item) => {
      if (item.commentCount === undefined) {
        try {
          const commentsRef = collection(db, 'bucketlist', item.id, 'comments');
          const snapshot = await getDocs(commentsRef);
          await updateDoc(doc(db, 'bucketlist', item.id), {
            commentCount: snapshot.size
          });
        } catch (err) {
          console.error('Error backfilling bucket item comment count:', err);
        }
      }
    });
  }, [items]);

  // 2. Submit new/edit bucket item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingItem) {
      try {
        await updateDoc(doc(db, 'bucketlist', editingItem.id), {
          title: title.trim(),
          memo: memo.trim()
        });
        handleCloseModal();
      } catch (err) {
        console.error('Error updating bucket item:', err);
      }
    } else {
      const newItem = {
        coupleId: coupleRoom.id,
        title: title.trim(),
        memo: memo.trim(),
        isCompleted: false,
        completedAt: null,
        createdAt: new Date()
      };

      try {
        const itemRef = await addDoc(collection(db, 'bucketlist'), newItem);
        await createNotification({
          coupleId: coupleRoom.id,
          senderId: userProfile.uid,
          senderName: userProfile.displayName,
          senderCharacter: userProfile.characterType || 'jara',
          type: 'bucket_new',
          title: `새로운 버킷 리스트가 등록되었어요! 🎯`,
          body: title.trim(),
          targetId: itemRef.id
        });
        handleCloseModal();
      } catch (err) {
        console.error('Error adding bucket item:', err);
      }
    }
  };

  const handleOpenEdit = (item: BucketItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setMemo(item.memo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setTitle('');
    setMemo('');
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCommentsItem || !newCommentText.trim()) return;

    const commentText = newCommentText.trim();
    const newComment = {
      coupleId: coupleRoom.id,
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      authorCharacter: userProfile.characterType || 'jara',
      text: commentText,
      createdAt: new Date(),
      parentCommentId: replyingTo?.id || null,
      parentAuthorName: replyingTo?.authorName || null
    };

    try {
      await addDoc(collection(db, 'bucketlist', activeCommentsItem.id, 'comments'), newComment);
      await updateDoc(doc(db, 'bucketlist', activeCommentsItem.id), {
        commentCount: increment(1)
      });
      setActiveCommentsItem(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : null);
      setNewCommentText('');
      setReplyingTo(null);
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'bucket_comment',
        title: replyingTo ? `${userProfile.displayName}님이 ${replyingTo.authorName}님의 댓글에 답글을 달았어요! 💬` : `${userProfile.displayName}님이 우리 버킷 리스트에 댓글을 보냈어요! 💬`,
        body: commentText,
        targetId: activeCommentsItem.id
      });
    } catch (err) {
      console.error('Error posting bucket comment:', err);
      window.alert('댓글을 저장하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!activeCommentsItem) return;
    if (!window.confirm('댓글을 삭제할까요?')) return;

    try {
      await deleteDoc(doc(db, 'bucketlist', activeCommentsItem.id, 'comments', commentId));
      await updateDoc(doc(db, 'bucketlist', activeCommentsItem.id), {
        commentCount: increment(-1)
      });
      setActiveCommentsItem(prev => prev ? { ...prev, commentCount: Math.max(0, (prev.commentCount || 0) - 1) } : null);
    } catch (err) {
      console.error('Error deleting bucket comment:', err);
      window.alert('댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // Add suggestion quickly
  const handleAddSuggestion = async (suggestionText: string) => {
    const newItem = {
      coupleId: coupleRoom.id,
      title: suggestionText,
      memo: '커플 추천 리스트에서 바로 등록된 항목입니다 ✨',
      isCompleted: false,
      completedAt: null,
      createdAt: new Date()
    };

    try {
      const itemRef = await addDoc(collection(db, 'bucketlist'), newItem);
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'bucket_new',
        title: `새로운 버킷 리스트가 등록되었어요! 🎯`,
        body: suggestionText,
        targetId: itemRef.id
      });
    } catch (err) {
      console.error('Error adding suggestion:', err);
    }
  };

  // 3. Toggle completed state
  const handleToggleComplete = async (item: BucketItem) => {
    try {
      await updateDoc(doc(db, 'bucketlist', item.id), {
        isCompleted: !item.isCompleted,
        completedAt: !item.isCompleted ? new Date().toISOString().split('T')[0] : null
      });
    } catch (err) {
      console.error('Error toggling complete:', err);
    }
  };

  // 4. Delete item
  const handleDelete = async (id: string) => {
    if (!window.confirm('버킷리스트 항목을 지울까요?')) return;
    try {
      await deleteDoc(doc(db, 'bucketlist', id));
    } catch (err) {
      console.error('Error deleting bucket item:', err);
    }
  };

  // Calculate completion percentage
  const completedCount = items.filter(i => i.isCompleted).length;
  const totalCount = items.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks size={20} className="text-stone-700" />
          <div>
            <h2 className="text-base font-bold text-stone-800 tracking-tight">버킷리스트</h2>
            <p className="text-[11px] text-stone-500">함께 채워가는 꿈꾸는 목록</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-full shadow-md shadow-rose-100 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Main Area */}
      <div className="p-4 flex flex-col gap-5 max-w-md mx-auto w-full">
        
        {/* Progress dashboard (Scrapbook banner) */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-3 tracking-wide inline-flex items-center gap-1">
            🎯 OUR BUCKET PROGRESS
          </span>
          
          <div className="flex items-center gap-2 mb-2">
            <Award size={20} className="text-rose-500 fill-rose-100/50" />
            <span className="text-lg font-bold text-stone-800 font-sans">
              우리의 달성률: {completionPercentage}%
            </span>
          </div>

          <p className="text-[11px] text-stone-500 font-semibold mb-4">
            총 {totalCount}개 중 {completedCount}개 달성 완료!
          </p>

          {/* Progress bar */}
          <div className="w-full bg-stone-100 rounded-full h-4 overflow-hidden relative">
            <div
              className="bg-rose-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Bucket Items list */}
        {loading ? (
          <div className="text-center py-8 text-stone-500 text-sm">
            소중한 꿈 목록 정돈 중...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col items-center">
            <JaraLatteHero size={110} speechText="버킷을 정하자!" />
            
            <h3 className="font-bold text-stone-800 text-base mt-4 mb-1">버킷리스트가 비어 있어요</h3>
            <p className="text-xs text-stone-500 text-center leading-relaxed mb-6">
              함께 하고 싶은 사소하고 큰 꿈들을 적어보세요! 아래 추천 리스트에서 바로 골라 추가할 수도 있어요.
            </p>

            {/* Quick Suggestions list */}
            <div className="w-full flex flex-col gap-2">
              <span className="text-[11px] font-bold text-stone-700 self-start mb-1">💡 이런 활동 어때요?</span>
              {BUCKET_SUGGESTIONS.map((s, index) => (
                <button
                  key={index}
                  onClick={() => handleAddSuggestion(s)}
                  className="w-full text-left bg-stone-50 hover:bg-stone-100/80 border border-stone-200/60 rounded-xl p-3 text-xs text-stone-800 flex items-center justify-between font-semibold transition-all"
                >
                  <span className="truncate">{s}</span>
                  <span className="text-[11px] text-rose-500 font-bold shrink-0 ml-1">+ 추가</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                data-bucket-id={item.id}
                className={`bg-white border border-stone-100 p-4 rounded-2xl shadow-sm flex flex-col gap-3 transition-all hover:shadow-md ${
                  item.isCompleted ? 'opacity-70 bg-stone-50/50' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Completion Toggle checkbox */}
                    <button
                      onClick={() => handleToggleComplete(item)}
                      className="shrink-0 text-stone-700 hover:text-rose-500 transition mt-0.5"
                    >
                      {item.isCompleted ? (
                        <div className="bg-rose-400 border border-rose-400 rounded-xl p-0.5 text-white flex items-center justify-center w-[22px] h-[22px]">
                          <Check size={14} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-[22px] h-[22px] border border-stone-200 rounded-xl bg-stone-50 hover:bg-stone-100/50 transition"></div>
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <h4 className={`font-bold text-stone-850 text-sm tracking-tight ${
                        item.isCompleted ? 'line-through text-stone-400' : ''
                      }`}>
                        {item.title}
                      </h4>
                      {item.memo && (
                        <p className={`text-[11px] leading-relaxed mt-0.5 ${
                          item.isCompleted ? 'text-stone-300' : 'text-stone-500'
                        }`}>
                          {item.memo}
                        </p>
                      )}
                      {item.isCompleted && item.completedAt && (
                        <span className="text-[11px] bg-rose-50 text-rose-600 px-1.5 py-0.2 border border-rose-100 rounded-full font-bold mt-1 inline-block">
                          🎉 {item.completedAt} 완료!
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="text-stone-400 hover:text-blue-500 p-1.5 rounded-lg hover:bg-blue-50 transition"
                      title="수정"
                    >
                      <Pencil size={13} />
                    </button>

                    {/* Comments Button */}
                    <button
                      onClick={() => setActiveCommentsItem(item)}
                      className="text-stone-400 hover:text-amber-500 p-1.5 rounded-lg hover:bg-amber-50 transition flex items-center gap-1"
                      title="댓글"
                    >
                      <MessageSquare size={13} />
                      <span className="text-[11px] font-bold">{item.commentCount || 0}</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition"
                      title="삭제"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- CREATION / EDIT DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-stone-100 rounded-3xl w-full max-w-md p-6 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-850 text-base">
                {editingItem ? '🎯 버킷리스트 항목 수정' : '🎯 버킷리스트 항목 추가'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 hover:bg-stone-50 rounded-full transition"
              >
                <X size={18} className="text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">하고 싶은 일 (제목) 📌</label>
                <input
                  type="text"
                  placeholder="예: 우리 한라산 등반하기"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  maxLength={50}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">간단한 메모 (생략 가능) 📝</label>
                <input
                  type="text"
                  placeholder="등반 코스나 필요한 준비물 등을 간략히 남겨주세요..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  maxLength={100}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 rounded-full shadow-md shadow-rose-100 text-sm transition-all"
              >
                {editingItem ? '수정 완료하기 ✨' : '등록하기 ✨'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- COMMENTS BOTTOM SHEET / MODAL --- */}
      {activeCommentsItem && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-end justify-center backdrop-blur-xs">
          <div className="bg-white border-t border-x border-stone-200 rounded-t-3xl w-full max-w-md p-5 flex flex-col h-[70vh] shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <div className="flex items-center gap-1.5">
                <MessageSquareHeart size={18} className="text-rose-500" />
                <h3 className="font-bold text-stone-850 text-sm">버킷 댓글 창</h3>
                <span className="text-[11px] bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full font-bold">
                  {comments.length}개
                </span>
              </div>
              <button
                onClick={() => setActiveCommentsItem(null)}
                className="p-1.5 hover:bg-stone-50 rounded-full transition"
              >
                <X size={18} className="text-stone-600" />
              </button>
            </div>

            {/* List of comments */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1 mb-4">
              {comments.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8 text-center text-stone-500 text-xs">
                  <p>아직 남겨진 댓글이 없어요.</p>
                  <p className="mt-1">버킷에 대한 이야기를 파트너와 나누어보세요! ❤️</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`flex items-start gap-2.5 bg-stone-50/50 p-3 rounded-2xl border border-stone-200/40 ${comment.parentCommentId ? 'ml-7 border-l-2 border-l-rose-200' : ''}`}
                  >
                    {/* Character Avatar */}
                    {comment.authorCharacter === 'jara' ? (
                      <JaraIcon size={28} className="bg-stone-100 border border-stone-200/40 rounded-full shrink-0" />
                    ) : (
                      <LatteIcon size={28} className="bg-white border border-stone-200/40 rounded-full shrink-0" />
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-bold text-[11px] text-stone-700 truncate">{comment.authorName}</span>
                        
                        <div className="flex items-center gap-1">
                          {/* timestamp */}
                          <span className="text-[11px] text-stone-400">
                            {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString('ko-KR', {
                              month: 'numeric',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : '방금 전'}
                          </span>

                          {comment.authorId === userProfile.uid && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="flex min-h-9 min-w-9 items-center justify-center rounded-full text-stone-400 hover:bg-red-50 hover:text-red-500"
                              title="댓글 삭제"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed font-sans break-all">
                        {comment.parentAuthorName && <span className="text-rose-500 font-semibold">@{comment.parentAuthorName} </span>}
                        {comment.text}
                      </p>
                      <button type="button" onClick={() => setReplyingTo(comment)} className="mt-1 min-h-9 rounded-lg px-2 text-xs font-semibold text-stone-500 hover:bg-rose-50 hover:text-rose-500">답글</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Form at bottom */}
            {replyingTo && <div className="mb-1 flex items-center justify-between rounded-xl bg-rose-50 px-3 py-1.5 text-[11px] text-rose-600"><span>{replyingTo.authorName}님에게 답글</span><button type="button" onClick={() => setReplyingTo(null)}>취소</button></div>}
            <form onSubmit={handlePostComment} className="flex gap-2 items-center bg-stone-50 border border-stone-200 p-2 rounded-2xl focus-within:border-stone-400 focus-within:bg-white transition-all">
              <input
                type="text"
                placeholder="댓글을 입력해 보세요..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 text-xs bg-transparent focus:outline-none text-stone-850 placeholder-stone-400 px-2"
                maxLength={200}
                required
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-rose-400 hover:bg-rose-500 text-white text-xs font-semibold py-1.5 px-4 rounded-full shadow-sm hover:scale-102 active:scale-98 transition-all"
              >
                남기기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
