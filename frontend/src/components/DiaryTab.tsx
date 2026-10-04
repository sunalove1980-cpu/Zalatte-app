import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, arrayUnion, arrayRemove, limit, getDocs, increment } from 'firebase/firestore';
import { UserProfile, CoupleRoom, DiaryEntry, Comment, NotificationTarget } from '../types';
import { JaraIcon, LatteIcon, JaraLatteHero, JaraLiftingLatte, JaraLatteSleeping } from './Illustrations';
import { Heart, MessageCircle, Calendar, Plus, Trash2, Edit2, X, ChevronRight, MessageSquareHeart, Camera, Upload, Image } from 'lucide-react';
import { moodMap, compressAndEncodeImage } from '../utils';
import { createNotification } from '../lib/notifications';

interface DiaryTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

const formatTime = (createdAt: any) => {
  if (!createdAt) return '';
  const dateObj = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
  if (isNaN(dateObj.getTime())) return '';
  return dateObj.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const PRESET_IMAGES = [
  { id: 'preset_hero', name: '우린 짱이야!', render: () => <JaraLatteHero size={100} speechText="우린 짱이야!" /> },
  { id: 'preset_lifting', name: '내꼬 채고!', render: () => <JaraLiftingLatte size={100} speechText="사랑해!" /> },
  { id: 'preset_sleeping', name: 'Zzz 잠꾸러기', render: () => <JaraLatteSleeping size={110} /> },
];

export const DiaryTab: React.FC<DiaryTabProps> = ({ userProfile, coupleRoom, notificationTarget, onTargetHandled }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  
  // New/Edit entry fields
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [mood, setMood] = useState<'happy' | 'love' | 'tired' | 'sad' | 'angry' | 'excited'>('happy');
  const [selectedPreset, setSelectedPreset] = useState<string>('preset_hero');
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string>('');
  const [photoType, setPhotoType] = useState<'preset' | 'upload' | 'url'>('preset');
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comments sidebar/modal state
  const [activeCommentsDiary, setActiveCommentsDiary] = useState<DiaryEntry | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  // Fetch shared diary entries in real-time
  useEffect(() => {
    const entriesRef = collection(db, 'diaries');
    const q = query(
      entriesRef,
      where('coupleId', '==', coupleRoom.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: DiaryEntry[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as DiaryEntry);
      });
      // Client-side sort by date descending, then createdAt descending to avoid index requirement
      fetched.sort((a, b) => {
        const dateA = a.date || '';
        const dateB = b.date || '';
        if (dateB !== dateA) {
          return dateB.localeCompare(dateA);
        }
        const timeA = (a.createdAt as any)?.seconds || 0;
        const timeB = (b.createdAt as any)?.seconds || 0;
        return timeB - timeA;
      });
      setEntries(fetched);
      setLoading(false);
    }, (error) => {
      console.error('Error listening to diaries:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleRoom.id]);

  useEffect(() => {
    if (!notificationTarget || entries.length === 0) return;
    const entry = entries.find((item) => item.id === notificationTarget.id);
    if (entry) {
      if (notificationTarget.type === 'diary_comment') setActiveCommentsDiary(entry);
      requestAnimationFrame(() => document.querySelector(`[data-diary-id="${entry.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    onTargetHandled?.();
  }, [entries, notificationTarget, onTargetHandled]);

  // Fetch comments for active diary in real-time
  useEffect(() => {
    if (!activeCommentsDiary) return;

    const commentsRef = collection(db, 'diaries', activeCommentsDiary.id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Comment[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(fetched);
    });

    return () => unsubscribe();
  }, [activeCommentsDiary]);

  // Backfill comment counts for existing diaries
  useEffect(() => {
    if (entries.length === 0) return;
    entries.forEach(async (entry) => {
      if (entry.commentCount === undefined) {
        try {
          const commentsRef = collection(db, 'diaries', entry.id, 'comments');
          const snapshot = await getDocs(commentsRef);
          await updateDoc(doc(db, 'diaries', entry.id), {
            commentCount: snapshot.size
          });
        } catch (err) {
          console.error('Error backfilling diary comment count:', err);
        }
      }
    });
  }, [entries]);

  // Handle file selection & compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      const compressed = await compressAndEncodeImage(file, 800, 800);
      setUploadedBase64(compressed);
    } catch (err) {
      console.error('Error compressing file:', err);
      setUploadedBase64(null);
      alert(err instanceof Error ? err.message : '이미지를 가공하는 데 실패했습니다. 다른 이미지를 사용해 보세요.');
    } finally {
      e.target.value = '';
      setIsCompressing(false);
    }
  };

  // Handle open form (add mode)
  const openAddForm = () => {
    setDate(new Date().toISOString().split('T')[0]);
    setTitle('');
    setContent('');
    setMood('happy');
    setSelectedPreset('preset_hero');
    setCustomPhotoUrl('');
    setUploadedBase64(null);
    setPhotoType('preset');
    setEditingEntry(null);
    setIsFormOpen(true);
  };

  // Handle open form (edit mode)
  const openEditForm = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setDate(entry.date);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    if (entry.photoUrl && entry.photoUrl.startsWith('preset_')) {
      setSelectedPreset(entry.photoUrl);
      setPhotoType('preset');
    } else if (entry.photoUrl && entry.photoUrl.startsWith('data:image')) {
      setUploadedBase64(entry.photoUrl);
      setPhotoType('upload');
    } else {
      setCustomPhotoUrl(entry.photoUrl || '');
      setPhotoType(entry.photoUrl ? 'url' : 'preset');
    }
    setIsFormOpen(true);
  };

  // Handle submit diary form
  const handleSubmitDiary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    let photoUrl = '';
    if (photoType === 'preset') {
      photoUrl = selectedPreset;
    } else if (photoType === 'upload') {
      photoUrl = uploadedBase64 || '';
    } else if (photoType === 'url') {
      photoUrl = customPhotoUrl.trim();
    }

    const entryData = {
      coupleId: coupleRoom.id,
      date,
      title: title.trim(),
      content: content.trim(),
      mood,
      photoUrl,
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      authorCharacter: userProfile.characterType || 'jara',
      likes: editingEntry ? editingEntry.likes : [],
      createdAt: editingEntry ? editingEntry.createdAt : new Date(),
    };

    try {
      if (editingEntry) {
        // Update existing
        await updateDoc(doc(db, 'diaries', editingEntry.id), entryData);
      } else {
        // Add new
        const entryRef = await addDoc(collection(db, 'diaries'), entryData);
        await createNotification({
          coupleId: coupleRoom.id,
          senderId: userProfile.uid,
          senderName: userProfile.displayName,
          senderCharacter: userProfile.characterType || 'jara',
          type: 'diary_new',
          title: `${userProfile.displayName}님이 오늘 일기를 작성했어요! ✍️`,
          body: title.trim(),
          targetId: entryRef.id
        });
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error('Error saving diary entry:', err);
    }
  };

  // Delete diary entry
  const handleDeleteDiary = async (id: string) => {
    if (!window.confirm('정말로 이 다이어리 글을 삭제하시겠어요? 😢')) return;
    try {
      await deleteDoc(doc(db, 'diaries', id));
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  // Toggle Heart Like
  const handleToggleLike = async (entry: DiaryEntry) => {
    const isLiked = entry.likes.includes(userProfile.uid);
    const entryRef = doc(db, 'diaries', entry.id);

    try {
      await updateDoc(entryRef, {
        likes: isLiked ? arrayRemove(userProfile.uid) : arrayUnion(userProfile.uid)
      });

      // If liked, send notification
      if (!isLiked) {
        await createNotification({
          coupleId: coupleRoom.id,
          senderId: userProfile.uid,
          senderName: userProfile.displayName,
          senderCharacter: userProfile.characterType || 'jara',
          type: 'diary_like',
          title: `${userProfile.displayName}님이 우리 일기에 하트를 보냈어요! ❤️`,
          body: entry.title,
          targetId: entry.id
        });
      }
    } catch (err) {
      console.error('Error updating like:', err);
    }
  };

  // Handle post comment
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentsDiary) return;

    const commentText = newCommentText.trim();
    const newComment: Omit<Comment, 'id'> = {
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
      await addDoc(collection(db, 'diaries', activeCommentsDiary.id, 'comments'), newComment);
      await updateDoc(doc(db, 'diaries', activeCommentsDiary.id), {
        commentCount: increment(1)
      });
      setNewCommentText('');
      setReplyingTo(null);

      // Send notification
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'diary_comment',
        title: replyingTo
          ? `${userProfile.displayName}님이 ${replyingTo.authorName}님의 댓글에 답글을 달았어요! 💬`
          : `${userProfile.displayName}님이 우리 일기에 댓글을 달았어요! 💬`,
        body: commentText,
        targetId: activeCommentsDiary.id
      });
    } catch (err) {
      console.error('Error adding comment:', err);
      window.alert('댓글을 저장하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId: string) => {
    if (!activeCommentsDiary || !window.confirm('댓글을 삭제할까요?')) return;
    try {
      await deleteDoc(doc(db, 'diaries', activeCommentsDiary.id, 'comments', commentId));
      await updateDoc(doc(db, 'diaries', activeCommentsDiary.id), {
        commentCount: increment(-1)
      });
    } catch (err) {
      console.error('Error deleting comment:', err);
      window.alert('댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-24">
      {/* Tab Header with cute icons */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <JaraIcon size={34} className="border border-stone-200 rounded-full bg-stone-50" />
            <LatteIcon size={34} className="border border-stone-200 rounded-full bg-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-800 tracking-tight">공동 다이어리</h2>
            <p className="text-[11px] text-stone-500">우리의 소중한 나날들</p>
          </div>
        </div>

        <button
          onClick={openAddForm}
          className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-full shadow-md shadow-rose-100 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Diary List Area */}
      <div className="flex-1 p-4 flex flex-col gap-6 max-w-md mx-auto w-full">
        {loading ? (
          <div className="text-center py-12 text-amber-800/60 font-medium text-sm">
            소중한 추억 불러오는 중...
          </div>
        ) : entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-stone-100 rounded-3xl shadow-sm">
            <JaraLatteSleeping size={140} />
            <h3 className="font-bold text-stone-800 text-base mt-4 mb-1">아직 작성된 일기가 없어요</h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              첫 추억을 기록해 보실래요?<br />
              상단의 <span className="font-bold text-rose-500">+ 버튼</span>을 눌러 일기를 시작해 보세요!
            </p>
            <button
              onClick={openAddForm}
              className="bg-rose-400 hover:bg-rose-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-md shadow-rose-100 text-sm transition-all"
            >
              오늘 일기 쓰기 ✍️
            </button>
          </div>
        ) : (
          entries.map((entry) => {
            const moodInfo = moodMap[entry.mood];
            const isLikedByMe = entry.likes.includes(userProfile.uid);
            
            return (
              <div
                key={entry.id}
                data-diary-id={entry.id}
                className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col relative transition-all hover:shadow-md"
              >
                {/* Scrapbook decoration sticker */}
                <div className="absolute -top-3 left-6 bg-rose-50 border border-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-600 rounded-full tracking-wider uppercase shadow-xs">
                  {entry.date}
                </div>

                {/* Header info */}
                <div className="flex items-center justify-between mt-1 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-stone-500 font-bold flex items-center gap-1">
                      <Calendar size={13} className="text-stone-400" />
                      {entry.date}
                      {formatTime(entry.createdAt) && (
                        <span className="text-stone-400 text-[11px] font-normal pl-0.5">
                          {formatTime(entry.createdAt)}
                        </span>
                      )}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-semibold ${moodInfo.color}`}>
                      {moodInfo.emoji} {moodInfo.label}
                    </span>
                  </div>

                  {/* Actions (Edit/Delete) */}
                  {entry.authorId === userProfile.uid && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditForm(entry)}
                        className="text-stone-400 hover:text-stone-800 p-1 hover:bg-stone-50 rounded-lg transition"
                        title="수정"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteDiary(entry.id)}
                        className="text-stone-400 hover:text-red-500 p-1 hover:bg-stone-50 rounded-lg transition"
                        title="삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Post Illustration/Photo */}
                {entry.photoUrl && (
                  <div className="w-full bg-stone-50 border border-stone-100 rounded-2xl p-3 mb-4 flex items-center justify-center overflow-hidden">
                    {entry.photoUrl.startsWith('preset_') ? (
                      PRESET_IMAGES.find(img => img.id === entry.photoUrl)?.render() || null
                    ) : (
                      <img
                        src={entry.photoUrl}
                        alt="일기 사진"
                        referrerPolicy="no-referrer"
                        className="max-h-48 object-contain rounded-xl w-full border border-stone-100"
                        onError={(e) => {
                          // fallback if custom url is broken
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Title and Content */}
                <h3 className="font-bold text-stone-800 text-base mb-2 font-sans tracking-tight">
                  {entry.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans whitespace-pre-wrap mb-4">
                  {entry.content}
                </p>

                {/* Footer section (Author profile, Heart and Comment toggle) */}
                <div className="border-t border-stone-100 pt-3 flex items-center justify-between text-xs text-stone-500">
                  {/* Author information */}
                  <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/40 px-2.5 py-0.5 rounded-full">
                    {entry.authorCharacter === 'jara' ? (
                      <JaraIcon size={18} className="bg-stone-100 rounded-full" />
                    ) : (
                      <LatteIcon size={18} className="bg-white rounded-full" />
                    )}
                    <span className="font-bold text-[11px] text-stone-700">{entry.authorName}</span>
                  </div>

                  {/* Likes and Comments Counters */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleLike(entry)}
                      className={`flex items-center gap-1 font-bold transition hover:scale-105 ${
                        isLikedByMe ? 'text-rose-500' : 'text-stone-400 hover:text-stone-600'
                      }`}
                    >
                      <Heart size={14} fill={isLikedByMe ? 'currentColor' : 'none'} />
                      <span>{entry.likes.length}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCommentsDiary(entry);
                        setComments([]);
                      }}
                      className="flex items-center gap-1 font-bold text-stone-400 hover:text-stone-600"
                    >
                      <MessageCircle size={14} />
                      <span>댓글 {entry.commentCount || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* --- FORM DIALOG (Add / Edit Diary) --- */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-stone-100 rounded-3xl w-full max-w-md p-6 flex flex-col shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-base">
                {editingEntry ? '✍️ 일기 수정하기' : '✍️ 오늘 일기 쓰기'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 hover:bg-stone-50 rounded-full transition"
              >
                <X size={18} className="text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitDiary} className="flex flex-col gap-4">
              {/* Date selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">날짜 📅</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  required
                />
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">제목 📌</label>
                <input
                  type="text"
                  placeholder="제목을 적어주세요..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  required
                />
              </div>

              {/* Mood picker */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">오늘의 기분 💭</label>
                <div className="grid grid-cols-6 gap-1">
                  {(Object.keys(moodMap) as Array<keyof typeof moodMap>).map((key) => {
                    const m = moodMap[key];
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setMood(key)}
                        className={`flex flex-col items-center p-1.5 rounded-xl border text-[11px] font-semibold transition ${
                          mood === key
                            ? 'border-rose-400 bg-rose-50/70 text-rose-700 font-bold'
                            : 'border-stone-200 bg-white hover:border-stone-300'
                        }`}
                      >
                        <span className="text-base mb-0.5">{m.emoji}</span>
                        <span className="scale-90 text-stone-500">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Options: Presets vs Device Upload vs Custom URL */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-stone-700">일기 스티커/사진 🎨</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPhotoType('preset')}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition ${
                        photoType === 'preset' ? 'bg-stone-800 text-white border-stone-850' : 'bg-transparent text-stone-500 border-stone-200 hover:text-stone-700'
                      }`}
                    >
                      스티커
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoType('upload')}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition ${
                        photoType === 'upload' ? 'bg-stone-800 text-white border-stone-850' : 'bg-transparent text-stone-500 border-stone-200 hover:text-stone-700'
                      }`}
                    >
                      사진 업로드
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoType('url')}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition ${
                        photoType === 'url' ? 'bg-stone-800 text-white border-stone-850' : 'bg-transparent text-stone-500 border-stone-200 hover:text-stone-700'
                      }`}
                    >
                      URL
                    </button>
                  </div>
                </div>

                {photoType === 'preset' && (
                  <div className="grid grid-cols-3 gap-2 p-2 bg-stone-50 border border-stone-200 rounded-xl">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        type="button"
                        key={img.id}
                        onClick={() => setSelectedPreset(img.id)}
                        className={`p-1 border rounded-xl flex flex-col items-center justify-center bg-white h-20 transition ${
                          selectedPreset === img.id
                            ? 'border-rose-400 bg-rose-50/30 scale-102'
                            : 'border-stone-200/60 bg-white hover:border-stone-300/80'
                        }`}
                      >
                        <div className="scale-60 origin-center h-12 flex items-center justify-center">
                          {img.render()}
                        </div>
                        <span className="text-[11px] font-semibold text-stone-500 mt-1">{img.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {photoType === 'upload' && (
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex flex-col items-center justify-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {uploadedBase64 ? (
                      <div className="relative w-full max-h-40 rounded-lg overflow-hidden border border-stone-200 flex items-center justify-center bg-black/5">
                        <img
                          src={uploadedBase64}
                          alt="Uploaded Preview"
                          className="max-h-40 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={() => setUploadedBase64(null)}
                          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isCompressing}
                        className="w-full h-24 border border-dashed border-stone-300 hover:border-rose-300 bg-white rounded-xl flex flex-col items-center justify-center gap-2 text-stone-500 hover:text-rose-500 transition-all font-semibold text-xs"
                      >
                        {isCompressing ? (
                          <span className="animate-pulse">이미지 처리 중...</span>
                        ) : (
                          <>
                            <Upload size={18} className="text-stone-400" />
                            <span>기기에서 사진 선택하기</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {photoType === 'url' && (
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={customPhotoUrl}
                    onChange={(e) => setCustomPhotoUrl(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  />
                )}
              </div>

              {/* Diary Content */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">내용 📝</label>
                <textarea
                  placeholder="오늘 어떤 특별한 일이나 기쁜 일이 있었나요? 파트너와 나누고 싶은 이야기를 들려주세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={4}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-855 focus:outline-none resize-none leading-relaxed focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 rounded-full shadow-md shadow-rose-100 text-sm transition-all"
              >
                {editingEntry ? '수정 완료하기' : '소중한 일기 저장하기'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- COMMENTS BOTTOM SHEET / MODAL --- */}
      {activeCommentsDiary && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-end justify-center backdrop-blur-xs">
          <div className="bg-white border-t border-x border-stone-200 rounded-t-3xl w-full max-w-md p-5 flex flex-col h-[70vh] shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <div className="flex items-center gap-1.5">
                <MessageSquareHeart size={18} className="text-rose-500" />
                <h3 className="font-bold text-stone-850 text-sm">댓글 창</h3>
                <span className="text-[11px] bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full font-bold">
                  {comments.length}개
                </span>
              </div>
              <button
                onClick={() => setActiveCommentsDiary(null)}
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
                  <p className="mt-1">첫 번째 따뜻한 마음을 전해보세요! ❤️</p>
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
                placeholder="마음을 담은 댓글을 남겨보세요..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 text-xs bg-transparent focus:outline-none text-stone-800 placeholder-stone-400 px-2"
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
