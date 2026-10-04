import React from 'react';

// Custom cute hand-drawn character illustrations using inline SVG
// Based on the user's uploaded images of "동팔이(beige puppy)" and "두칠이(white puppy)"

interface IllustrationProps {
  className?: string;
  size?: number;
}

// 1. Jara Icon (Beige Puppy - "김자라")
export const JaraIcon: React.FC<IllustrationProps> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-sm`}
    >
      {/* Background Face */}
      <path
        d="M20,40 C20,25 35,20 50,20 C65,20 80,25 80,40 C80,55 75,68 50,68 C25,68 20,55 20,40 Z"
        fill="#f3dac2" // Pink-beige/cream color
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Left Floppy Ear */}
      <path
        d="M23,28 C12,28 15,51 25,51 C30,51 28,41 28,36"
        fill="#f3dac2"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Floppy Ear */}
      <path
        d="M77,28 C88,28 85,51 75,51 C70,51 72,41 72,36"
        fill="#f3dac2"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rosy Cheeks */}
      <ellipse cx="30" cy="48" rx="8" ry="5" fill="#fca5a5" opacity="0.7" />
      <ellipse cx="70" cy="48" rx="8" ry="5" fill="#fca5a5" opacity="0.7" />

      {/* Eyes (Cute angry/determined look like in the image) */}
      {/* Left eye & brow */}
      <path d="M38,36 L43,40" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="43" r="3" fill="#4a2c11" />
      
      {/* Right eye & brow */}
      <path d="M62,36 L57,40" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" />
      <circle cx="58" cy="43" r="3" fill="#4a2c11" />

      {/* Cute frowning mouth "/\" */}
      <path
        d="M47,53 L50,50 L53,53"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 2. Latte Icon (White Puppy - "박라떼")
export const LatteIcon: React.FC<IllustrationProps> = ({ className = '', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-sm`}
    >
      {/* Background Face */}
      <path
        d="M22,45 C22,30 35,22 50,22 C65,22 78,30 78,45 C78,58 72,68 50,68 C28,68 22,58 22,45 Z"
        fill="#ffffff"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Left Floppy Ear */}
      <path
        d="M23,32 C12,32 15,55 25,55 C30,55 28,45 28,40"
        fill="#ffffff"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Floppy Ear */}
      <path
        d="M77,32 C88,32 85,55 75,55 C70,55 72,45 72,40"
        fill="#ffffff"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Rosy Cheeks */}
      <ellipse cx="32" cy="52" rx="8" ry="5" fill="#fca5a5" opacity="0.8" />
      <ellipse cx="68" cy="52" rx="8" ry="5" fill="#fca5a5" opacity="0.8" />

      {/* Eyes (Determined eyes like in image) */}
      <path d="M39,40 L44,43" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" />
      <circle cx="43" cy="46" r="3" fill="#4a2c11" />
      
      <path d="M61,40 L56,43" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" />
      <circle cx="57" cy="46" r="3" fill="#4a2c11" />

      {/* Cute frowning mouth */}
      <path
        d="M47,55 L50,52 L53,55"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// 3. Hero Together: "우린 짱이야!" (Wearing red capes, holding hands)
export const JaraLatteHero: React.FC<IllustrationProps & { speechText?: string }> = ({
  className = '',
  size = 200,
  speechText = "우린 짱이야!"
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Speech Bubble */}
      <div className="relative mb-3 bg-white border-2 border-black rounded-full px-5 py-1.5 shadow-sm text-sm font-bold text-gray-800 tracking-wide animate-bounce flex items-center justify-center">
        <span>{speechText}</span>
        <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black"></div>
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white"></div>
      </div>

      <svg
        width={size * 1.5}
        height={size}
        viewBox="0 0 240 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        {/* Shadow */}
        <ellipse cx="120" cy="142" rx="75" ry="10" fill="#e4d5c5" opacity="0.6" />

        {/* --- KIM JARA (Beige Bear - Left) --- */}
        {/* Red Cape */}
        <path
          d="M45,100 Q30,105 32,130 Q55,130 75,120 Z"
          fill="#ef4444"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Left Foot */}
        <path
          d="M60,132 C60,142 72,142 72,132 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Right Foot */}
        <path
          d="M85,132 C85,142 97,142 97,132 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* Body */}
        <path
          d="M55,90 C50,115 55,133 78,133 C100,133 105,115 100,90 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cape Bow */}
        <circle cx="78" cy="94" r="5" fill="#ef4444" stroke="#4a2c11" strokeWidth="2.5" />
        <path d="M73,94 Q67,90 73,90 Z" fill="#ef4444" stroke="#4a2c11" strokeWidth="2" />
        <path d="M83,94 Q89,90 83,90 Z" fill="#ef4444" stroke="#4a2c11" strokeWidth="2" />

        {/* Head */}
        <path
          d="M45,65 C45,50 58,45 78,45 C98,45 111,50 111,65 C111,80 106,90 78,90 C50,90 45,80 45,65 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <path
          d="M46,55 C34,55 36,75 46,75"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Right Ear */}
        <path
          d="M110,55 C122,55 120,75 110,75"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* Blushing */}
        <ellipse cx="56" cy="72" rx="7" ry="4" fill="#fca5a5" opacity="0.7" />
        <ellipse cx="98" cy="72" rx="7" ry="4" fill="#fca5a5" opacity="0.7" />

        {/* Eyes (Fierce but cute) */}
        <path d="M63,61 L68,64" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="67" cy="67" r="2.5" fill="#4a2c11" />
        <path d="M89,61 L84,64" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="85" cy="67" r="2.5" fill="#4a2c11" />

        {/* Mouth */}
        <path d="M75,76 L78,73 L81,76" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Left Hand */}
        <path
          d="M55,102 C47,105 47,115 55,112"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />


        {/* --- PARK LATTE (White Puppy - Right) --- */}
        {/* Red Cape */}
        <path
          d="M195,100 Q210,105 208,130 Q185,130 165,120 Z"
          fill="#ef4444"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Left Foot */}
        <path
          d="M143,132 C143,142 155,142 155,132 Z"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Right Foot */}
        <path
          d="M168,132 C168,142 180,142 180,132 Z"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* Body */}
        <path
          d="M140,90 C135,115 140,133 162,133 C185,133 190,115 185,90 Z"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cape Bow */}
        <circle cx="162" cy="94" r="5" fill="#ef4444" stroke="#4a2c11" strokeWidth="2.5" />
        <path d="M157,94 Q151,90 157,90 Z" fill="#ef4444" stroke="#4a2c11" strokeWidth="2" />
        <path d="M167,94 Q173,90 167,90 Z" fill="#ef4444" stroke="#4a2c11" strokeWidth="2" />

        {/* Head */}
        <path
          d="M129,65 C129,50 142,45 162,45 C182,45 195,50 195,65 C195,80 190,90 162,90 C134,90 129,80 129,65 Z"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <path
          d="M130,55 C118,55 120,75 130,75"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Right Ear */}
        <path
          d="M194,55 C206,55 204,75 194,75"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* Blushing */}
        <ellipse cx="140" cy="72" rx="7" ry="4" fill="#fca5a5" opacity="0.8" />
        <ellipse cx="182" cy="72" rx="7" ry="4" fill="#fca5a5" opacity="0.8" />

        {/* Eyes (Fierce but cute) */}
        <path d="M147,61 L152,64" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="151" cy="67" r="2.5" fill="#4a2c11" />
        <path d="M173,61 L168,64" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="169" cy="67" r="2.5" fill="#4a2c11" />

        {/* Mouth */}
        <path d="M159,76 L162,73 L165,76" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Right Hand */}
        <path
          d="M185,102 C193,105 193,115 185,112"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* --- HOLDING HANDS (Center) --- */}
        <path
          d="M100,105 C110,100 130,100 140,105"
          stroke="#4a2c11"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// 4. Lifting Up: "내꼬 채고!" (Beige lifting White wearing a little crown)
export const JaraLiftingLatte: React.FC<IllustrationProps & { speechText?: string }> = ({
  className = '',
  size = 200,
  speechText = "내꼬 채고!"
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Speech Bubble */}
      <div className="relative mb-3 bg-white border-2 border-black rounded-full px-5 py-1.5 shadow-sm text-sm font-bold text-gray-800 tracking-wide animate-bounce flex items-center justify-center">
        <span className="flex items-center gap-1">
          {speechText} <span className="text-red-500">❤️</span>
        </span>
        <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black"></div>
        <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-white"></div>
      </div>

      <svg
        width={size * 1.3}
        height={size * 1.3}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        {/* Ground shadow */}
        <ellipse cx="100" cy="180" rx="50" ry="8" fill="#e4d5c5" opacity="0.6" />

        {/* Floating Hearts */}
        <path d="M140,50 C145,45 155,45 155,55 C155,65 140,75 140,75 C140,75 125,65 125,55 C125,45 135,45 140,50 Z" fill="#f87171" />
        <path d="M60,60 C63,56 70,56 70,63 C70,70 60,77 60,77 C60,77 50,70 50,63 C50,56 57,56 60,60 Z" fill="#f87171" transform="scale(0.8) translate(15, 15)" />

        {/* --- KIM JARA (Beige - Lower) --- */}
        {/* Feet */}
        <path d="M78,170 C78,178 88,178 88,170 Z" fill="#f3dac2" stroke="#4a2c11" strokeWidth="3" />
        <path d="M108,170 C108,178 118,178 118,170 Z" fill="#f3dac2" stroke="#4a2c11" strokeWidth="3" />
        
        {/* Body */}
        <path
          d="M75,120 C70,140 75,172 98,172 C120,172 125,140 120,120 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />

        {/* Head */}
        <path
          d="M65,100 C65,88 75,82 98,82 C121,82 131,88 131,100 C131,112 125,120 98,120 C71,120 65,112 65,100 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Ears */}
        <path d="M69,92 C59,92 61,108 69,108" fill="#f3dac2" stroke="#4a2c11" strokeWidth="2.5" />
        <path d="M127,92 C137,92 135,108 127,108" fill="#f3dac2" stroke="#4a2c11" strokeWidth="2.5" />
        
        {/* Blushing */}
        <ellipse cx="75" cy="106" rx="6" ry="3" fill="#fca5a5" opacity="0.7" />
        <ellipse cx="120" cy="106" rx="6" ry="3" fill="#fca5a5" opacity="0.7" />
        
        {/* Eyes (Happy open smile) */}
        <path d="M82,98 Q85,95 88,98" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M108,98 Q111,95 114,98" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        
        {/* Smiling Mouth */}
        <path d="M94,107 Q98,112 102,107" stroke="#4a2c11" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Hands Lifting Up */}
        <path
          d="M72,130 Q60,110 65,95"
          stroke="#4a2c11"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M123,130 Q135,110 130,95"
          stroke="#4a2c11"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />


        {/* --- PARK LATTE (White Puppy - Lifted Upper) --- */}
        <g transform="translate(10, -5) rotate(5, 100, 70)">
          {/* Body */}
          <path
            d="M80,55 C75,70 80,85 98,85 C115,85 120,70 115,55 Z"
            fill="#ffffff"
            stroke="#4a2c11"
            strokeWidth="3"
          />

          {/* Head */}
          <path
            d="M69,38 C69,25 80,20 98,20 C116,20 127,25 127,38 C127,50 120,58 98,58 C76,58 69,50 69,38 Z"
            fill="#ffffff"
            stroke="#4a2c11"
            strokeWidth="3"
          />

          {/* Crown */}
          <path
            d="M90,18 L93,10 L98,15 L103,10 L106,18 Z"
            fill="#facc15"
            stroke="#4a2c11"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="98" cy="14" r="1.5" fill="#ef4444" />

          {/* Floppy Ears */}
          <path d="M70,30 C60,30 62,46 70,46" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
          <path d="M126,30 C136,30 134,46 126,46" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />

          {/* Blushing */}
          <ellipse cx="78" cy="44" rx="6" ry="3" fill="#fca5a5" opacity="0.8" />
          <ellipse cx="118" cy="44" rx="6" ry="3" fill="#fca5a5" opacity="0.8" />

          {/* Happy closed eyes */}
          <path d="M84,35 Q88,31 92,35" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M104,35 Q108,31 112,35" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Tiny blushing mouth */}
          <path d="M96,44 Q98,46 100,44" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Little dangling feet */}
          <path d="M83,85 C83,92 90,92 90,85 Z" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
          <path d="M105,85 C105,92 112,92 112,85 Z" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};

// 5. Sleeping Cozy in Bed
export const JaraLatteSleeping: React.FC<IllustrationProps> = ({ className = '', size = 180 }) => {
  return (
    <svg
      width={size * 1.5}
      height={size}
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-md`}
    >
      {/* Cozy Bed Frame / Background */}
      <rect x="15" y="15" width="210" height="130" rx="15" fill="#fcf6ec" stroke="#4a2c11" strokeWidth="3" />
      
      {/* Pillows */}
      <rect x="25" y="25" width="80" height="45" rx="8" fill="#dbeafe" stroke="#4a2c11" strokeWidth="2.5" />
      <rect x="135" y="25" width="80" height="45" rx="8" fill="#dbeafe" stroke="#4a2c11" strokeWidth="2.5" />

      {/* --- PARK LATTE (White Puppy - Left pillow) --- */}
      <g transform="translate(25, 0)">
        {/* Head */}
        <path
          d="M15,45 C15,32 25,25 40,25 C55,25 65,32 65,45 C65,55 58,62 40,62 C22,62 15,55 15,45 Z"
          fill="#ffffff"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Ear */}
        <path d="M16,36 C8,36 10,50 16,50" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
        {/* Blushing */}
        <ellipse cx="23" cy="50" rx="5" ry="2.5" fill="#fca5a5" opacity="0.8" />
        {/* Sleeping Eye */}
        <path d="M30,42 Q35,46 40,42" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Little hands on blanket */}
        <path d="M30,68 C30,62 37,62 37,68 Z" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
        <path d="M43,68 C43,62 50,62 50,68 Z" fill="#ffffff" stroke="#4a2c11" strokeWidth="2.5" />
      </g>

      {/* --- KIM JARA (Beige Bear - Right pillow, facing away slightly or cozy sleeping) --- */}
      <g transform="translate(135, 0)">
        {/* Head */}
        <path
          d="M15,45 C15,32 25,25 40,25 C55,25 65,32 65,45 C65,55 58,62 40,62 C22,62 15,55 15,45 Z"
          fill="#f3dac2"
          stroke="#4a2c11"
          strokeWidth="3"
        />
        {/* Ear */}
        <path d="M64,36 C72,36 70,50 64,50" fill="#f3dac2" stroke="#4a2c11" strokeWidth="2.5" />
        {/* Blushing */}
        <ellipse cx="55" cy="50" rx="5" ry="2.5" fill="#fca5a5" opacity="0.7" />
        {/* Sleeping Eye */}
        <path d="M38,42 Q43,46 48,42" stroke="#4a2c11" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Little hands on blanket */}
        <path d="M30,68 C30,62 37,62 37,68 Z" fill="#f3dac2" stroke="#4a2c11" strokeWidth="2.5" />
        <path d="M43,68 C43,62 50,62 50,68 Z" fill="#f3dac2" stroke="#4a2c11" strokeWidth="2.5" />
      </g>

      {/* Blue Blanket over them */}
      <path
        d="M20,68 C20,62 220,62 220,68 L220,140 C220,142 218,144 216,144 L24,144 C22,144 20,142 20,140 Z"
        fill="#93c5fd"
        stroke="#4a2c11"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Blanket Pattern (Lines or cute waves) */}
      <path d="M50,90 Q90,80 130,90 Q170,100 210,90" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,4" fill="none" />
      <path d="M30,115 Q80,105 130,115 Q180,125 210,115" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,4" fill="none" />

      {/* Floating sleep Zzz */}
      <text x="90" y="40" fill="#4a2c11" fontSize="10" fontWeight="bold" fontFamily="monospace" transform="rotate(-15 90 40)">Z</text>
      <text x="100" y="30" fill="#4a2c11" fontSize="14" fontWeight="bold" fontFamily="monospace" transform="rotate(-15 100 30)">Z</text>
      <text x="115" y="20" fill="#4a2c11" fontSize="18" fontWeight="bold" fontFamily="monospace" transform="rotate(-15 115 20)">Z</text>
    </svg>
  );
};
