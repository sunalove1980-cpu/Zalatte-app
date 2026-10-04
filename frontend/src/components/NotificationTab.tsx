import { useEffect, useMemo, useState } from 'react';
import { arrayUnion, collection, doc, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from 'firebase/firestore';
import { Bell, CheckCheck, ChevronRight } from 'lucide-react';
import { db } from '../lib/firebase';
import { CoupleRoom, UserProfile } from '../types';
import { JaraIcon, LatteIcon } from './Illustrations';

type Destination = 'diary' | 'album' | 'calendar' | 'weeklyDate' | 'anniversary' | 'bucket' | 'home';

interface NotificationTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  onOpenNotification: (item: any) => void;
  onUnreadChange: (count: number) => void;
}

const destinationFor = (type = ''): { tab: Destination; label: string; icon: string } => {
  if (type.startsWith('diary')) return { tab: 'diary', label: '일기에서 확인', icon: '✍️' };
  if (type.startsWith('album')) return { tab: 'album', label: '앨범에서 확인', icon: '📸' };
  if (type.startsWith('schedule')) return { tab: 'calendar', label: '일정에서 확인', icon: '📅' };
  if (type.startsWith('anniversary')) return { tab: 'anniversary', label: '기념일에서 확인', icon: '🎉' };
  if (type.startsWith('bucket')) return { tab: 'bucket', label: '버킷에서 확인', icon: '🎯' };
  if (type.startsWith('weekly_date')) return { tab: 'weeklyDate', label: '데이트에서 확인', icon: '💕' };
  return { tab: 'home', label: '홈에서 확인', icon: '💌' };
};

const timeValue = (createdAt: any) => {
  const date = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
};

const relativeTime = (createdAt: any) => {
  const diff = Date.now() - timeValue(createdAt);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const date = new Date(timeValue(createdAt));
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export function NotificationTab({ userProfile, coupleRoom, onOpenNotification, onUnreadChange }: NotificationTabProps) {
  const storageKey = `couple_read_notification_ids_${userProfile.uid}`;
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isClearing, setIsClearing] = useState(false);
  const [readIds, setReadIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [clearedAt, setClearedAt] = useState(() => timeValue(userProfile.notificationClearedAt));

  useEffect(() => {
    setClearedAt(timeValue(userProfile.notificationClearedAt));
  }, [userProfile.notificationClearedAt]);
  const lastCheckedTime = useMemo(() => {
    const saved = localStorage.getItem(`couple_last_checked_notifications_${userProfile.uid}`);
    return saved ? new Date(saved).getTime() : Date.now() - 3 * 24 * 60 * 60 * 1000;
  }, [userProfile.uid]);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), where('coupleId', '==', coupleRoom.id), orderBy('createdAt', 'desc'), limit(100));
    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .filter((item: any) => item.senderId !== userProfile.uid)
        .sort((a: any, b: any) => timeValue(b.createdAt) - timeValue(a.createdAt));
      setNotifications(list);
    }, (error) => console.error('Error fetching notification history:', error));
  }, [coupleRoom.id, userProfile.uid]);

  const readSet = useMemo(() => new Set(readIds), [readIds]);
  const visibleNotifications = notifications.filter((item) => timeValue(item.createdAt) > clearedAt);
  const isRead = (item: any) => item.readBy?.includes(userProfile.uid) || readSet.has(item.id) || timeValue(item.createdAt) <= lastCheckedTime;
  const unreadCount = visibleNotifications.filter((item) => !isRead(item)).length;

  useEffect(() => onUnreadChange(unreadCount), [unreadCount, onUnreadChange]);

  const saveReadIds = (ids: string[]) => {
    const trimmed = ids.slice(-500);
    setReadIds(trimmed);
    localStorage.setItem(storageKey, JSON.stringify(trimmed));
  };

  const openNotification = async (item: any) => {
    if (!isRead(item)) saveReadIds([...readIds, item.id]);
    onOpenNotification(item);
  };

  const markAllRead = async () => {
    if (isClearing) return;
    setIsClearing(true);
    const previousClearedAt = clearedAt;
    const previousReadIds = readIds;
    const clearedAtNow = Date.now();
    setClearedAt(clearedAtNow);
    saveReadIds(visibleNotifications.map((item) => item.id));
    try {
      await updateDoc(doc(db, 'users', userProfile.uid), { notificationClearedAt: serverTimestamp() });
      const unread = visibleNotifications.filter((item) => !item.readBy?.includes(userProfile.uid));
      for (let start = 0; start < unread.length; start += 450) {
        const batch = writeBatch(db);
        unread.slice(start, start + 450).forEach((item) => {
          batch.update(doc(db, 'notifications', item.id), { readBy: arrayUnion(userProfile.uid) });
        });
        await batch.commit();
      }
    } catch (error) {
      console.error('Error clearing notification list:', error);
      setClearedAt(previousClearedAt);
      saveReadIds(previousReadIds);
      window.alert('알림 목록을 정리하지 못했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="min-h-full bg-[#FAF7F2] px-4 pb-8 pt-20">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-rose-500">
            <Bell size={20} className="fill-rose-100" />
            <span className="text-xs font-black tracking-widest">알림</span>
          </div>
          <h1 className="text-2xl font-black text-stone-800">둘만의 소식함</h1>
          <p className="mt-1 text-xs font-semibold text-stone-500">알림을 눌러 새 내용이 생긴 메뉴로 이동하세요.</p>
        </div>
        {visibleNotifications.length > 0 && (
          <button disabled={isClearing} onClick={markAllRead} className="flex min-h-11 items-center gap-1 rounded-xl bg-white px-3 text-xs font-extrabold text-stone-600 shadow-sm ring-1 ring-stone-200 disabled:opacity-50">
            <CheckCheck size={16} /> {isClearing ? '정리 중' : '다 읽음'}
          </button>
        )}
      </div>

      {visibleNotifications.length === 0 ? (
        <div className="mt-20 rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mb-3 text-4xl">💌</div>
          <p className="font-black text-stone-700">아직 도착한 알림이 없어요.</p>
          <p className="mt-1 text-xs text-stone-400">상대방의 새 글과 댓글이 이곳에 차곡차곡 쌓여요.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleNotifications.map((item) => {
            const destination = destinationFor(item.type);
            const unread = !isRead(item);
            return (
              <button
                key={item.id}
                onClick={() => openNotification(item)}
                className={`relative flex w-full items-start gap-3 rounded-2xl border p-4 text-left shadow-sm transition active:scale-[0.98] ${unread ? 'border-rose-200 bg-white' : 'border-stone-100 bg-white/65'}`}
              >
                {unread && <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500" aria-label="읽지 않은 알림" />}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rose-100 bg-rose-50">
                  {item.senderCharacter === 'jara' ? <JaraIcon size={30} /> : <LatteIcon size={30} />}
                </div>
                <div className="min-w-0 flex-1 pr-3">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm">{destination.icon}</span>
                    <span className="text-[11px] font-bold text-stone-400">{relativeTime(item.createdAt)}</span>
                  </div>
                  <p className={`text-sm leading-snug ${unread ? 'font-black text-stone-800' : 'font-bold text-stone-600'}`}>{item.title}</p>
                  {item.body && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">{item.body}</p>}
                  <span className="mt-2 flex items-center text-[11px] font-extrabold text-rose-500">{destination.label}<ChevronRight size={14} /></span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
