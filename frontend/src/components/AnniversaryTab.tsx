import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { UserProfile, CoupleRoom, Anniversary, NotificationTarget } from '../types';
import { calculateDaysDiff, generateMilestones, GeneratedMilestone } from '../utils';
import { Calendar, Plus, Trash2, Gift, Heart, Sparkles, X, Clock } from 'lucide-react';
import { JaraLiftingLatte } from './Illustrations';
import { createNotification } from '../lib/notifications';

interface AnniversaryTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

export const AnniversaryTab: React.FC<AnniversaryTabProps> = ({ userProfile, coupleRoom, notificationTarget, onTargetHandled }) => {
  const [customAnniversaries, setCustomAnniversaries] = useState<Anniversary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [memo, setMemo] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!notificationTarget || customAnniversaries.length === 0) return;
    const item = customAnniversaries.find((entry) => entry.id === notificationTarget.id);
    if (item) {
      setActiveTab(new Date(`${item.date}T00:00:00`).getTime() >= new Date().setHours(0, 0, 0, 0) ? 'upcoming' : 'past');
      requestAnimationFrame(() => document.querySelector(`[data-anniversary-id="${item.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    }
    onTargetHandled?.();
  }, [customAnniversaries, notificationTarget, onTargetHandled]);

  // 1. Fetch custom anniversaries in real-time
  useEffect(() => {
    const anniRef = collection(db, 'anniversaries');
    const q = query(anniRef, where('coupleId', '==', coupleRoom.id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched: Anniversary[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...doc.data() } as Anniversary);
      });
      setCustomAnniversaries(fetched);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching anniversaries:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [coupleRoom.id]);

  // 2. Generate standard milestones based on start date
  const systemMilestones = generateMilestones(coupleRoom.startDate);

  // 3. Combine custom and system anniversaries, calculate D-days
  const allAnniversaries: Array<{
    id: string;
    title: string;
    date: string;
    memo: string;
    isSystem: boolean;
    daysDiff: number; // positive = past, negative = future, 0 = today
    ddayText: string;
  }> = [
    // Add custom ones
    ...customAnniversaries.map((a) => {
      const calc = calculateDaysDiff(a.date);
      return {
        id: a.id,
        title: a.title,
        date: a.date,
        memo: a.memo,
        isSystem: false,
        daysDiff: calc.days,
        ddayText: calc.text
      };
    }),
    // Add system milestones
    ...systemMilestones.map((m, index) => {
      const calc = calculateDaysDiff(m.date);
      return {
        id: `sys_${index}`,
        title: m.title,
        date: m.date,
        memo: '자동으로 계산된 연인과의 기념일이에요 ✨',
        isSystem: true,
        daysDiff: calc.days,
        ddayText: calc.text
      };
    })
  ];

  // 4. Split and sort
  const today = new Date();
  today.setHours(0,0,0,0);

  // Upcoming: future or today (daysDiff <= 0)
  const upcomingList = allAnniversaries
    .filter((a) => a.daysDiff <= 0)
    .sort((a, b) => b.daysDiff - a.daysDiff); // closest to 0 first (since future is negative, e.g., -5 is closer than -10)

  // Past: daysDiff > 0
  const pastList = allAnniversaries
    .filter((a) => a.daysDiff > 0)
    .sort((a, b) => a.daysDiff - b.daysDiff); // closest past date first

  // 5. Total days since start date
  const daysSinceMet = calculateDaysDiff(coupleRoom.startDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const anniData = {
      coupleId: coupleRoom.id,
      title: title.trim(),
      date,
      memo: memo.trim(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'anniversaries', editingId), anniData);
      } else {
        const anniversaryRef = await addDoc(collection(db, 'anniversaries'), anniData);
        await createNotification({
          coupleId: coupleRoom.id,
          senderId: userProfile.uid,
          senderName: userProfile.displayName,
          senderCharacter: userProfile.characterType || 'jara',
          type: 'anniversary_new',
          title: `소중한 우리 기념일이 새로 등록되었어요! 🎉`,
          body: `[${date}] ${title.trim()}`,
          targetId: anniversaryRef.id
        });
      }
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error saving anniversary:', err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDate(new Date().toISOString().split('T')[0]);
    setMemo('');
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('기념일을 정말 삭제할까요?')) return;
    try {
      await deleteDoc(doc(db, 'anniversaries', id));
    } catch (err) {
      console.error('Error deleting anniversary:', err);
    }
  };

  const handleEdit = (a: { id: string; title: string; date: string; memo: string }) => {
    setEditingId(a.id);
    setTitle(a.title);
    setDate(a.date);
    setMemo(a.memo);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-rose-400 fill-rose-100" />
          <div>
            <h2 className="text-base font-bold text-stone-800 tracking-tight">기념일 관리</h2>
            <p className="text-[11px] text-stone-500">소중한 기념일 카운트다운</p>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-rose-400 hover:bg-rose-500 text-white p-2 rounded-full shadow-md shadow-rose-100 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Main Panel */}
      <div className="p-4 flex flex-col gap-5 max-w-md mx-auto w-full">
        
        {/* Days Count Hero banner (Scrapbook frame) */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
          {/* Heart watermark decoration */}
          <div className="absolute -right-6 -bottom-6 text-rose-50/70 scale-150 rotate-12 pointer-events-none">
            <Heart size={120} className="fill-rose-50 stroke-rose-100" />
          </div>

          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100 mb-2 inline-flex items-center gap-1">
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            우리가 함께 사랑한 시간
          </span>

          <h3 className="text-3xl font-bold text-stone-800 font-sans tracking-wide">
            {daysSinceMet.days >= 0 ? `${daysSinceMet.days + 1}일째` : '만남 대기 중!'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            처음 만난 날: <span className="font-semibold underline decoration-rose-200">{coupleRoom.startDate}</span>
          </p>

          <JaraLiftingLatte size={110} speechText="우리는 함께라 짱이야!" />
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 bg-stone-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Clock size={14} />
            다가오는 기념일 ({upcomingList.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'past'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Calendar size={14} />
            지나온 추억 ({pastList.length})
          </button>
        </div>

        {/* List Content */}
        {loading ? (
          <div className="text-center py-8 text-stone-500 text-xs">
            기념일 계산 중...
          </div>
        ) : (activeTab === 'upcoming' ? upcomingList : pastList).length === 0 ? (
          <div className="text-center py-12 bg-white border border-stone-100 rounded-3xl text-stone-400 text-xs shadow-sm">
            기록된 일정이 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {(activeTab === 'upcoming' ? upcomingList : pastList).map((item) => {
              // Custom vs System icon
              const isCustom = !item.isSystem;
              
              // Formatting countdown text beautifully
              let badgeColor = 'bg-stone-50 text-stone-700 border-stone-200';
              let badgeText = item.ddayText;
              
              if (item.daysDiff === 0) {
                badgeColor = 'bg-rose-500 text-white border-rose-600 animate-pulse';
                badgeText = 'Today! 💖';
              } else if (item.daysDiff < 0) {
                // Future countdown: e.g. D-15
                badgeColor = 'bg-rose-50 text-rose-600 border-rose-100';
              }

              return (
                <div
                  key={item.id}
                  data-anniversary-id={item.id}
                  className={`bg-white border border-stone-100 p-4 rounded-2xl shadow-sm flex items-center justify-between gap-3 transition-all hover:shadow-md ${
                    item.daysDiff === 0 ? 'ring-2 ring-rose-400' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-xl border shrink-0 ${isCustom ? 'bg-stone-50 border-stone-200/60' : 'bg-rose-50/50 border-rose-100/50'}`}>
                      {isCustom ? <Gift size={16} className="text-stone-700" /> : <Heart size={16} className="text-rose-500 fill-rose-500" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-bold text-stone-800 text-sm tracking-tight truncate">
                          {item.title}
                        </h4>
                        {!isCustom && (
                          <span className="text-[11px] font-semibold text-rose-500 border border-rose-200 bg-rose-50 px-1.5 py-0.2 rounded-full">
                            공식
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-400 font-semibold mb-0.5">{item.date}</p>
                      {item.memo && (
                        <p className="text-[11px] text-stone-500 leading-normal truncate max-w-[200px]">
                          {item.memo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-[11px] font-semibold border px-2.5 py-1 rounded-full shadow-xs ${badgeColor}`}>
                      {badgeText}
                    </span>

                    {/* Delete/Edit Actions for custom items */}
                    {isCustom && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 px-2 py-0.5 rounded-md border border-stone-200 bg-stone-50/50"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-[11px] font-semibold text-red-500 hover:bg-red-50 px-2 py-0.5 rounded-md border border-red-100"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- ANNIVERSARY CREATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-stone-100 rounded-3xl w-full max-w-md p-6 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-800 text-base">
                {editingId ? '🎁 기념일 수정하기' : '🎁 새로운 기념일 등록'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1.5 hover:bg-stone-50 rounded-full transition"
              >
                <X size={18} className="text-stone-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">기념일 제목 📌</label>
                <input
                  type="text"
                  placeholder="예: 백일, 자라 생일, 첫 여행 등"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  maxLength={40}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">날짜 📅</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">기념일 메모 (생략 가능) 📝</label>
                <input
                  type="text"
                  placeholder="추가적인 할 일이나 선물 아이디어를 적어보세요..."
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all"
                  maxLength={100}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 rounded-full shadow-md shadow-rose-100 text-sm transition-all"
              >
                {editingId ? '수정 완료하기' : '소중한 기념일 저장'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
