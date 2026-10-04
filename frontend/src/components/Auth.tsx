import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { JaraIcon, LatteIcon, JaraLatteHero } from './Illustrations';
import { Eye, EyeOff, Mail, Lock, User, Heart } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [character, setCharacter] = useState<'jara' | 'latte'>('jara');
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (isSignUp && !name.trim()) {
      setErrorMsg('이름/닉네임을 꼭 입력해 주세요!');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        // --- SIGN UP ---
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;

        // Update firebase auth display profile name
        await updateProfile(user, { displayName: name.trim() });

        // Save custom user profile document in Firestore `/users/{uid}`
        const userProfile = {
          uid: user.uid,
          email: user.email,
          displayName: name.trim(),
          characterType: character,
          coupleId: null,
          createdAt: new Date()
        };

        await setDoc(doc(db, 'users', user.uid), userProfile);
      } else {
        // --- LOG IN ---
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      
      onAuthSuccess();
    } catch (err: any) {
      console.error('Authentication Error:', err);
      let korMsg = '이메일 또는 비밀번호를 다시 확인해 주세요.';
      if (err.code === 'auth/email-already-in-use') {
        korMsg = '이미 가입되어 있는 이메일 주소입니다.';
      } else if (err.code === 'auth/weak-password') {
        korMsg = '비밀번호를 최소 6자리 이상 입력해 주세요.';
      } else if (err.code === 'auth/invalid-email') {
        korMsg = '유효하지 않은 이메일 형식입니다.';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        korMsg = '이메일 또는 비밀번호가 틀렸습니다.';
      } else if (err.code === 'auth/operation-not-allowed') {
        korMsg = '이메일/비밀번호 로그인 방식이 활성화되어 있지 않습니다. 아래 Google 로그인을 사용하시거나, Firebase 콘솔(Authentication -> Sign-in method)에서 이메일/비밀번호 로그인을 활성화해 주세요.';
      }
      setErrorMsg(korMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      await signInWithPopup(auth, provider);
      onAuthSuccess();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      let korMsg = '구글 로그인 중 오류가 발생했습니다.';
      if (err.code === 'auth/operation-not-allowed') {
        korMsg = 'Firebase 콘솔에서 Google 로그인 제공업체가 활성화되어 있지 않습니다. 콘솔에서 Google 로그인을 활성화해 주세요.';
      } else if (err.message) {
        korMsg = `구글 로그인 실패: ${err.message}`;
      }
      setErrorMsg(korMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto relative select-none">
      
      {/* Visual Header */}
      <div className="text-center mb-6">
        <JaraLatteHero size={180} speechText={isSignUp ? "가입을 환영해! 💕" : "로그인해줘! ✨"} />
        <h1 className="text-3xl font-black text-amber-950 mt-4 tracking-tight">김자라 박라떼</h1>
        <p className="text-xs text-amber-800 font-bold mt-1.5 flex items-center justify-center gap-1">
          우리의 따뜻하고 말랑한 커플 다이어리
          <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" />
        </p>
      </div>

      {/* Main card box */}
      <div className="w-full bg-white border-3 border-amber-950 rounded-2xl p-6 scrapbook-shadow">
        <h2 className="text-xl font-bold text-amber-950 mb-1 text-center">
          {isSignUp ? '회원가입' : '로그인'}
        </h2>
        <p className="text-[11px] text-amber-800 text-center mb-4">
          {isSignUp ? '소중한 연인과 추억 여행을 떠나볼까요?' : '비공개 다이어리에 안전하게 로그인하세요.'}
        </p>

        {/* Friendly recommendation box */}
        <div className="bg-amber-50/70 border-2 border-dashed border-amber-300/60 rounded-xl p-3 text-[11px] font-medium text-amber-900 mb-4 flex items-start gap-2 leading-relaxed">
          <span className="text-sm leading-none mt-0.5">💡</span>
          <div>
            <span className="font-bold text-amber-950">추천 빠른 시작: </span>
            하단의 <span className="font-bold text-rose-500">Google 계정으로 로그인하기 🌟</span> 버튼을 클릭하시면, 번거로운 가입 절차 없이 1초 만에 나만의 캐릭터(김자라/박라떼)를 선택하고 연인과 비밀방을 만들 수 있습니다!
          </div>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-xs font-bold text-red-700 mb-4 text-center leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Sign Up Nickname Input */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1">
                <User size={13} /> 이름 또는 닉네임 📌
              </label>
              <input
                type="text"
                placeholder="예: 김자라 또는 박라떼"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={15}
                className="w-full bg-amber-50 border-2 border-amber-950 rounded-xl p-2.5 text-xs text-amber-950 focus:outline-none focus:bg-amber-100/50"
                required={isSignUp}
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1">
              <Mail size={13} /> 이메일 주소 ✉️
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-amber-50 border-2 border-amber-950 rounded-xl p-2.5 text-xs text-amber-950 focus:outline-none focus:bg-amber-100/50"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1">
              <Lock size={13} /> 비밀번호 🔑
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="최소 6자리 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-amber-50 border-2 border-amber-950 rounded-xl p-2.5 text-xs text-amber-950 focus:outline-none focus:bg-amber-100/50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3.5 transform -translate-y-1/2 text-amber-800/60 hover:text-amber-950"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Character pick during Sign up */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-amber-950 mb-2">대표 캐릭터 선택 🎨</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCharacter('jara')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center transition ${
                    character === 'jara'
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-amber-950/15 bg-transparent hover:border-amber-950/30'
                  }`}
                >
                  <JaraIcon size={64} />
                  <span className="font-bold text-amber-950 text-xs mt-1">김자라</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCharacter('latte')}
                  className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center transition ${
                    character === 'latte'
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-amber-950/15 bg-transparent hover:border-amber-950/30'
                  }`}
                >
                  <LatteIcon size={64} />
                  <span className="font-bold text-amber-950 text-xs mt-1">박라떼</span>
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-400 hover:bg-rose-500 text-white font-bold py-3 px-4 rounded-xl border-2 border-amber-950 scrapbook-shadow-sm transition text-xs mt-2"
          >
            {loading ? '인증 처리 중...' : isSignUp ? '김자라 박라떼 가입하기 🌸' : '비밀 다이어리 들어가기 🗝️'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-amber-950/15"></div>
          <span className="flex-shrink mx-4 text-[11px] font-bold text-amber-850/45">또는</span>
          <div className="flex-grow border-t border-amber-950/15"></div>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white hover:bg-amber-50 text-amber-950 font-bold py-3 px-4 rounded-xl border-2 border-amber-950 scrapbook-shadow-sm transition text-xs flex items-center justify-center gap-2"
        >
          <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.68,11.75 21.56,11.4 21.35,11.1z" fill="#4285F4" />
              <path d="M12,20.62c2.6,0 4.78,-0.86 6.38,-2.34l-3.3,-2.58c-0.91,0.61 -2.08,0.98 -3.08,0.98 -2.37,0 -4.38,-1.6 -5.1,-3.74H3.53v2.66C5.12,18.88 8.35,20.62 12,20.62z" fill="#34A853" />
              <path d="M6.9,12.94c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7s0.1,-1.16 0.28,-1.7V6.88H3.53C2.92,8.08 2.58,9.45 2.58,10.9s0.34,2.82 0.95,4.02L6.9,12.94z" fill="#FBBC05" />
              <path d="M12,6.12c1.41,0 2.68,0.48 3.68,1.44l2.76,-2.76C16.78,3.22 14.6,2.38 12,2.38c-3.65,0 -6.88,1.74 -8.47,4.5l3.37,2.66C7.62,7.72 9.63,6.12 12,6.12z" fill="#EA4335" />
            </g>
          </svg>
          Google 계정으로 로그인하기 🌟
        </button>

        {/* Toggle between Sign In / Sign Up */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg('');
            }}
            className="text-[11px] text-amber-900 font-bold hover:underline transition"
          >
            {isSignUp ? '이미 가입하셨나요? 로그인하기' : '아직 계정이 없으신가요? 회원가입하기'}
          </button>
        </div>
      </div>
    </div>
  );
};
