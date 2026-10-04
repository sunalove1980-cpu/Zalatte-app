import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { UserProfile, CoupleRoom, Schedule, Comment, NotificationTarget } from '../types';
import { Plus, Trash2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, Clock, MessageCircle } from 'lucide-react';
import { JaraIcon, LatteIcon } from './Illustrations';
import { createNotification } from '../lib/notifications';

interface ScheduleTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

export const ScheduleTab: React.FC<ScheduleTabProps> = ({ userProfile, coupleRoom, notificationTarget, onTargetHandled }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  // Add Schedule Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [color, setColor] = useState('#F87171'); // default red-400
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCommentsSchedule, setActiveCommentsSchedule] = useState<Schedule | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);

  const colors = [
    { hex: '#F87171', name: '자라레드' },
    { hex: '#FB923C', name: '라떼오렌지' },
    { hex: '#FBBF24', name: '골드옐로' },
    { hex: '#34D399', name: '포레스트그린' },
    { hex: '#60A5FA', name: '코스믹블루' },
    { hex: '#C084FC', name: '라벤더퍼플' },
  ];

  // 1. Fetch Schedules Real-time
  useEffect(() => {
    const q = query(
      collection(db, 'schedules'),
      where('coupleId', '==', coupleRoom.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Schedule[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Schedule);
      });
      // Sort by creation or title
      setSchedules(list);
    }, (error) => {
      console.error('Error fetching schedules:', error);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  useEffect(() => {
    if (!notificationTarget || schedules.length === 0) return;
    const schedule = schedules.find((item) => item.id === notificationTarget.id);
    if (schedule) {
      const targetDate = new Date(`${schedule.date}T00:00:00`);
      setCurrentDate(targetDate);
      setSelectedDateStr(schedule.date);
      if (notificationTarget.type === 'schedule_comment') setActiveCommentsSchedule(schedule);
      requestAnimationFrame(() => document.querySelector(`[data-schedule-id="${schedule.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    onTargetHandled?.();
  }, [schedules, notificationTarget, onTargetHandled]);

  useEffect(() => {
    if (!activeCommentsSchedule) {
      setComments([]);
      return;
    }
    const commentsQuery = query(collection(db, 'schedules', activeCommentsSchedule.id, 'comments'), orderBy('createdAt', 'asc'));
    return onSnapshot(commentsQuery, (snapshot) => {
      setComments(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as Comment)));
    }, (error) => console.error('Error fetching schedule comments:', error));
  }, [activeCommentsSchedule?.id]);

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  // Create grid cells
  const calendarCells: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevYear = month === 0 ? year - 1 : year;
    const prevMon = month === 0 ? 11 : month - 1;
    const dNum = prevMonthDays - i;
    calendarCells.push({
      dateStr: `${prevYear}-${String(prevMon + 1).padStart(2, '0')}-${String(dNum).padStart(2, '0')}`,
      dayNum: dNum,
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({
      dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      dayNum: i,
      isCurrentMonth: true,
    });
  }

  // Next month padding to fill grid of 42 cells
  const totalCellsNeeded = 42;
  const nextMonthPaddingCount = totalCellsNeeded - calendarCells.length;
  for (let i = 1; i <= nextMonthPaddingCount; i++) {
    const nextYear = month === 11 ? year + 1 : year;
    const nextMon = month === 11 ? 0 : month + 1;
    calendarCells.push({
      dateStr: `${nextYear}-${String(nextMon + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
      dayNum: i,
      isCurrentMonth: false,
    });
  }

  // Handle Add Schedule Submission
  const handleAddSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      const newSchedule = {
        coupleId: coupleRoom.id,
        title: title.trim(),
        date: selectedDateStr,
        memo: memo.trim(),
        color,
        authorId: userProfile.uid,
        authorName: userProfile.displayName,
        authorCharacter: userProfile.characterType || 'jara',
        createdAt: new Date(),
      };

      const scheduleRef = await addDoc(collection(db, 'schedules'), newSchedule);
      
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: userProfile.characterType || 'jara',
        type: 'schedule_new',
        title: `우리 새로운 스케줄이 추가되었어요! 📅`,
        body: `[${selectedDateStr}] ${title.trim()}`,
        targetId: scheduleRef.id
      });
      
      // Reset form
      setTitle('');
      setMemo('');
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding schedule:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete Schedule
  const handleDeleteSchedule = async (id: string) => {
    if (!window.confirm('이 일정을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'schedules', id));
    } catch (err) {
      console.error('Error deleting schedule:', err);
    }
  };

  const handlePostComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeCommentsSchedule || !newCommentText.trim()) return;
    const commentText = newCommentText.trim();
    await addDoc(collection(db, 'schedules', activeCommentsSchedule.id, 'comments'), {
      coupleId: coupleRoom.id,
      authorId: userProfile.uid,
      authorName: userProfile.displayName,
      authorCharacter: userProfile.characterType || 'jara',
      text: commentText,
      createdAt: new Date(),
      parentCommentId: replyingTo?.id || null,
      parentAuthorName: replyingTo?.authorName || null,
    });
    await updateDoc(doc(db, 'schedules', activeCommentsSchedule.id), { commentCount: increment(1) });
    await createNotification({
      coupleId: coupleRoom.id,
      senderId: userProfile.uid,
      senderName: userProfile.displayName,
      senderCharacter: userProfile.characterType || 'jara',
      type: 'schedule_comment',
      title: replyingTo ? `${userProfile.displayName}님이 ${replyingTo.authorName}님의 댓글에 답글을 달았어요! 💬` : `${userProfile.displayName}님이 일정에 댓글을 달았어요! 💬`,
      body: commentText,
      targetId: activeCommentsSchedule.id,
    });
    setNewCommentText('');
    setReplyingTo(null);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!activeCommentsSchedule) return;
    await deleteDoc(doc(db, 'schedules', activeCommentsSchedule.id, 'comments', commentId));
    await updateDoc(doc(db, 'schedules', activeCommentsSchedule.id), { commentCount: increment(-1) });
  };

  // Group schedules by date for easy calendar lookups
  const schedulesByDate = schedules.reduce((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
    return groups;
  }, {} as Record<string, Schedule[]>);

  const selectedDateSchedules = schedulesByDate[selectedDateStr] || [];

  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-28">
      {/* Tab Header */}
      <div className="bg-white border-b border-stone-200/80 px-6 py-4 sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-black text-stone-800 tracking-tight flex items-center gap-2">
          <CalendarIcon className="text-rose-400" size={22} />
          우리 스케줄 공유
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-full shadow-md flex items-center gap-1 transition"
        >
          <Plus size={14} /> 일정 추가
        </button>
      </div>

      <div className="px-4 py-5 space-y-5">
        
        {/* 1. Pure React Calendar UI */}
        <div className="bg-white border border-stone-200/60 rounded-3xl p-4.5 shadow-xs">
          
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-base font-black text-stone-800 tracking-tight font-mono">
              {year}년 {month + 1}월
            </h2>
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => {
                  setCurrentDate(new Date());
                  setSelectedDateStr(new Date().toISOString().split('T')[0]);
                }}
                className="text-[11px] font-bold bg-stone-100 text-stone-600 px-2 py-1 rounded-md hover:bg-stone-200 transition"
              >
                오늘
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-600 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-stone-400 mb-2">
            <span className="text-rose-400">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-blue-400">토</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-x-1 gap-y-2">
            {calendarCells.map((cell, idx) => {
              const isSelected = cell.dateStr === selectedDateStr;
              const isToday = cell.dateStr === new Date().toISOString().split('T')[0];
              const cellSchedules = schedulesByDate[cell.dateStr] || [];
              const dayOfWeek = idx % 7;

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDateStr(cell.dateStr)}
                  className={`relative aspect-square flex flex-col items-center justify-between py-1.5 rounded-2xl transition cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-rose-100 text-rose-700 border border-rose-200 font-extrabold shadow-inner' 
                      : isToday
                        ? 'bg-stone-100 text-stone-900 border border-stone-200/60 font-bold'
                        : cell.isCurrentMonth
                          ? 'hover:bg-stone-50 text-stone-800'
                          : 'text-stone-300'
                  }`}
                >
                  {/* Date number */}
                  <span className={`text-xs ${
                    dayOfWeek === 0 && cell.isCurrentMonth && !isSelected ? 'text-rose-400' : ''
                  } ${
                    dayOfWeek === 6 && cell.isCurrentMonth && !isSelected ? 'text-blue-400' : ''
                  }`}>
                    {cell.dayNum}
                  </span>

                  {/* Schedule indicators (little dots) */}
                  <div className="flex gap-0.5 justify-center mt-auto h-1.5 w-full overflow-hidden max-w-[80%]">
                    {cellSchedules.map((sch) => (
                      <div
                        key={sch.id}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: sch.color || '#F87171' }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* 2. Add Schedule Popup Form */}
        {showAddForm && (
          <div className="bg-white border border-rose-100 rounded-3xl p-5 shadow-lg relative animate-fade-in">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-50 transition"
            >
              <X size={16} />
            </button>

            <h3 className="font-black text-sm text-stone-800 mb-3 flex items-center gap-1">
              🗓️ {selectedDateStr} 일정 추가
            </h3>

            <form onSubmit={handleAddSchedule} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">일정명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 맛있는 저녁 먹기 🍕, 100일 기념 여행 ✈️"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-xl bg-stone-50/50 focus:outline-hidden focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1">상세 내용 (메모)</label>
                <textarea
                  placeholder="시간, 장소 또는 메모를 적어주세요..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  rows={2}
                  className="w-full text-xs px-3 py-2 border border-stone-200 rounded-xl bg-stone-50/50 focus:outline-hidden focus:border-rose-400 resize-none"
                />
              </div>

              {/* Color badgespicker */}
              <div>
                <label className="block text-[11px] font-bold text-stone-500 mb-1.5">테마 컬러</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setColor(c.hex)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition border ${
                        color === c.hex ? 'border-stone-800 scale-110 shadow-md ring-2 ring-stone-200' : 'border-stone-200/60'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {color === c.hex && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs py-2.5 rounded-xl transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition disabled:opacity-50"
                >
                  {isSubmitting ? '등록 중...' : '등록 완료'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 3. Schedules list for selected date */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-sm text-stone-800 tracking-tight flex items-center gap-1.5">
              <Clock size={16} className="text-stone-400" />
              {selectedDateStr}의 일정 ({selectedDateSchedules.length}개)
            </h3>
          </div>

          {selectedDateSchedules.length === 0 ? (
            <div className="bg-white/60 border border-dashed border-stone-200 rounded-3xl py-10 px-5 text-center text-xs text-stone-400">
              이 날 등록된 일정이 없어요 🍿
              <button
                onClick={() => setShowAddForm(true)}
                className="block mx-auto mt-2 text-rose-500 hover:underline font-bold text-[11px]"
              >
                첫 일정 등록하러 가기!
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {selectedDateSchedules.map((sch) => {
                const isAuthor = sch.authorId === userProfile.uid;

                return (
                  <div
                    key={sch.id}
                    data-schedule-id={sch.id}
                    className="bg-white border border-stone-200/60 rounded-3xl p-4.5 shadow-xs flex items-start gap-3 relative overflow-hidden"
                  >
                    {/* Color Accent Indicator Strip */}
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-1.5"
                      style={{ backgroundColor: sch.color || '#F87171' }}
                    />

                    {/* Author Icon */}
                    <div className="w-8 h-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5 ml-1">
                      {sch.authorCharacter === 'jara' ? <JaraIcon size={24} /> : <LatteIcon size={24} />}
                    </div>

                    {/* Schedule detail info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <h4 className="font-black text-sm text-stone-800 tracking-tight break-words">
                          {sch.title}
                        </h4>
                        
                        <button
                          onClick={() => handleDeleteSchedule(sch.id)}
                          className="text-stone-300 hover:text-red-500 p-1 rounded-md hover:bg-stone-50 shrink-0 transition"
                          title="삭제"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {sch.memo && (
                        <p className="text-xs text-stone-500 mt-1 leading-relaxed bg-stone-50 rounded-xl px-3 py-1.5 inline-block w-full break-words border border-stone-100">
                          {sch.memo}
                        </p>
                      )}

                      <button onClick={() => setActiveCommentsSchedule(sch)} className="mt-2 flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-100">
                        <MessageCircle size={11} /> 댓글 {sch.commentCount || 0}
                      </button>
                      <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-stone-400 font-bold">
                        <span>작성자: {sch.authorName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {activeCommentsSchedule && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center sm:p-4" onClick={() => setActiveCommentsSchedule(null)}>
          <div className="flex max-h-[75vh] w-full max-w-md flex-col rounded-t-3xl bg-white p-4 shadow-2xl sm:rounded-3xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between border-b border-stone-100 pb-3">
              <div><p className="text-[11px] text-stone-400">일정 댓글</p><h3 className="text-sm font-black text-stone-800">{activeCommentsSchedule.title}</h3></div>
              <button onClick={() => setActiveCommentsSchedule(null)} className="rounded-full p-2 text-stone-400 hover:bg-stone-100"><X size={17} /></button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1">
              {comments.length === 0 && <p className="py-8 text-center text-xs text-stone-400">아직 댓글이 없어요. 일정 이야기를 나눠보세요.</p>}
              {comments.map((comment) => (
                <div key={comment.id} className={`flex gap-2 rounded-2xl border border-stone-100 bg-stone-50 p-3 ${comment.parentCommentId ? 'ml-7 border-l-2 border-l-rose-200' : ''}`}>
                  {comment.authorCharacter === 'jara' ? <JaraIcon size={25} /> : <LatteIcon size={25} />}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between"><span className="text-xs font-bold text-stone-700">{comment.authorName}</span>{comment.authorId === userProfile.uid && <button onClick={() => handleDeleteComment(comment.id)} title="댓글 삭제" className="flex min-h-9 min-w-9 items-center justify-center rounded-full text-stone-400 hover:bg-red-50 hover:text-red-500"><Trash2 size={17} /></button>}</div>
                    <p className="break-words text-xs text-stone-600">{comment.parentAuthorName && <span className="font-semibold text-rose-500">@{comment.parentAuthorName} </span>}{comment.text}</p>
                    <button onClick={() => setReplyingTo(comment)} className="mt-1 min-h-9 rounded-lg px-2 text-xs font-semibold text-stone-500 hover:bg-rose-50 hover:text-rose-500">답글</button>
                  </div>
                </div>
              ))}
            </div>
            {replyingTo && <div className="mt-2 flex items-center justify-between rounded-xl bg-rose-50 px-3 py-1.5 text-[11px] text-rose-600"><span>{replyingTo.authorName}님에게 답글</span><button onClick={() => setReplyingTo(null)}>취소</button></div>}
            <form onSubmit={handlePostComment} className="mt-2 flex gap-2 rounded-2xl border border-stone-200 bg-stone-50 p-2">
              <input value={newCommentText} onChange={(event) => setNewCommentText(event.target.value)} maxLength={200} placeholder="댓글을 입력해 보세요..." className="min-w-0 flex-1 bg-transparent px-2 text-xs outline-none" />
              <button disabled={!newCommentText.trim()} className="rounded-full bg-rose-400 px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40">남기기</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
