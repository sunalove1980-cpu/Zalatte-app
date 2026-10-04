import { lazy, Suspense, useState, useEffect } from 'react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, collection, query, where, orderBy, limit, updateDoc, arrayUnion } from 'firebase/firestore';
import { UserProfile, CoupleRoom, NotificationTarget } from './types';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { BookOpen, Calendar, ListChecks, Settings, Heart, Image, CalendarDays, CalendarHeart, Bell, X, ChevronLeft } from 'lucide-react';
import { JaraLatteHero, JaraIcon, LatteIcon } from './components/Illustrations';
import { registerAppServiceWorker } from './lib/pushNotifications';

const HomeTab = lazy(() => import('./components/HomeTab').then((module) => ({ default: module.HomeTab })));
const DiaryTab = lazy(() => import('./components/DiaryTab').then((module) => ({ default: module.DiaryTab })));
const AlbumTab = lazy(() => import('./components/AlbumTab').then((module) => ({ default: module.AlbumTab })));
const ScheduleTab = lazy(() => import('./components/ScheduleTab').then((module) => ({ default: module.ScheduleTab })));
const AnniversaryTab = lazy(() => import('./components/AnniversaryTab').then((module) => ({ default: module.AnniversaryTab })));
const BucketTab = lazy(() => import('./components/BucketTab').then((module) => ({ default: module.BucketTab })));
const SettingsTab = lazy(() => import('./components/SettingsTab').then((module) => ({ default: module.SettingsTab })));
const NotificationTab = lazy(() => import('./components/NotificationTab').then((module) => ({ default: module.NotificationTab })));
const WeeklyDateTab = lazy(() => import('./components/WeeklyDateTab').then((module) => ({ default: module.WeeklyDateTab })));

type Tab = 'home' | 'diary' | 'album' | 'calendar' | 'weeklyDate' | 'anniversary' | 'bucket' | 'notifications' | 'settings';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [coupleRoom, setCoupleRoom] = useState<CoupleRoom | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [notificationTarget, setNotificationTarget] = useState<NotificationTarget | null>(null);

  useEffect(() => {
    registerAppServiceWorker().catch((error) => console.error('Service worker update failed:', error));
  }, []);
  
  // Synchronize activeTab with browser history to handle back button ("뒤로 가기")
  useEffect(() => {
    // Replace initial state with 'home' if state is null or empty
    if (!window.history.state) {
      window.history.replaceState({ tab: 'home' }, '', '');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.tab) {
        setActiveTab(event.state.tab);
      } else {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTabChange = (tab: Tab) => {
    setNotificationTarget(null);
    setActiveTab(tab);
    // Only push state if the target tab is different from current state
    if (window.history.state?.tab !== tab) {
      window.history.pushState({ tab }, '', '');
    }
  };

  const tabForNotification = (type = ''): Tab => {
    if (type.startsWith('album')) return 'album';
    if (type.startsWith('diary')) return 'diary';
    if (type.startsWith('bucket')) return 'bucket';
    if (type.startsWith('schedule')) return 'calendar';
    if (type.startsWith('anniversary')) return 'anniversary';
    if (type.startsWith('weekly_date')) return 'weeklyDate';
    return 'home';
  };

  const openNotification = (notification: any) => {
    const tab = tabForNotification(notification.type);
    setNotificationTarget(notification.targetId ? { id: notification.targetId, type: notification.type || '' } : null);
    if (notification.id && profile?.uid && !notification.readBy?.includes(profile.uid)) {
      updateDoc(doc(db, 'notifications', notification.id), { readBy: arrayUnion(profile.uid) })
        .catch((error) => console.error('Error syncing notification read state:', error));
    }
    setActiveTab(tab);
    if (window.history.state?.tab !== tab) window.history.pushState({ tab }, '', '');
  };
  
  // Loading states
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [roomLoading, setRoomLoading] = useState<boolean>(false);

  // Real-time Notification Listener
  const [toastNotification, setToastNotification] = useState<any>(null);

  useEffect(() => {
    if (!profile || !profile.coupleId) return;

    // Filter for only notifications created after the user booted up the app (listener started)
    const listenerStartTime = new Date(Date.now() - 1000);

    // Simple single-field query to avoid index requirements
    const q = query(
      collection(db, 'notifications'),
      where('coupleId', '==', profile.coupleId),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data();
          // Convert Firestore Timestamp to JS Date for comparison
          const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
          
          // Avoid triggering toast for notifications created by oneself and check if created after listener start
          if (createdAtDate >= listenerStartTime && data.senderId !== profile.uid) {
            setToastNotification({
              id: change.doc.id,
              ...data
            });

            // Auto-dismiss after 4 seconds
            setTimeout(() => {
              setToastNotification(null);
            }, 4000);
          }
        }
      });
    }, (error) => {
      console.error('Error listening to notifications:', error);
    });

    return () => unsubscribe();
  }, [profile?.coupleId, profile?.uid]);

  // Keep the notification-menu badge current even before that menu is opened.
  useEffect(() => {
    if (!profile?.coupleId) {
      setUnreadNotificationCount(0);
      return;
    }
    const q = query(collection(db, 'notifications'), where('coupleId', '==', profile.coupleId), orderBy('createdAt', 'desc'), limit(100));
    return onSnapshot(q, (snapshot) => {
      let readIds = new Set<string>();
      try {
        readIds = new Set(JSON.parse(localStorage.getItem(`couple_read_notification_ids_${profile.uid}`) || '[]'));
      } catch { /* Ignore malformed local cache. */ }
      const checkedAtText = localStorage.getItem(`couple_last_checked_notifications_${profile.uid}`);
      const checkedAt = checkedAtText ? new Date(checkedAtText).getTime() : Date.now() - 3 * 24 * 60 * 60 * 1000;
      const clearedAt = profile.notificationClearedAt?.toDate
        ? profile.notificationClearedAt.toDate().getTime()
        : new Date(profile.notificationClearedAt || 0).getTime();
      const count = snapshot.docs.filter((item) => {
        const data = item.data();
        const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().getTime() : new Date(data.createdAt).getTime();
        return data.senderId !== profile.uid && !data.readBy?.includes(profile.uid) && !readIds.has(item.id) && createdAt > checkedAt && createdAt > clearedAt;
      }).length;
      setUnreadNotificationCount(count);
    }, (error) => console.error('Error counting unread notifications:', error));
  }, [profile?.coupleId, profile?.uid, profile?.notificationClearedAt?.seconds]);

  // 1. Observe authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (!currentUser) {
        setProfile(null);
        setCoupleRoom(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Fetch user profile when user logs in
  useEffect(() => {
    if (!user) return;

    setProfileLoading(true);
    const userDocRef = doc(db, 'users', user.uid);

    // Listen to profile updates (real-time)
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as UserProfile;
        // Preserve the room already assigned to this user. Room membership must
        // never be silently migrated or rewritten during authentication.
        setProfile(data);
      } else {
        console.warn('User profile does not exist in Firestore!');
      }
      setProfileLoading(false);
    }, (error) => {
      console.error('Error fetching user profile:', error);
      setProfileLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // 3. Listen to Couple Room updates when profile has coupleId
  useEffect(() => {
    if (!profile || !profile.coupleId) {
      setCoupleRoom(null);
      setRoomLoading(false);
      return;
    }

    setRoomLoading(true);
    const roomDocRef = doc(db, 'couples', profile.coupleId);

    const unsubscribe = onSnapshot(roomDocRef, (snapshot) => {
      if (snapshot.exists()) {
        setCoupleRoom(snapshot.data() as CoupleRoom);
      } else {
        console.warn('Couple room doc not found in DB!');
        setCoupleRoom(null);
      }
      setRoomLoading(false);
    }, (error) => {
      console.error('Error fetching couple room:', error);
      setRoomLoading(false);
    });

    return () => unsubscribe();
  }, [profile?.coupleId]);

  // Loading Screen
  if (authLoading || (user && profileLoading) || (profile?.coupleId && roomLoading)) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4">
        <div className="animate-bounce mb-3">
          <Heart size={44} className="text-rose-400 fill-rose-400" />
        </div>
        <p className="text-xs text-stone-700 font-bold tracking-tight">
          소중한 비밀 공간으로 들어가고 있어요...
        </p>
      </div>
    );
  }

  // 1. Auth Page if not logged in
  if (!user) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen">
        <Auth onAuthSuccess={() => {}} />
      </div>
    );
  }

  // 2. Profile loaded, but no couple connected OR waiting for partner
  const isWaitingForPartner = coupleRoom && coupleRoom.status === 'waiting';
  
  if (!profile?.coupleId || !coupleRoom || isWaitingForPartner) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen">
        <Onboarding
          userProfile={profile || {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '사용자',
            characterType: null,
            coupleId: null,
            createdAt: new Date()
          }}
          onProfileUpdated={(updatedProfile) => setProfile(updatedProfile)}
        />
      </div>
    );
  }

  // 3. Main Paired App Workspace (Centered mobile viewport on desktop, full-screen on mobile)
  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center">
      
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md bg-[#FAF7F2] h-screen flex flex-col relative border-x border-stone-200/80 shadow-2xl overflow-hidden">
        {activeTab !== 'home' && (
          <button
            onClick={() => window.history.back()}
            className="absolute left-3 top-3 z-40 flex min-h-11 items-center gap-1 rounded-full border border-stone-200 bg-white/95 px-3 text-sm font-bold text-stone-700 shadow-md backdrop-blur"
            aria-label="이전 화면으로 돌아가기"
          >
            <ChevronLeft size={20} /> 이전
          </button>
        )}
        
        {/* Real-time Toast Notification banner */}
        {toastNotification && (
          <div 
            onClick={() => {
              openNotification(toastNotification);
              setToastNotification(null);
            }}
            className="absolute top-4 left-4 right-4 z-50 bg-white/95 backdrop-blur-md border border-rose-100 shadow-xl rounded-2xl p-3 flex items-center gap-3 animate-fade-in cursor-pointer hover:bg-stone-50"
          >
            {/* Sender mascot icon */}
            <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0">
              {toastNotification.senderCharacter === 'jara' ? (
                <JaraIcon size={24} />
              ) : (
                <LatteIcon size={24} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-extrabold text-rose-500 uppercase tracking-widest block">실시간 알림 💓</span>
              <p className="text-xs font-black text-stone-800 leading-tight truncate">{toastNotification.title}</p>
              {toastNotification.body && (
                <p className="text-[11px] text-stone-500 truncate mt-0.5">{toastNotification.body}</p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setToastNotification(null);
              }}
              className="text-stone-300 hover:text-stone-500 p-1 rounded-full hover:bg-stone-100 transition cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Render Tab Pages */}
        <div className="flex-1 overflow-y-auto pb-24">
          <Suspense fallback={<div className="flex h-full items-center justify-center text-sm font-semibold text-stone-500">화면을 불러오는 중...</div>}>
          {activeTab === 'home' && profile && coupleRoom && (
            <HomeTab 
              userProfile={profile} 
              coupleRoom={coupleRoom} 
              onTabChange={(tab) => handleTabChange(tab)} 
            />
          )}

          {activeTab === 'diary' && profile && coupleRoom && (
            <DiaryTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'album' && profile && coupleRoom && (
            <AlbumTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'calendar' && profile && coupleRoom && (
            <ScheduleTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'weeklyDate' && profile && coupleRoom && (
            <WeeklyDateTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'anniversary' && profile && coupleRoom && (
            <AnniversaryTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'bucket' && profile && coupleRoom && (
            <BucketTab userProfile={profile} coupleRoom={coupleRoom} notificationTarget={notificationTarget} onTargetHandled={() => setNotificationTarget(null)} />
          )}

          {activeTab === 'settings' && profile && coupleRoom && (
            <SettingsTab
              userProfile={profile}
              coupleRoom={coupleRoom}
              onProfileUpdated={(updatedProfile) => setProfile(updatedProfile)}
              onRoomUpdated={(updatedRoom) => setCoupleRoom(updatedRoom)}
            />
          )}

          {activeTab === 'notifications' && profile && coupleRoom && (
            <NotificationTab
              userProfile={profile}
              coupleRoom={coupleRoom}
              onOpenNotification={openNotification}
              onUnreadChange={setUnreadNotificationCount}
            />
          )}
          </Suspense>
        </div>

        {/* Navigation bottom bar: home stays fixed to the exact screen center. */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-22 border-t border-stone-200/60 bg-white/95 shadow-lg backdrop-blur-md">
          <div className="absolute inset-y-0 left-0 right-1/2 grid grid-cols-4 items-center pr-8 pl-1">
          
          {/* Tab Button: Diary */}
          <button
            onClick={() => handleTabChange('diary')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'diary' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <BookOpen size={17} className={activeTab === 'diary' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">일기</span>
          </button>

          {/* Tab Button: Album */}
          <button
            onClick={() => handleTabChange('album')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'album' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Image size={17} className={activeTab === 'album' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">앨범</span>
          </button>

          {/* Tab Button: Calendar */}
          <button
            onClick={() => handleTabChange('calendar')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'calendar' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <CalendarDays size={17} className={activeTab === 'calendar' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">일정</span>
          </button>

          <button
            onClick={() => handleTabChange('weeklyDate')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'weeklyDate' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
            aria-label="이번 주 데이트"
          >
            <CalendarHeart size={17} className={activeTab === 'weeklyDate' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">데이트</span>
          </button>

          </div>

          {/* Floating center Heart decoration - HOME */}
          <button
            onClick={() => handleTabChange('home')}
            className="absolute left-1/2 -top-5.5 z-30 flex min-h-20 w-16 -translate-x-1/2 touch-manipulation flex-col items-center justify-center"
            aria-label="우리홈으로 이동"
          >
            <div className={`w-11.5 h-11.5 rounded-full flex items-center justify-center shadow-md transition ${
              activeTab === 'home' 
                ? 'bg-rose-500 scale-110 shadow-rose-200 animate-pulse text-white' 
                : 'bg-rose-400 text-white hover:bg-rose-500'
            }`}>
              <Heart size={21} className="fill-white text-white" />
            </div>
            <span className="text-[11px] text-stone-500 font-black mt-1.5 font-hand tracking-wider">우리홈</span>
          </button>

          <div className="absolute inset-y-0 left-1/2 right-0 grid grid-cols-4 items-center pl-8 pr-1">
          {/* Tab Button: Anniversary */}
          <button
            onClick={() => handleTabChange('anniversary')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'anniversary' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Calendar size={17} className={activeTab === 'anniversary' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">기념일</span>
          </button>

          {/* Tab Button: Bucket List */}
          <button
            onClick={() => handleTabChange('bucket')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'bucket' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <ListChecks size={17} className={activeTab === 'bucket' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">버킷</span>
          </button>

          {/* Tab Button: Settings */}
          <button
            onClick={() => handleTabChange('notifications')}
            className={`relative flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'notifications' ? 'scale-105 font-bold text-rose-500' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Bell size={17} className={activeTab === 'notifications' ? 'stroke-[2.5px]' : ''} />
            {unreadNotificationCount > 0 && (
              <span className="absolute -right-0.5 -top-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-black text-white">
                {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
              </span>
            )}
            <span className="text-[11px] tracking-tighter">알림</span>
          </button>

          {/* Tab Button: Settings */}
          <button
            onClick={() => handleTabChange('settings')}
            className={`flex min-h-11 w-full flex-col items-center justify-center gap-1 transition ${
              activeTab === 'settings' ? 'text-rose-500 scale-105 font-bold' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <Settings size={17} className={activeTab === 'settings' ? 'stroke-[2.5px]' : ''} />
            <span className="text-[11px] tracking-tighter">설정</span>
          </button>
          </div>

        </div>

      </div>
    </div>
  );
}
