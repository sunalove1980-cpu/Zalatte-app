import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, updateDoc, collection, query, where, onSnapshot, increment, orderBy, limit } from 'firebase/firestore';
import { UserProfile, CoupleRoom, Anniversary, BucketItem } from '../types';
import { Heart, Camera, Calendar, CalendarHeart, ChevronRight, Plus, HeartHandshake, BookOpen, Bell } from 'lucide-react';
import { JaraIcon, LatteIcon } from './Illustrations';
import { compressAndEncodeImage, generateMilestones } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface HomeTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  onTabChange: (tab: 'diary' | 'anniversary' | 'bucket' | 'calendar' | 'weeklyDate' | 'album' | 'notifications' | 'settings') => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ userProfile, coupleRoom, onTabChange }) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [buckets, setBuckets] = useState<BucketItem[]>([]);
  const [diaryCount, setDiaryCount] = useState<number>(0);
  const [scheduleCount, setScheduleCount] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notifications State & Helpers
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [welcomeSummaries, setWelcomeSummaries] = useState<string[]>([]);

  // Helper to aggregate notifications by type
  const aggregateNotifications = (notifs: any[]) => {
    const counts: Record<string, { count: number; senderName: string }> = {};
    
    notifs.forEach(n => {
      const key = n.type;
      if (!counts[key]) {
        counts[key] = { count: 0, senderName: n.senderName || '상대방' };
      }
      counts[key].count += 1;
    });

    const lines: string[] = [];
    
    if (counts['diary_new']) {
      lines.push(`${counts['diary_new'].senderName}님이 새로운 일기를 ${counts['diary_new'].count}개 작성했습니다. ✍️`);
    }
    if (counts['diary_comment']) {
      lines.push(`${counts['diary_comment'].senderName}님이 우리 일기에 댓글을 ${counts['diary_comment'].count}개 달았습니다. 💬`);
    }
    if (counts['diary_like']) {
      lines.push(`${counts['diary_like'].senderName}님이 우리 일기에 하트를 ${counts['diary_like'].count}개 보냈습니다. ❤️`);
    }
    if (counts['album_new']) {
      lines.push(`${counts['album_new'].senderName}님이 추억 앨범에 사진을 ${counts['album_new'].count}장 올렸습니다. 📸`);
    }
    if (counts['album_comment']) {
      lines.push(`${counts['album_comment'].senderName}님이 우리 사진에 댓글을 ${counts['album_comment'].count}개 달았습니다. 💬`);
    }
    if (counts['album_like']) {
      lines.push(`${counts['album_like'].senderName}님이 우리 사진에 하트를 ${counts['album_like'].count}개 보냈습니다. ❤️`);
    }
    if (counts['bucket_new']) {
      lines.push(`${counts['bucket_new'].senderName}님이 버킷리스트를 ${counts['bucket_new'].count}개 등록했습니다. 🎯`);
    }
    if (counts['bucket_comment']) {
      lines.push(`${counts['bucket_comment'].senderName}님이 버킷리스트에 댓글을 ${counts['bucket_comment'].count}개 달았습니다. 💬`);
    }
    if (counts['schedule_new']) {
      lines.push(`${counts['schedule_new'].senderName}님이 우리 일정에 일정 ${counts['schedule_new'].count}개를 등록했습니다. 📅`);
    }
    if (counts['schedule_comment']) {
      lines.push(`${counts['schedule_comment'].senderName}님이 일정에 댓글을 ${counts['schedule_comment'].count}개 달았습니다. 💬`);
    }
    if (counts['anniversary_new']) {
      lines.push(`${counts['anniversary_new'].senderName}님이 기념일을 ${counts['anniversary_new'].count}개 등록했습니다. 🎉`);
    }
    if (counts['weekly_date_updated']) {
      lines.push(`${counts['weekly_date_updated'].senderName}님이 데이트 기대를 남겼습니다. 💕`);
    }
    if (counts['weekly_date_item_added']) {
      lines.push(`${counts['weekly_date_item_added'].senderName}님이 데이트 목록에 ${counts['weekly_date_item_added'].count}개를 추가했습니다. 📝`);
    }
    if (counts['weekly_date_comment']) {
      lines.push(`${counts['weekly_date_comment'].senderName}님이 데이트에 댓글을 ${counts['weekly_date_comment'].count}개 남겼습니다. 💬`);
    }
    if (counts['weekly_date_like']) {
      lines.push(`${counts['weekly_date_like'].senderName}님이 데이트에 하트를 보냈습니다. ❤️`);
    }

    return lines;
  };

  const dismissWelcomePopup = () => setShowWelcomePopup(false);

  // Fetch Notifications & check unread summary on mount (or tab change back)
  useEffect(() => {
    const q = query(
      collection(db, 'notifications'),
      where('coupleId', '==', coupleRoom.id),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });

      // Filter to partner's notifications only
      const partnerNotifs = list.filter(n => n.senderId !== userProfile.uid);

      // Sort descending
      partnerNotifs.sort((a, b) => {
        const timeA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
        const timeB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
        return timeB - timeA;
      });

      // Calculate unreads since last checked
      const lastCheckedKey = `couple_last_checked_notifications_${userProfile.uid}`;
      const lastCheckedStr = localStorage.getItem(lastCheckedKey);
      
      // Default to 3 days ago if never checked
      const lastCheckedTime = lastCheckedStr 
        ? new Date(lastCheckedStr) 
        : new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

      const unreads = partnerNotifs.filter(n => {
        const createTime = n.createdAt?.toDate ? n.createdAt.toDate() : new Date(n.createdAt);
        const clearedAt = userProfile.notificationClearedAt?.toDate
          ? userProfile.notificationClearedAt.toDate()
          : new Date(userProfile.notificationClearedAt || 0);
        return !n.readBy?.includes(userProfile.uid) && createTime > lastCheckedTime && createTime > clearedAt;
      });

      setUnreadCount(unreads.length);

      // Trigger the welcome popup summary if there are unreads and we haven't shown it in this browser session
      const sessionKey = `shown_couple_welcome_popup_${userProfile.uid}`;
      const shownThisSession = sessionStorage.getItem(sessionKey);
      if (unreads.length > 0 && !shownThisSession) {
        const summaries = aggregateNotifications(unreads);
        if (summaries.length > 0) {
          setWelcomeSummaries(summaries);
          setShowWelcomePopup(true);
          sessionStorage.setItem(sessionKey, 'true');
        }
      }
    }, (error) => {
      console.error('Error fetching notifications:', error);
    });

    return () => unsubscribe();
  }, [coupleRoom.id, userProfile.uid, userProfile.notificationClearedAt?.seconds]);

  // 1. Fetch Anniversaries
  useEffect(() => {
    const q = query(
      collection(db, 'anniversaries'),
      where('coupleId', '==', coupleRoom.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Anniversary[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Anniversary);
      });
      setAnniversaries(list);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  // 2. Fetch Uncompleted Buckets
  useEffect(() => {
    const q = query(
      collection(db, 'bucketlist'),
      where('coupleId', '==', coupleRoom.id),
      where('isCompleted', '==', false)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: BucketItem[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as BucketItem);
      });
      setBuckets(list);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  // Fetch Diary Count
  useEffect(() => {
    const q = query(
      collection(db, 'diaries'),
      where('coupleId', '==', coupleRoom.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDiaryCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  // Fetch Schedule Count
  useEffect(() => {
    const q = query(
      collection(db, 'schedules'),
      where('coupleId', '==', coupleRoom.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setScheduleCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [coupleRoom.id]);

  // 3. Background Image Upload
  const handleBgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedBase64 = await compressAndEncodeImage(file, 900, 700);
      
      const roomRef = doc(db, 'couples', coupleRoom.id);
      await updateDoc(roomRef, {
        bgImage: compressedBase64
      });
    } catch (err) {
      console.error('Error uploading background photo:', err);
      alert(err instanceof Error ? err.message : '사진 업로드에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      e.target.value = '';
      setIsUploading(false);
    }
  };

  // 4. Calculate D-day / Days in love
  const calculateDaysInLove = () => {
    if (!coupleRoom.startDate) return 1;
    const start = new Date(coupleRoom.startDate);
    start.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Count first day as Day 1
  };

  const daysInLove = calculateDaysInLove();

  // 5. Compute Upcoming D-days (Combine System milestones & Custom ones)
  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming: { title: string; dday: number; emoji: string }[] = [];

    // System milestones from start date
    if (coupleRoom.startDate) {
      const milestones = generateMilestones(coupleRoom.startDate);
      milestones.forEach((m) => {
        const mDate = new Date(m.date);
        mDate.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((mDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0) {
          upcoming.push({
            title: m.title,
            dday: diffDays,
            emoji: m.title.includes('주년') ? '💖' : '🍰'
          });
        }
      });
    }

    // Custom anniversaries
    anniversaries.forEach((ann) => {
      if (!ann.date) return;
      const annDate = new Date(ann.date);
      annDate.setHours(0, 0, 0, 0);
      
      // Calculate next occurrence if it's repeating, or simple future date
      let targetDate = new Date(annDate);
      if (targetDate < today) {
        // Find next annual occurrence
        targetDate.setFullYear(today.getFullYear());
        if (targetDate < today) {
          targetDate.setFullYear(today.getFullYear() + 1);
        }
      }

      const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0) {
        upcoming.push({
          title: ann.title,
          dday: diffDays,
          emoji: '🎉'
        });
      }
    });

    // Sort by D-day (closest first)
    return upcoming.sort((a, b) => a.dday - b.dday).slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents();

  const partnerName = userProfile.uid === coupleRoom.user1Id 
    ? (coupleRoom.user2Name || '박라떼') 
    : coupleRoom.user1Name;

  const partnerCharacter = userProfile.uid === coupleRoom.user1Id
    ? coupleRoom.user2Character
    : coupleRoom.user1Character;

  const myCharacter = userProfile.characterType || 'jara';

  return (
    <div className="flex flex-col bg-[#FAF7F2] min-h-screen pb-28">
      {/* 1. Header Banner Image with Photo Upload & binder-style D-day Widget */}
      <div className="relative h-[380px] w-full shadow-md bg-stone-200">
        {coupleRoom.bgImage ? (
          <img 
            src={coupleRoom.bgImage} 
            alt="Couple Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 flex flex-col items-center justify-center p-6 text-center text-white relative">
            <Heart size={48} className="text-rose-200/40 fill-rose-200/20 mb-2 animate-pulse" />
            <h2 className="font-hand text-xl tracking-wide text-stone-100 opacity-90">우리만의 소중한 사진을 채워보세요</h2>
            <p className="text-[11px] text-stone-300 mt-1">오른쪽 위의 카메라 버튼을 눌러 사진을 등록하세요 🖼️</p>
          </div>
        )}

        {/* Handdrawn Paper Plane Deco */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-80">
          <svg width="45" height="45" viewBox="0 0 100 100" fill="none" className="transform -rotate-12 text-white/90">
            <path d="M10 50 L90 10 L50 90 L40 60 L10 50 Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M40 60 L90 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Notification Bell Button */}
        <button 
          onClick={() => onTabChange('notifications')}
          className="absolute top-4 right-16 z-10 flex items-center justify-center rounded-full border border-stone-200 bg-white/80 p-2.5 text-stone-700 shadow-lg transition duration-200 hover:bg-white"
          title="알림 센터"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-pulse border border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Upload Button */}
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white border border-stone-200 text-stone-700 p-2.5 rounded-full shadow-lg transition duration-200 flex items-center justify-center cursor-pointer z-10 disabled:opacity-50"
          title="배경 사진 업로드"
        >
          {isUploading ? (
            <div className="w-5 h-5 border-2 border-stone-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera size={18} />
          )}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleBgUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Binder style Days in Love widget (Pink Notebook card) */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-5 left-5 bg-rose-50 border-2 border-rose-100 p-4.5 rounded-2xl shadow-xl w-[210px] text-stone-800"
          style={{ backgroundImage: 'radial-gradient(#fed7d7 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        >
          {/* Binder Holes Deco */}
          <div className="absolute -top-3.5 left-4 right-4 flex justify-between px-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-stone-900/90 rounded-full border border-stone-800 shadow-inner" />
                <div className="w-1 h-3.5 bg-stone-300 rounded-sm -mt-0.5 border border-stone-400/40" />
              </div>
            ))}
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs font-black text-rose-600 border-b border-rose-200/60 pb-1.5">
              <span className="flex items-center gap-1">
                {myCharacter === 'jara' ? '김자라' : '박라떼'}
              </span>
              <span className="text-[11px] text-stone-400 font-normal">＋</span>
              <span className="flex items-center gap-1">
                {partnerName}
              </span>
            </div>

            <div className="mt-2 text-center">
              <div className="font-mono text-4xl font-black text-stone-800 tracking-tight flex items-baseline justify-center">
                <span>{daysInLove}</span>
                <span className="text-xs font-bold text-stone-500 ml-1">일</span>
              </div>
              <p className="text-[11px] text-rose-500 font-extrabold tracking-wider mt-1 flex items-center justify-center gap-1">
                days in love <Heart size={10} className="fill-rose-500 animate-pulse text-rose-500" />
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. Main content widgets (Bear Char Deco, Anniversary list, Buckets, Bento grid) */}
      <div className="px-5 mt-6 space-y-5">

        <button
          onClick={() => onTabChange('weeklyDate')}
          className="flex w-full items-center gap-3 rounded-3xl border border-rose-100 bg-white p-4 text-left shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-500"><CalendarHeart size={23} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-black text-stone-800">우리의 데이트 리스트</span>
            <span className="block text-xs text-stone-500">하고 싶은 데이트를 모아봐 💕</span>
          </span>
          <ChevronRight size={18} className="text-stone-400" />
        </button>
        
        {/* Cute Bears & Anniversary list Section */}
        <div className="bg-white/80 border border-stone-200/60 rounded-3xl p-5 shadow-xs relative">
          
          {/* Couple Icons Overlaying top border like in image */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-0.5 rounded-full border border-stone-200/40 shadow-xs">
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-stone-50 border border-stone-200">
              <JaraIcon size={24} />
            </div>
            <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" />
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-stone-50 border border-stone-200">
              <LatteIcon size={24} />
            </div>
          </div>

          {/* Anniversaries list */}
          <div className="pt-4">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-3 border-b border-stone-100 pb-2">
              <span className="flex items-center gap-1">🗓️ 다가오는 우리의 기념일</span>
              <button onClick={() => onTabChange('anniversary')} className="text-stone-400 hover:text-stone-600 flex items-center gap-0.5">
                더보기 <ChevronRight size={14} />
              </button>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-4 text-xs text-stone-400">
                등록된 기념일이 아직 없어요 🎂
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((evt, index) => (
                  <div key={index} className="flex items-center justify-between bg-stone-50/60 border border-stone-100 rounded-xl px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{evt.emoji}</span>
                      <span className="font-bold text-stone-800 text-sm">{evt.title}</span>
                    </div>
                    <span className="font-mono font-black text-rose-500 bg-rose-50 border border-rose-100/50 px-2 py-0.5 rounded-md text-xs">
                      {evt.dday === 0 ? 'D-Day 🎉' : `D - ${evt.dday}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Handdrawn decorative dotted line with bow knot */}
        <div className="relative flex items-center justify-center my-2">
          <div className="w-full border-t border-dashed border-stone-300" />
          <div className="absolute bg-[#FAF7F2] px-4 py-0.5 text-stone-400 text-lg select-none">
            🎀
          </div>
        </div>

        {/* 3. Bucket List Summary Card (Black chalkboard style) */}
        <div 
          onClick={() => onTabChange('bucket')}
          className="bg-[#1A1A1A] hover:bg-[#151515] text-stone-100 border border-stone-800 rounded-3xl p-5 shadow-lg transition duration-300 cursor-pointer group"
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3">
            <h3 className="font-black text-base text-stone-50 flex items-center gap-2 tracking-tight">
              버킷 리스트 <span className="text-xs text-stone-400 font-normal">Our Wishes</span>
            </h3>
            <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </div>

          {buckets.length === 0 ? (
            <div className="text-center py-4 text-xs text-stone-400">
              함께 이루고 싶은 버킷리스트를 채워봐요! 🎈
            </div>
          ) : (
            <div className="space-y-3">
              {buckets.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-start gap-2 text-stone-200">
                  <div className="w-5 h-5 rounded-full border border-stone-700 hover:border-rose-400 flex items-center justify-center shrink-0 mt-0.5 transition">
                    <Heart size={10} className="text-stone-500 hover:text-rose-400" />
                  </div>
                  <span className="text-sm font-bold tracking-tight text-stone-200 leading-snug">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Bento Grid (Our Calendar & Our Diaries shortcuts) */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Left Bento: Calendar Shortcut */}
          <div 
            onClick={() => onTabChange('calendar')}
            className="bg-[#EBF3FE] border border-blue-100 rounded-3xl p-4.5 flex flex-col justify-between h-[160px] relative shadow-xs cursor-pointer hover:shadow-md active:scale-95 transition"
          >
            <div>
              <span className="text-[11px] font-extrabold text-blue-500 uppercase tracking-wider block">우리의 일정</span>
              <div className="flex items-center justify-center mt-3">
                <div className="w-16 h-18 bg-white border border-stone-200/60 rounded-xl overflow-hidden shadow-xs flex flex-col items-center">
                  <div className="bg-rose-500 text-white text-[11px] font-black w-full text-center py-0.5 uppercase tracking-wider">
                    {new Date().toLocaleString('en-US', { month: 'short' })}
                  </div>
                  <div className="flex-1 flex items-center justify-center font-mono font-black text-2xl text-stone-800">
                    {new Date().getDate()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-stone-600 text-[11px] font-bold mt-2">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-blue-500" /> {scheduleCount}개의 일정
              </span>
              <span className="text-stone-400 hover:text-stone-600 flex items-center gap-0.5">
                이동 <ChevronRight size={10} />
              </span>
            </div>
          </div>

          {/* Right Bento: Diary Shortcut */}
          <div 
            onClick={() => onTabChange('diary')}
            className="bg-[#FFF8EC] border border-amber-100 rounded-3xl p-4.5 flex flex-col justify-between h-[160px] relative shadow-xs cursor-pointer hover:shadow-md active:scale-95 transition"
          >
            <div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block">우리의 일기장</span>
              <div className="flex items-center justify-center mt-3">
                <div className="relative w-14 h-16 bg-white border-2 border-stone-800 rounded-lg shadow-xs flex flex-col justify-between p-1.5 transform -rotate-3">
                  <div className="w-1 h-12 bg-stone-800 absolute top-2 left-1 rounded-sm" />
                  <div className="text-right text-[11px] font-bold text-stone-400 uppercase">Diary</div>
                  <div className="font-mono font-black text-xl text-stone-800 text-center flex-1 flex items-center justify-center">
                    {diaryCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-stone-600 text-[11px] font-bold mt-2">
              <span className="flex items-center gap-1">
                <BookOpen size={12} className="text-amber-600" /> {diaryCount}개의 추억
              </span>
              <span className="text-stone-400 hover:text-stone-600 flex items-center gap-0.5">
                쓰기 <ChevronRight size={10} />
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 1. Welcome Summary Popup (똑똑! 새로운 소식 웰컴 팝업) */}
      <AnimatePresence>
        {showWelcomePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border-2 border-rose-200 rounded-3xl p-6 shadow-2xl max-w-sm w-full relative overflow-hidden"
              style={{ backgroundImage: 'radial-gradient(#fff5f5 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}
            >
              {/* Top binder line deco */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 via-rose-400 to-rose-300" />
              
              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mb-3 shadow-sm">
                  {partnerCharacter === 'jara' ? <JaraIcon size={44} /> : <LatteIcon size={44} />}
                </div>
                
                <h3 className="font-extrabold text-stone-800 text-base leading-snug">
                  똑똑! 🚪<br />우리가 잠든 사이 새로운 소식이 도착했어요!
                </h3>
                <p className="text-[11px] text-stone-400 mt-1">상대방이 남긴 소중한 순간들을 모아왔어요 🐾</p>
                
                {/* Aggregated Bullet Lines list */}
                <div className="w-full bg-rose-50/40 border border-rose-100/60 rounded-2xl p-4.5 my-4.5 space-y-2.5 text-left max-h-[180px] overflow-y-auto">
                  {welcomeSummaries.map((summary, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                      <span className="text-rose-400 shrink-0 select-none font-bold">✨</span>
                      <span className="font-extrabold">{summary}</span>
                    </div>
                  ))}
                </div>

                <div className="flex w-full gap-2">
                  <button
                    onClick={() => {
                      setShowWelcomePopup(false);
                      onTabChange('notifications');
                    }}
                    className="flex-1 bg-rose-400 hover:bg-rose-500 text-white font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-rose-100 cursor-pointer active:scale-95 transition"
                  >
                    자세히 보러 가기 🐾
                  </button>
                  <button
                    onClick={dismissWelcomePopup}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-600 font-extrabold text-xs px-4 py-3 rounded-xl cursor-pointer active:scale-95 transition"
                  >
                    확인
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
