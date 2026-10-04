import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, orderBy, updateDoc, getDocs, increment } from 'firebase/firestore';
import { UserProfile, CoupleRoom, AlbumPhoto, Comment, NotificationTarget } from '../types';
import { Plus, Trash2, Image as ImageIcon, Camera, Calendar, X, Heart, MessageSquare, Edit2 } from 'lucide-react';
import { JaraIcon, LatteIcon } from './Illustrations';
import { compressAndEncodeImage } from '../utils';
import { createNotification } from '../lib/notifications';

interface AlbumTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

export const AlbumTab: React.FC<AlbumTabProps> = ({ userProfile, coupleRoom, notificationTarget, onTargetHandled }) => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<AlbumPhoto | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [editCaption, setEditCaption] = useState('');
  const [editDate, setEditDate] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset editing state on photo change
  useEffect(() => {
    setIsEditingPhoto(false);
  }, [selectedPhoto?.id]);

  // 1. Fetch Album Photos
  useEffect(() => {
    const q = query(
      collection(db, 'album'),
      where('coupleId', '==', coupleRoom.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: AlbumPhoto[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as AlbumPhoto);
      });
      // Client-side sort by date descending to avoid index requirement
      list.sort((a, b) => {
        const dateA = a.date || '';
        const dateB = b.date || '';
        if (dateB !== dateA) {
          return dateB.localeCompare(dateA);
        }
        const timeA = (a.createdAt as any)?.seconds || 0;
        const timeB = (b.createdAt as any)?.seconds || 0;
        return timeB - timeA;
      });
      setPhotos(list);
    }, (error) => {
      console.error("Error fetching album:", error);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  useEffect(() => {
    if (!notificationTarget || photos.length === 0) return;
    const photo = photos.find((item) => item.id === notificationTarget.id);
    if (photo) setSelectedPhoto(photo);
    onTargetHandled?.();
  }, [photos, notificationTarget, onTargetHandled]);

  // Fetch comments for selected photo in real-time
  useEffect(() => {
    if (!selectedPhoto) {
      setComments([]);
      return;
    }

    const commentsRef = collection(db, 'album', selectedPhoto.id, 'comments');
    const q = query(commentsRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Comment[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Comment);
      });
      setComments(fetched);
    }, (error) => {
      console.error('Error fetching album comments:', error);
    });

    return () => unsubscribe();
  }, [selectedPhoto?.id]);

  // Backfill comment counts for existing photos
  useEffect(() => {
    if (photos.length === 0) return;
    photos.forEach(async (photo) => {
      if (photo.commentCount === undefined) {
        try {
          const commentsRef = collection(db, 'album', photo.id, 'comments');
          const snapshot = await getDocs(commentsRef);
          await updateDoc(doc(db, 'album', photo.id), {
            commentCount: snapshot.size
          });
        } catch (err) {
          console.error('Error backfilling album photo comment count:', err);
        }
      }
    });
  }, [photos]);

  // Handle Toggle Like (Heart)
  const handleToggleLike = async (photo: AlbumPhoto) => {
    try {
      const likes = photo.likes || [];
      const hasLiked = likes.includes(userProfile.uid);
      const newLikes = hasLiked
        ? likes.filter((uid) => uid !== userProfile.uid)
        : [...likes, userProfile.uid];

      await updateDoc(doc(db, 'album', photo.id), {
        likes: newLikes
      });

      // Update selectedPhoto state if open to show heart instantly
      if (selectedPhoto && selectedPhoto.id === photo.id) {
        setSelectedPhoto({ ...selectedPhoto, likes: newLikes });
      }

      // If liked, send notification
      if (!hasLiked) {
        await createNotification({
          coupleId: coupleRoom.id,
          senderId: userProfile.uid,
          senderName: userProfile.displayName,
          senderCharacter: userProfile.characterType || 'jara',
          type: 'album_like',
          title: `${userProfile.displayName}님이 우리 사진에 하트를 눌렀어요! ❤️`,
          body: photo.caption,
          targetId: photo.id
        });
      }
    } catch (err) {
      console.error('Error toggling photo like:', err);
    }
  };

  // Handle Post Comment
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto || !newCommentText.trim()) return;

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
      await addDoc(collection(db, 'album', selectedPhoto.id, 'comments'), newComment);
      await updateDoc(doc(db, 'album', selectedPhoto.id), {
        commentCount: increment(1)
      });
      setSelectedPhoto(prev => prev ? { ...prev, commentCount: (prev.commentCount || 0) + 1 } : null);
      setNewCommentText('');
      setReplyingTo(null);

      // Send notification
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'album_comment',
        title: replyingTo ? `${userProfile.displayName}님이 ${replyingTo.authorName}님의 댓글에 답글을 달았어요! 💬` : `${userProfile.displayName}님이 우리 사진에 댓글을 보냈어요! 💬`,
        body: commentText,
        targetId: selectedPhoto.id
      });
    } catch (err) {
      console.error('Error posting photo comment:', err);
      window.alert('댓글을 저장하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async (commentId: string) => {
    if (!selectedPhoto) return;
    if (!window.confirm('댓글을 정말 삭제할까요?')) return;

    try {
      await deleteDoc(doc(db, 'album', selectedPhoto.id, 'comments', commentId));
      await updateDoc(doc(db, 'album', selectedPhoto.id), {
        commentCount: increment(-1)
      });
      setSelectedPhoto(prev => prev ? { ...prev, commentCount: Math.max(0, (prev.commentCount || 0) - 1) } : null);
    } catch (err) {
      console.error('Error deleting photo comment:', err);
      window.alert('댓글을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  // Handle Update Photo Caption & Date
  const handleUpdatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto) return;

    try {
      await updateDoc(doc(db, 'album', selectedPhoto.id), {
        caption: editCaption.trim() || '소중한 우리 순간 ❤️',
        date: editDate
      });

      // Update local state instantly for lightbox
      setSelectedPhoto({
        ...selectedPhoto,
        caption: editCaption.trim() || '소중한 우리 순간 ❤️',
        date: editDate
      });

      setIsEditingPhoto(false);
    } catch (err) {
      console.error('Error updating photo:', err);
      alert('사진 수정에 실패했습니다.');
    }
  };

  // 2. Handle file selection & compression
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      // Compress to max 800px on either side, quality 0.7 to optimize for Firestore document size limits
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

  // 3. Handle Submit
  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedBase64) return;

    try {
      setIsSubmitting(true);
      const newPhoto: Omit<AlbumPhoto, 'id'> = {
        coupleId: coupleRoom.id,
        photoUrl: uploadedBase64,
        caption: caption.trim() || '소중한 우리 순간 ❤️',
        date,
        authorId: userProfile.uid,
        authorName: userProfile.displayName,
        authorCharacter: userProfile.characterType || 'jara',
        createdAt: new Date(),
        likes: []
      };

      const photoRef = await addDoc(collection(db, 'album'), newPhoto);

      // Send notification
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'album_new',
        title: `${userProfile.displayName}님이 추억 앨범에 새 사진을 보관했어요! 📸`,
        body: caption.trim() || '소중한 우리 순간 ❤️',
        targetId: photoRef.id
      });

      // Reset Form States
      setCaption('');
      setUploadedBase64(null);
      setDate(new Date().toISOString().split('T')[0]);
      setShowUploadForm(false);
    } catch (err) {
      console.error('Error uploading to album:', err);
      alert('앨범 사진 추가에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle Delete Photo
  const handleDeletePhoto = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('이 앨범 사진을 완전히 삭제하시겠습니까?')) return;

    try {
      await deleteDoc(doc(db, 'album', id));
      if (selectedPhoto?.id === id) {
        setSelectedPhoto(null);
      }
    } catch (err) {
      console.error('Error deleting photo:', err);
    }
  };

  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-28">
      {/* Tab Header */}
      <div className="bg-white border-b border-stone-200/80 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-black text-stone-800 tracking-tight flex items-center gap-2">
          <ImageIcon className="text-rose-400" size={22} />
          추억 앨범
        </h1>
        <button
          onClick={() => {
            setUploadedBase64(null);
            setShowUploadForm(true);
          }}
          className="bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-md flex items-center gap-1 transition"
        >
          <Plus size={14} /> 사진 등록
        </button>
      </div>

      <div className="px-4 py-5 space-y-5">
        
        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-lg relative animate-fade-in">
            <button
              onClick={() => {
                setUploadedBase64(null);
                setShowUploadForm(false);
              }}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-50 transition"
            >
              <X size={16} />
            </button>

            <h3 className="font-black text-sm text-stone-800 mb-3.5 flex items-center gap-1">
              📸 새로운 추억 사진 등록
            </h3>

            <form onSubmit={handleUploadPhoto} className="space-y-4">
              {/* Photo Input Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-200 hover:border-rose-300 bg-stone-50/50 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden"
              >
                {uploadedBase64 ? (
                  <img 
                    src={uploadedBase64} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : isCompressing ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-stone-400 font-bold">이미지 리사이징 중...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-stone-400 gap-1.5 p-4 text-center">
                    <Camera size={32} className="text-stone-300" />
                    <span className="text-xs font-bold text-stone-600">이곳을 클릭하여 사진 선택</span>
                    <span className="text-[11px] text-stone-400">사진 파일이 직접 업로드됩니다.</span>
                  </div>
                )}
              </div>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Caption */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">한 줄 설명</label>
                <input
                  type="text"
                  placeholder="예: 주말 한강 돗자리 피크닉 🍃, 첫 영화관 데이트!"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-xl bg-stone-50/50 focus:outline-hidden focus:border-rose-400"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">추억 날짜</label>
                <div className="relative flex items-center">
                  <Calendar size={14} className="absolute left-3 text-stone-400" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 border border-stone-200 rounded-xl bg-stone-50/50 focus:outline-hidden focus:border-rose-400"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !uploadedBase64}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition disabled:opacity-50"
                >
                  {isSubmitting ? '사진 보관 중...' : '앨범에 보관하기 🧸'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Polaroid Scrapbook Photos list */}
        {photos.length === 0 ? (
          <div className="bg-white border border-dashed border-stone-200 rounded-3xl py-14 px-5 text-center text-xs text-stone-400">
            <Heart size={32} className="mx-auto text-stone-300 stroke-1 mb-2 animate-pulse" />
            우리 둘만의 사진첩이 아직 비어 있어요 🖼️
            <p className="text-[11px] text-stone-400 mt-1">첫 번째 추억 사진을 등록해 보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {photos.map((ph) => (
              <div
                key={ph.id}
                onClick={() => setSelectedPhoto(ph)}
                className="bg-white border border-stone-200/50 p-2.5 rounded-lg shadow-md transform hover:-rotate-1 hover:scale-102 transition duration-200 cursor-pointer flex flex-col justify-between"
                style={{ fontFamily: '"Nanum Pen Script", cursive, sans-serif' }}
              >
                {/* Photo frame */}
                <div className="aspect-square w-full rounded-md overflow-hidden bg-stone-100 border border-stone-100 relative">
                  <img 
                    src={ph.photoUrl} 
                    alt={ph.caption} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Delete button (only overlays photo subtly) */}
                  <button
                    onClick={(e) => handleDeletePhoto(ph.id, e)}
                    className="absolute top-1.5 right-1.5 bg-black/50 hover:bg-red-500/80 text-white p-1 rounded-full transition"
                    title="추억 삭제"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>

                {/* Polaroid hand-drawn style caption area */}
                <div className="pt-2 px-1 text-stone-800">
                  <p className="text-xs font-bold line-clamp-1 leading-tight tracking-tight">
                    {ph.caption}
                  </p>
                  
                  <div className="flex items-center justify-between mt-1 border-t border-dashed border-stone-100 pt-1 text-[11px] text-stone-400 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span>{ph.date}</span>
                      {Array.isArray(ph.likes) && ph.likes.length > 0 && (
                        <span className="flex items-center text-rose-500 gap-0.5 font-bold">
                          <Heart size={9} className="fill-rose-500 text-rose-500" />
                          {ph.likes.length}
                        </span>
                      )}
                      {ph.commentCount !== undefined && ph.commentCount > 0 && (
                        <span className="flex items-center text-rose-500 gap-0.5 font-bold">
                          <MessageSquare size={9} className="text-rose-400 fill-rose-400" />
                          {ph.commentCount}
                        </span>
                      )}
                    </div>
                    <div className="w-5 h-5 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0">
                      {ph.authorCharacter === 'jara' ? <JaraIcon size={14} /> : <LatteIcon size={14} />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 5. Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-stone-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Full Photo Box */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-white p-4.5 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
          >
            <div className="w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200 relative">
              <img 
                src={selectedPhoto.photoUrl} 
                alt={selectedPhoto.caption} 
                className="w-full h-auto max-h-[45vh] object-contain mx-auto"
              />
            </div>

            <div className="mt-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                {selectedPhoto.authorCharacter === 'jara' ? <JaraIcon size={32} /> : <LatteIcon size={32} />}
              </div>

              {isEditingPhoto ? (
                <form onSubmit={handleUpdatePhoto} className="flex-1 space-y-2.5">
                  <input
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border border-stone-200 rounded-lg focus:outline-hidden focus:border-rose-400 font-bold"
                    placeholder="한 줄 설명 수정..."
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="flex-1 text-[11px] px-2.5 py-1 border border-stone-200 rounded-lg focus:outline-hidden focus:border-rose-400 font-mono"
                      required
                    />
                    <div className="flex gap-1">
                      <button
                        type="submit"
                        className="bg-rose-400 hover:bg-rose-500 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingPhoto(false)}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-[11px] px-2.5 py-1 rounded-lg transition cursor-pointer"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-stone-800 text-sm leading-snug break-words">
                      {selectedPhoto.caption}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-400 font-mono">
                      <span>📅 {selectedPhoto.date}</span>
                      <span>•</span>
                      <span>보관인: {selectedPhoto.authorName}</span>
                    </div>
                  </div>

                  {/* Heart and trash buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleLike(selectedPhoto)}
                      className={`p-2 rounded-xl transition cursor-pointer ${
                        Array.isArray(selectedPhoto.likes) && selectedPhoto.likes.includes(userProfile.uid)
                          ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                          : 'bg-stone-50 text-stone-400 hover:text-stone-600'
                      }`}
                      title="하트 보내기"
                    >
                      <Heart size={16} className={Array.isArray(selectedPhoto.likes) && selectedPhoto.likes.includes(userProfile.uid) ? 'fill-rose-500 text-rose-500' : ''} />
                    </button>

                    <button
                      onClick={() => {
                        setEditCaption(selectedPhoto.caption);
                        setEditDate(selectedPhoto.date);
                        setIsEditingPhoto(true);
                      }}
                      className="text-stone-400 hover:text-rose-500 hover:bg-stone-50 p-2 rounded-xl transition cursor-pointer"
                      title="사진 수정"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={(e) => handleDeletePhoto(selectedPhoto.id, e)}
                      className="text-stone-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition cursor-pointer"
                      title="사진 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Likes count info */}
            {Array.isArray(selectedPhoto.likes) && selectedPhoto.likes.length > 0 && (
              <div className="mt-2 text-[11px] text-rose-500 font-bold bg-rose-50/50 px-3 py-1.5 rounded-lg flex items-center gap-1 animate-fade-in">
                <Heart size={12} className="fill-rose-500 text-rose-500" />
                <span>우리가 채운 하트 {selectedPhoto.likes.length}개! 💖</span>
              </div>
            )}

            {/* Comments subcollection section */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-3">
              <h4 className="text-xs font-black text-stone-700 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-rose-400" />
                추억 댓글 ({comments.length})
              </h4>

              {/* Comments list inside lightbox */}
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <p className="text-[11px] text-stone-400 text-center py-4">아직 소중한 소감이 없어요. 첫 인사를 전해 보세요! 💬</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className={`flex gap-2.5 text-xs bg-stone-50/70 p-2 rounded-xl border border-stone-100 ${comment.parentCommentId ? 'ml-6 border-l-2 border-l-rose-200' : ''}`}>
                      <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                        {comment.authorCharacter === 'jara' ? <JaraIcon size={18} /> : <LatteIcon size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-700 text-[11px]">{comment.authorName}</span>
                          {comment.authorId === userProfile.uid && (
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="flex min-h-9 min-w-9 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-500"
                              title="댓글 삭제"
                            >
                              <Trash2 size={17} />
                            </button>
                          )}
                        </div>
                        <p className="text-stone-600 leading-normal mt-0.5 break-words whitespace-pre-wrap text-[11px]">{comment.parentAuthorName && <span className="text-rose-500 font-semibold">@{comment.parentAuthorName} </span>}{comment.text}</p>
                        <button type="button" onClick={() => setReplyingTo(comment)} className="mt-1 min-h-9 rounded-lg px-2 text-xs font-semibold text-stone-500 hover:bg-rose-50 hover:text-rose-500">답글</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Comment submission form */}
              {replyingTo && <div className="flex items-center justify-between rounded-xl bg-rose-50 px-3 py-1.5 text-[11px] text-rose-600"><span>{replyingTo.authorName}님에게 답글</span><button type="button" onClick={() => setReplyingTo(null)}>취소</button></div>}
              <form onSubmit={handlePostComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="추억에 숟가락 얹기..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 border border-stone-200 rounded-xl bg-stone-50/50 focus:outline-hidden focus:border-rose-400"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="bg-rose-400 hover:bg-rose-500 disabled:opacity-40 text-white font-bold text-xs px-3 py-2 rounded-xl transition cursor-pointer shrink-0"
                >
                  보내기
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
