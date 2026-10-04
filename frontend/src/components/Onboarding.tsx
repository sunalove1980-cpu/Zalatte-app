import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { doc, runTransaction } from 'firebase/firestore';
import { UserProfile } from '../types';
import { JaraIcon, LatteIcon } from './Illustrations';
import { LogOut, ArrowRight, Heart } from 'lucide-react';
import { auth } from '../lib/firebase';

interface OnboardingProps {
  userProfile: UserProfile;
  onProfileUpdated: (profile: UserProfile) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ userProfile, onProfileUpdated }) => {
  const [character, setCharacter] = useState<'jara' | 'latte'>('jara');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // Confirm character choice and save to user profile
  const handleConfirmCharacter = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const defaultRoomId = 'default_jara_latte';
      const userDocRef = doc(db, 'users', userProfile.uid);
      
      const roomDocRef = doc(db, 'couples', defaultRoomId);
      
      const isJara = character === 'jara';
      const updatedProfile = {
        uid: userProfile.uid,
        email: userProfile.email,
        displayName: userProfile.displayName,
        characterType: character,
        coupleId: defaultRoomId,
        createdAt: userProfile.createdAt || new Date()
      };

      await runTransaction(db, async (transaction) => {
        const roomSnap = await transaction.get(roomDocRef);
        if (!roomSnap.exists()) {
          throw new Error('COUPLE_ROOM_NOT_CONFIGURED');
        }

        const room = roomSnap.data();
        const selectedSlotId = isJara ? room.user1Id : room.user2Id;
        const otherSlotId = isJara ? room.user2Id : room.user1Id;

        if (selectedSlotId && selectedSlotId !== userProfile.uid) {
          const legacyProfile = await transaction.get(doc(db, 'users', selectedSlotId));
          if (!legacyProfile.exists() || legacyProfile.data().email !== userProfile.email) {
            throw new Error('CHARACTER_ALREADY_ASSIGNED');
          }
        }
        if (otherSlotId === userProfile.uid) {
          throw new Error('USER_ALREADY_ASSIGNED_TO_OTHER_CHARACTER');
        }

        const roomMemberUpdate = isJara
          ? {
              user1Id: userProfile.uid,
              user1Name: userProfile.displayName || '김자라',
              user1Character: 'jara' as const
            }
          : {
              user2Id: userProfile.uid,
              user2Name: userProfile.displayName || '박라떼',
              user2Character: 'latte' as const
            };

        // Only update the selected member slot. Existing dates, content and
        // room metadata are deliberately left untouched.
        transaction.update(roomDocRef, roomMemberUpdate);
        transaction.set(userDocRef, updatedProfile, { merge: true });
      });

      onProfileUpdated(updatedProfile);
    } catch (err: any) {
      console.error('Error saving character:', err);
      if (err?.message === 'CHARACTER_ALREADY_ASSIGNED') {
        setErrorMessage('이 캐릭터는 이미 상대방 계정에 연결되어 있어요. 다른 캐릭터를 선택해 주세요.');
      } else if (err?.message === 'USER_ALREADY_ASSIGNED_TO_OTHER_CHARACTER') {
        setErrorMessage('이 Google 계정은 이미 다른 캐릭터로 연결되어 있어요.');
      } else if (err?.message === 'COUPLE_ROOM_NOT_CONFIGURED') {
        setErrorMessage('기존 커플방을 찾을 수 없어요. 새 방은 자동으로 만들지 않았습니다.');
      } else {
        setErrorMessage('커플방 연결을 확인하지 못했어요. 잠시 후 다시 시도해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto relative select-none">
      
      {/* Top Logout option */}
      <button 
        onClick={handleLogout}
        className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 transition"
      >
        <LogOut size={13} />
        로그아웃
      </button>

      {/* --- STEP: Choose Character --- */}
      <div className="w-full bg-white border-2 border-stone-100 rounded-3xl p-6 shadow-md flex flex-col items-center animate-fade-in">
        <span className="text-[11px] bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1 rounded-full font-bold mb-2 flex items-center gap-1">
          <Heart size={10} className="fill-rose-500 text-rose-500" />
          반가워요! 캐릭터 선택
        </span>
        <h2 className="text-xl font-bold text-stone-800 mb-1 text-center font-sans">내 캐릭터 고르기</h2>
        <p className="text-xs text-stone-500 text-center mb-6">나를 나타낼 귀여운 캐릭터를 골라주세요!</p>

        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {/* Jara option */}
          <button
            onClick={() => setCharacter('jara')}
            disabled={loading}
            className={`p-5 rounded-3xl border flex flex-col items-center transition-all ${
              character === 'jara'
                ? 'border-rose-400 bg-rose-50/20 scale-105 shadow-xs ring-2 ring-rose-200'
                : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
            }`}
          >
            <div className="transform hover:scale-110 transition duration-300">
              <JaraIcon size={120} />
            </div>
            <span className="font-bold text-stone-800 mt-2 text-base">김자라</span>
            <span className="text-[11px] text-stone-500 mt-1">핑크베이지 귀염둥이 🐶</span>
          </button>

          {/* Latte option */}
          <button
            onClick={() => setCharacter('latte')}
            disabled={loading}
            className={`p-5 rounded-3xl border flex flex-col items-center transition-all ${
              character === 'latte'
                ? 'border-rose-400 bg-rose-50/20 scale-105 shadow-xs ring-2 ring-rose-200'
                : 'border-stone-200 bg-stone-50/50 hover:border-stone-300'
            }`}
          >
            <div className="transform hover:scale-110 transition duration-300">
              <LatteIcon size={120} />
            </div>
            <span className="font-bold text-stone-800 mt-2 text-base">박라떼</span>
            <span className="text-[11px] text-stone-500 mt-1">말랑말랑 하얀 순둥이 🐶</span>
          </button>
        </div>

        <button
          onClick={handleConfirmCharacter}
          disabled={loading}
          className="w-full bg-rose-400 hover:bg-rose-500 disabled:bg-rose-300 text-white font-semibold py-3 px-4 rounded-full shadow-md shadow-rose-100 flex items-center justify-center gap-2 transition-all text-sm"
        >
          {loading ? '비밀방 입장하는 중...' : '다이어리 시작하기'}
          <ArrowRight size={16} />
        </button>
        {errorMessage && (
          <p className="mt-3 text-xs font-semibold text-red-600 text-center" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
