import React, { useState } from 'react';
import { db, auth } from '../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { UserProfile, CoupleRoom } from '../types';
import { Settings, LogOut, Heart, RefreshCw, Calendar, Copy, Check, Users } from 'lucide-react';
import { JaraIcon, LatteIcon } from './Illustrations';

interface SettingsTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  onProfileUpdated: (profile: UserProfile) => void;
  onRoomUpdated: (room: CoupleRoom) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  userProfile,
  coupleRoom,
  onProfileUpdated,
  onRoomUpdated
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(coupleRoom.startDate);
  const [isUpdatingDate, setIsUpdatingDate] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  // Logout handler
  const handleLogout = () => {
    auth.signOut();
  };

  // Toggle Character type
  const handleToggleCharacter = async () => {
    const nextChar = userProfile.characterType === 'jara' ? 'latte' : 'jara';
    try {
      // 1. Update users profile
      await updateDoc(doc(db, 'users', userProfile.uid), {
        characterType: nextChar
      });

      // 2. Update couple room document if paired
      const isUser1 = coupleRoom.user1Id === userProfile.uid;
      const updatePayload = isUser1 
        ? { user1Character: nextChar } 
        : { user2Character: nextChar };
        
      await updateDoc(doc(db, 'couples', coupleRoom.id), updatePayload);

      // Update local state
      onProfileUpdated({
        ...userProfile,
        characterType: nextChar
      });

      onRoomUpdated({
        ...coupleRoom,
        ...(isUser1 ? { user1Character: nextChar } : { user2Character: nextChar })
      });
      
      setMsg('캐릭터가 성공적으로 변경되었습니다! 🔁');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error('Error toggling character:', err);
    }
  };

  // Update met start date
  const handleUpdateStartDate = async () => {
    if (!startDate) return;
    setIsUpdatingDate(true);
    try {
      await updateDoc(doc(db, 'couples', coupleRoom.id), {
        startDate: startDate
      });
      
      onRoomUpdated({
        ...coupleRoom,
        startDate: startDate
      });
      
      setMsg('우리 처음 만난 날이 업데이트 되었습니다! 📅');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error('Error updating start date:', err);
    } finally {
      setIsUpdatingDate(false);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupleRoom.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUser1 = coupleRoom.user1Id === userProfile.uid;
  const partnerName = isUser1 ? coupleRoom.user2Name : coupleRoom.user1Name;
  const partnerCharacter = isUser1 ? coupleRoom.user2Character : coupleRoom.user1Character;

  return (
    <div className="w-full flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 p-4 sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-stone-700" />
          <div>
            <h2 className="text-base font-bold text-stone-800 tracking-tight">마이 설정</h2>
            <p className="text-[11px] text-stone-500">커플 프로필 및 앱 환경 관리</p>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5 max-w-md mx-auto w-full">
        {msg && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 text-xs font-semibold text-emerald-800 text-center animate-fade-in">
            {msg}
          </div>
        )}

        {/* Couple profile banner */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col items-center">
          <span className="text-[11px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-4">
            👩‍❤️‍👨 연결된 우리 둘 프로필
          </span>

          <div className="flex items-center gap-8 justify-center w-full mb-4">
            {/* User Profile */}
            <div className="flex flex-col items-center">
              <div className="relative p-1 border border-stone-200 rounded-full bg-stone-50">
                {userProfile.characterType === 'jara' ? <JaraIcon size={72} /> : <LatteIcon size={72} />}
                <span className="absolute -bottom-1 -right-1 bg-rose-400 border border-white text-white text-[11px] px-2 py-0.5 rounded-full font-bold shadow-xs">
                  나
                </span>
              </div>
              <span className="font-bold text-stone-800 text-xs mt-2 truncate max-w-[80px]">
                {userProfile.displayName}
              </span>
              <span className="text-[11px] text-stone-400 uppercase font-mono mt-0.5">
                {userProfile.characterType === 'jara' ? '김자라' : '박라떼'}
              </span>
            </div>

            {/* Heart Spacer */}
            <div className="flex flex-col items-center justify-center text-rose-400 animate-pulse">
              <Heart size={24} className="fill-rose-400" />
              <span className="text-[11px] font-semibold text-stone-400 mt-1">러브 라인</span>
            </div>

            {/* Partner Profile */}
            <div className="flex flex-col items-center">
              <div className="p-1 border border-stone-200 rounded-full bg-stone-50">
                {partnerName ? (
                  partnerCharacter === 'jara' ? <JaraIcon size={72} /> : <LatteIcon size={72} />
                ) : (
                  <div className="w-[72px] h-[72px] flex items-center justify-center bg-stone-100 rounded-full text-stone-400 font-bold text-xs border border-dashed border-stone-300">
                    대기 중
                  </div>
                )}
              </div>
              <span className="font-bold text-stone-800 text-xs mt-2 truncate max-w-[80px]">
                {partnerName || '상대방'}
              </span>
              <span className="text-[11px] text-stone-400 uppercase font-mono mt-0.5">
                {partnerName ? (partnerCharacter === 'jara' ? '김자라' : '박라떼') : '연결 안 됨'}
              </span>
            </div>
          </div>

          {/* Character Switcher Button */}
          <button
            onClick={handleToggleCharacter}
            className="mt-2 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl px-4 py-2.5 flex items-center gap-1.5 shadow-xs transition-all"
          >
            <RefreshCw size={13} className="text-stone-500" />
            내 캐릭터 변경하기 (자라 ↔ 라떼)
          </button>
        </div>

        {/* Couple Room settings */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-bold text-stone-800 text-xs flex items-center gap-1.5 pb-2 border-b border-stone-100">
            <Users size={14} className="text-stone-500" />
            우리 방 정보 및 관리
          </h3>

          {/* Start Date editor */}
          <div>
            <label className="block text-[11px] font-bold text-stone-600 mb-1.5 flex items-center gap-1">
              <Calendar size={12} className="text-stone-400" /> 우리 처음 만난 날 수정 📅
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-850 focus:outline-none focus:border-rose-300 focus:bg-white transition-all font-semibold"
              />
              <button
                onClick={handleUpdateStartDate}
                disabled={isUpdatingDate}
                className="bg-stone-800 hover:bg-stone-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition"
              >
                {isUpdatingDate ? '저장 중' : '변경'}
              </button>
            </div>
          </div>

          {/* Invitation code display */}
          <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase text-stone-400 block tracking-wide">우리 둘 초대코드</span>
              <span className="text-lg font-black tracking-widest text-stone-800">{coupleRoom.code}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="bg-white border border-stone-200 p-2.5 rounded-xl hover:bg-stone-100/50 transition-all shadow-xs"
              title="코드 복사"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} className="text-stone-500" />}
            </button>
          </div>
        </div>

        {/* PWA App Install Guide & Icon Preview Card */}
        <div className="bg-white border-2 border-dashed border-rose-200 rounded-3xl p-6 shadow-xs flex flex-col gap-5 relative overflow-hidden bg-rose-50/20">
          <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-20 h-20 bg-rose-100/40 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-start gap-4">
            {/* App Icon Showcase */}
            <div className="relative flex-shrink-0">
              <img 
                src={new URL('assets/logo.svg', document.baseURI).href}
                alt="자라라떼 다이어리 앱 아이콘" 
                className="w-16 h-16 rounded-2xl shadow-md border-2 border-white/80 transform hover:scale-105 transition duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs animate-bounce">
                NEW!
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-extrabold text-stone-800 text-sm flex items-center gap-1">
                📱 핸드폰에 앱으로 다운로드하기
              </h3>
              <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                말랑말랑 귀여운 자라와 라떼 아이콘을 핸드폰 화면에 꺼내두고, 연인과의 추억 다이어리를 더 빠르고 편리하게 열어보세요!
              </p>
            </div>
          </div>

          <div className="border-t border-rose-100/80 pt-4 flex flex-col gap-3">
            {/* iPhone Guide */}
            <div className="flex gap-2">
              <span className="bg-rose-100 text-rose-600 text-[11px] font-bold h-5 px-2 rounded-md flex items-center shrink-0">
                아이폰 (Safari)
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                하단의 <span className="font-bold text-rose-500">‘공유’</span> 아이콘을 누른 후, 메뉴를 올려 <span className="font-bold text-stone-800">‘홈 화면에 추가’</span>를 선택하세요!
              </p>
            </div>

            {/* Android Guide */}
            <div className="flex gap-2">
              <span className="bg-amber-100 text-amber-700 text-[11px] font-bold h-5 px-2 rounded-md flex items-center shrink-0">
                안드로이드 (Chrome)
              </span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                우측 상단 더보기(<span className="font-bold">⋮</span>)를 누른 후, <span className="font-bold text-stone-800">‘홈 화면에 추가’</span> 또는 <span className="font-bold text-stone-800">‘앱 설치’</span>를 눌러주세요!
              </p>
            </div>
          </div>
        </div>

        {/* App details / Logout */}
        <div className="bg-white border border-stone-100 rounded-3xl p-6 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>내 가입 이메일</span>
            <span className="font-semibold text-stone-800">{userProfile.email}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>앱 버전</span>
            <span className="font-semibold text-stone-800">v1.2.0</span>
          </div>

          <div className="border-t border-stone-100 pt-3 mt-1">
            <button
              onClick={handleLogout}
              className="w-full bg-rose-50 hover:bg-rose-100/70 text-rose-600 border border-rose-100 rounded-full py-3 text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <LogOut size={14} />
              우리둘 다이어리 로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
