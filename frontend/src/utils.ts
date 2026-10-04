/**
 * Calculates the number of days between two YYYY-MM-DD date strings.
 * Returns negative if targetDate is in the future (D-day), and positive if in the past (D+day).
 */
export function calculateDaysDiff(targetDateStr: string): { days: number; text: string } {
  if (!targetDateStr) return { days: 0, text: '-' };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(targetDateStr);
  target.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { days: 0, text: 'D-Day' };
  } else if (diffDays > 0) {
    // Past date (e.g., "만난 날")
    // Usually, the first day is Day 1, so 10 days later is 11일째.
    // For D-day format, we write D+diffDays (e.g. D+10) or text like "11일째"
    return { days: diffDays, text: `${diffDays + 1}일째 (D+${diffDays})` };
  } else {
    // Future date (e.g., "생일")
    return { days: diffDays, text: `D${diffDays}` }; // will show as D-5, D-10
  }
}

/**
 * Generates standard key anniversaries based on the couple's start date
 */
export interface GeneratedMilestone {
  title: string;
  date: string;
  ddayText: string;
  daysRemaining: number; // For sorting
}

export function generateMilestones(startDateStr: string): GeneratedMilestone[] {
  if (!startDateStr) return [];
  
  const start = new Date(startDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const milestones: { title: string; offsetDays: number; isYear?: boolean }[] = [
    { title: '100일', offsetDays: 99 },
    { title: '200일', offsetDays: 199 },
    { title: '300일', offsetDays: 299 },
    { title: '1주년', offsetDays: 364 }, // or 1 year exactly
    { title: '500일', offsetDays: 499 },
    { title: '600일', offsetDays: 599 },
    { title: '700일', offsetDays: 699 },
    { title: '800일', offsetDays: 799 },
    { title: '900일', offsetDays: 899 },
    { title: '1000일', offsetDays: 999 },
    { title: '2주년', offsetDays: 729 },
    { title: '3주년', offsetDays: 1094 },
  ];
  
  return milestones.map(m => {
    const milestoneDate = new Date(start);
    milestoneDate.setDate(start.getDate() + m.offsetDays);
    
    // Format YYYY-MM-DD
    const yyyy = milestoneDate.getFullYear();
    const mm = String(milestoneDate.getMonth() + 1).padStart(2, '0');
    const dd = String(milestoneDate.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    
    const diff = today.getTime() - milestoneDate.getTime();
    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    let ddayText = '';
    let daysRemaining = daysDiff; // negative means future (remaining)
    
    if (daysDiff === 0) {
      ddayText = '오늘! 🎉';
    } else if (daysDiff > 0) {
      ddayText = `${daysDiff}일 지남`;
    } else {
      ddayText = `D${daysDiff}`; // negative, e.g. D-15
    }
    
    return {
      title: m.title,
      date: dateStr,
      ddayText,
      daysRemaining
    };
  });
}

/**
 * Generates a random 6-character alphanumeric code for invite
 */
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mood emoji mapping
 */
export const moodMap = {
  happy: { emoji: '😊', label: '행복해', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  love: { emoji: '🥰', label: '사랑해', color: 'bg-rose-100 text-rose-800 border-rose-300' },
  tired: { emoji: '😴', label: '피곤해', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  sad: { emoji: '😢', label: '속상해', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  angry: { emoji: '😤', label: '화나!', color: 'bg-red-100 text-red-800 border-red-300' },
  excited: { emoji: '🥳', label: '신나!', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
};

/**
 * Resizes a local image and converts it to a regular sRGB JPEG. Some mobile
 * HDR/large images can render as a black canvas, so decoding is retried through
 * a second browser path and the result is checked before it is saved.
 */
export async function compressAndEncodeImage(file: File, maxWidth = 800, maxHeight = 800): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('선택한 파일은 이미지가 아닙니다.');

  const objectUrl = URL.createObjectURL(file);
  const image = new window.Image();
  image.decoding = 'async';

  // Register the handlers before assigning src. On fast mobile browsers the
  // image may otherwise finish loading before onload is attached.
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error('이 사진 형식은 현재 브라우저에서 열 수 없습니다.'));
    image.src = objectUrl;
  });

  const fitSize = (sourceWidth: number, sourceHeight: number) => {
    if (!sourceWidth || !sourceHeight) throw new Error('사진 크기를 확인할 수 없습니다.');
    const scale = Math.min(1, maxWidth / sourceWidth, maxHeight / sourceHeight);
    return {
      width: Math.max(1, Math.round(sourceWidth * scale)),
      height: Math.max(1, Math.round(sourceHeight * scale)),
    };
  };

  const render = (source: CanvasImageSource, sourceWidth: number, sourceHeight: number) => {
    const { width, height } = fitSize(sourceWidth, sourceHeight);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('사진 변환 기능을 사용할 수 없습니다.');

    // JPEG has no transparency. Explicit white prevents transparent PNG areas
    // from being converted to black on mobile browsers.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(source, 0, 0, width, height);
    return canvas;
  };

  const isUnexpectedlyBlack = (canvas: HTMLCanvasElement) => {
    const sample = document.createElement('canvas');
    sample.width = 12;
    sample.height = 12;
    const context = sample.getContext('2d', { willReadFrequently: true });
    if (!context) return false;
    context.drawImage(canvas, 0, 0, 12, 12);
    const pixels = context.getImageData(0, 0, 12, 12).data;
    let nearBlack = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      if (pixels[index] < 4 && pixels[index + 1] < 4 && pixels[index + 2] < 4) nearBlack += 1;
    }
    return nearBlack >= 140; // Almost every sampled pixel became pure black.
  };

  const encode = (canvas: HTMLCanvasElement) => new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob || blob.size === 0) {
        reject(new Error('사진 변환 결과가 비어 있습니다.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('변환한 사진을 읽지 못했습니다.'));
      reader.readAsDataURL(blob);
    }, 'image/jpeg', 0.78);
  });

  let bitmap: ImageBitmap | null = null;
  try {
    // HTMLImageElement is the most compatible path. If a mobile browser turns
    // it black, ImageBitmap provides an independent decoder for a safe retry.
    let canvas = render(image, image.naturalWidth, image.naturalHeight);
    if (isUnexpectedlyBlack(canvas) && 'createImageBitmap' in window) {
      bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      canvas = render(bitmap, bitmap.width, bitmap.height);
    }
    if (isUnexpectedlyBlack(canvas)) {
      throw new Error('사진이 검게 변환되어 저장을 중단했습니다. 다른 사진 형식으로 다시 시도해 주세요.');
    }
    return await encode(canvas);
  } finally {
    bitmap?.close();
    URL.revokeObjectURL(objectUrl);
  }
}

