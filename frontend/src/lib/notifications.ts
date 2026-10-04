import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export type NotificationType =
  | 'diary_new'
  | 'diary_comment'
  | 'diary_like'
  | 'bucket_new'
  | 'bucket_comment'
  | 'album_new'
  | 'album_comment'
  | 'album_like'
  | 'schedule_new'
  | 'schedule_comment'
  | 'anniversary_new'
  | 'weekly_date_updated'
  | 'weekly_date_item_added'
  | 'weekly_date_comment'
  | 'weekly_date_like';

export interface CreateNotificationParams {
  coupleId: string;
  senderId: string;
  senderName: string;
  senderCharacter: 'jara' | 'latte';
  type: NotificationType;
  title: string;
  body: string;
  targetId?: string;
}

export async function createNotification({
  coupleId,
  senderId,
  senderName,
  senderCharacter,
  type,
  title,
  body,
  targetId,
}: CreateNotificationParams) {
  try {
    await addDoc(collection(db, 'notifications'), {
      coupleId,
      senderId,
      senderName,
      senderCharacter,
      type,
      title,
      body,
      targetId: targetId || null,
      createdAt: new Date(),
      read: false,
      readBy: [senderId],
    });
  } catch (err) {
    console.error('Error creating notification:', err);
  }
}
