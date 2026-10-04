export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  characterType?: 'jara' | 'latte' | null; // 'jara' = beige puppy, 'latte' = white puppy
  coupleId: string | null;
  createdAt: any;
  notificationClearedAt?: any;
}

export interface CoupleRoom {
  id: string; // The coupleId
  code: string; // 6-digit invite code
  user1Id: string;
  user1Name: string;
  user1Character: 'jara' | 'latte';
  user2Id: string | null;
  user2Name: string | null;
  user2Character: 'jara' | 'latte' | null;
  status: 'waiting' | 'paired';
  startDate: string; // "YYYY-MM-DD" - when they met
  createdAt: any;
  totalHearts?: number; // Total love hearts collected
  bgImage?: string; // Base64 compressed custom background image
  weeklyDateWishes?: Record<string, Record<string, WeeklyDateWish>>;
}

export interface WeeklyDateWish {
  text?: string; // Existing wishes remain readable without migration.
  updatedAt?: any;
  items?: Record<string, WeeklyDateItem>;
  likedBy?: string[];
  comments?: Record<string, WeeklyDateComment>;
}

export interface WeeklyDateItem {
  text: string;
  completed: boolean;
  createdAt: any;
  completedAt?: any;
}

export interface WeeklyDateComment {
  text: string;
  authorId: string;
  authorName: string;
  authorCharacter: 'jara' | 'latte';
  createdAt: any;
  parentCommentId?: string | null;
  parentAuthorName?: string | null;
}

export interface Schedule {
  id: string;
  coupleId: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  memo: string;
  color?: string; // Hex color for calendar circle/badge
  authorId: string;
  authorName: string;
  authorCharacter: 'jara' | 'latte';
  createdAt: any;
  commentCount?: number;
}

export interface AlbumPhoto {
  id: string;
  coupleId: string;
  photoUrl: string; // Base64 compressed string
  caption: string;
  date: string; // "YYYY-MM-DD"
  authorId: string;
  authorName: string;
  authorCharacter: 'jara' | 'latte';
  createdAt: any;
  likes?: string[]; // List of user UIDs who liked
  commentCount?: number;
}

export interface DiaryEntry {
  id: string;
  coupleId: string;
  date: string; // "YYYY-MM-DD"
  title: string;
  content: string;
  mood: 'happy' | 'love' | 'tired' | 'sad' | 'angry' | 'excited';
  photoUrl: string; // Optional image URL
  authorId: string;
  authorName: string;
  authorCharacter: 'jara' | 'latte';
  likes: string[]; // List of user UIDs who liked
  createdAt: any;
  commentCount?: number;
}

export interface Comment {
  id: string;
  coupleId?: string;
  authorId: string;
  authorName: string;
  authorCharacter: 'jara' | 'latte';
  text: string;
  createdAt: any;
  parentCommentId?: string | null;
  parentAuthorName?: string | null;
}

export interface NotificationTarget {
  id: string;
  type: string;
}

export interface Anniversary {
  id: string;
  coupleId: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  memo: string;
  isSystem?: boolean; // Automatic ones like 100 days
}

export interface BucketItem {
  id: string;
  coupleId: string;
  title: string;
  memo: string;
  isCompleted: boolean;
  completedAt: string | null;
  createdAt: any;
  commentCount?: number;
}
