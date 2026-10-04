import { useEffect, useState, type FormEvent } from 'react';
import { arrayRemove, arrayUnion, deleteField, doc, updateDoc } from 'firebase/firestore';
import { CalendarHeart, CheckSquare, Heart, MessageCircle, Pencil, Plus, Send, Square, Trash2, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { createNotification } from '../lib/notifications';
import { CoupleRoom, NotificationTarget, UserProfile, WeeklyDateComment, WeeklyDateItem, WeeklyDateWish } from '../types';
import { JaraIcon, LatteIcon } from './Illustrations';

interface WeeklyDateTabProps {
  userProfile: UserProfile;
  coupleRoom: CoupleRoom;
  notificationTarget?: NotificationTarget | null;
  onTargetHandled?: () => void;
}

const DATE_LIST_KEY = 'date-list-v1';

function timeValue(value: any) {
  const date = value?.toDate ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

export function WeeklyDateTab({ userProfile, coupleRoom, notificationTarget, onTargetHandled }: WeeklyDateTabProps) {
  const [draft, setDraft] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [itemDraft, setItemDraft] = useState('');
  const [editingItem, setEditingItem] = useState<{ id: string; text: string } | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [replyTo, setReplyTo] = useState<Record<string, { id: string; name: string } | null>>({});
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const weekKey = DATE_LIST_KEY;
  const isCurrentWeek = true;

  useEffect(() => {
    if (!notificationTarget?.type.startsWith('weekly_date')) return;
    onTargetHandled?.();
  }, [notificationTarget, onTargetHandled]);

  const allDateWishes = coupleRoom.weeklyDateWishes || {};
  const wishes = allDateWishes[weekKey] || {};
  const legacyDateEntries = Object.entries(allDateWishes)
    .filter(([key]) => key !== DATE_LIST_KEY)
    .sort(([left], [right]) => right.localeCompare(left));
  const myWish = wishes[userProfile.uid];
  const partnerId = userProfile.uid === coupleRoom.user1Id ? coupleRoom.user2Id : coupleRoom.user1Id;
  const partnerWish = partnerId ? wishes[partnerId] : null;
  const partnerName = userProfile.uid === coupleRoom.user1Id
    ? (coupleRoom.user2Name || '상대방')
    : coupleRoom.user1Name;
  const partnerCharacter = userProfile.uid === coupleRoom.user1Id
    ? coupleRoom.user2Character
    : coupleRoom.user1Character;
  const myCharacter = userProfile.characterType || (userProfile.uid === coupleRoom.user1Id ? coupleRoom.user1Character : coupleRoom.user2Character) || 'jara';

  useEffect(() => {
    setDraft(myWish?.text || '');
  }, [myWish?.text]);

  useEffect(() => setIsEditing(false), [userProfile.uid]);

  const saveWish = async (event: FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || text === myWish?.text || saving) return;

    setSaving(true);
    try {
      // Update only the note fields, never replace the whole wish or its items/comments.
      await updateDoc(doc(db, 'couples', coupleRoom.id), {
        [`weeklyDateWishes.${weekKey}.${userProfile.uid}.text`]: text,
        [`weeklyDateWishes.${weekKey}.${userProfile.uid}.updatedAt`]: new Date(),
      });
      setIsEditing(false);
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: myCharacter,
        type: 'weekly_date_updated',
        title: `${userProfile.displayName}님이 데이트 기대를 남겼어요 💕`,
        body: text,
        targetId: weekKey,
      });
    } catch (error) {
      console.error('Error saving weekly date wish:', error);
      window.alert('데이트 기대를 저장하지 못했어. 인터넷 연결을 확인하고 다시 시도해 줘.');
    } finally {
      setSaving(false);
    }
  };

  const wishPath = (ownerId: string, field: string, sourceKey = weekKey) => `weeklyDateWishes.${sourceKey}.${ownerId}.${field}`;
  const roomRef = doc(db, 'couples', coupleRoom.id);

  const notifyPartner = (type: 'weekly_date_item_added' | 'weekly_date_comment' | 'weekly_date_like', title: string, body: string) =>
    createNotification({
      coupleId: coupleRoom.id,
      senderId: userProfile.uid,
      senderName: userProfile.displayName,
      senderCharacter: myCharacter,
      type,
      title,
      body,
      targetId: weekKey,
    });

  const addItem = async (event: FormEvent) => {
    event.preventDefault();
    const text = itemDraft.trim();
    if (!isCurrentWeek || !text || pendingAction) return;
    const id = crypto.randomUUID().replace(/-/g, '');
    setPendingAction('add-item');
    try {
      await updateDoc(roomRef, {
        [wishPath(userProfile.uid, `items.${id}`)]: { text, completed: false, createdAt: new Date() } satisfies WeeklyDateItem,
      });
      setItemDraft('');
      await notifyPartner('weekly_date_item_added', `${userProfile.displayName}님이 데이트 목록에 추가했어요 💕`, text);
    } catch (error) {
      console.error('Error adding date item:', error);
      window.alert('데이트 항목을 추가하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const toggleItem = async (ownerId: string, itemId: string, completed: boolean, sourceKey = weekKey) => {
    if (pendingAction) return;
    setPendingAction(`toggle-${itemId}`);
    try {
      await updateDoc(roomRef, {
        [wishPath(ownerId, `items.${itemId}.completed`, sourceKey)]: !completed,
        [wishPath(ownerId, `items.${itemId}.completedAt`, sourceKey)]: completed ? null : new Date(),
      });
    } catch (error) {
      console.error('Error toggling date item:', error);
      window.alert('완료 표시를 저장하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const saveItemEdit = async (event: FormEvent) => {
    event.preventDefault();
    const text = editingItem?.text.trim();
    if (!editingItem || !text || pendingAction) return;
    setPendingAction(`edit-${editingItem.id}`);
    try {
      await updateDoc(roomRef, { [wishPath(userProfile.uid, `items.${editingItem.id}.text`)]: text });
      setEditingItem(null);
    } catch (error) {
      console.error('Error editing date item:', error);
      window.alert('데이트 항목을 수정하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!isCurrentWeek || pendingAction || !window.confirm('이 데이트 항목을 삭제할까?')) return;
    setPendingAction(`remove-${itemId}`);
    try {
      await updateDoc(roomRef, { [wishPath(userProfile.uid, `items.${itemId}`)]: deleteField() });
    } catch (error) {
      console.error('Error removing date item:', error);
      window.alert('데이트 항목을 삭제하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const toggleHeart = async (ownerId: string, liked: boolean, sourceKey = weekKey) => {
    if (pendingAction) return;
    setPendingAction(`heart-${ownerId}`);
    try {
      await updateDoc(roomRef, {
        [wishPath(ownerId, 'likedBy', sourceKey)]: liked ? arrayRemove(userProfile.uid) : arrayUnion(userProfile.uid),
      });
      if (!liked && ownerId !== userProfile.uid) {
        await notifyPartner('weekly_date_like', `${userProfile.displayName}님이 데이트에 하트를 보냈어요 ❤️`, '이번 주 데이트를 확인해 봐!');
      }
    } catch (error) {
      console.error('Error liking date wish:', error);
      window.alert('하트를 저장하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const addComment = async (event: FormEvent, ownerId: string, sourceKey = weekKey) => {
    event.preventDefault();
    const interactionKey = `${sourceKey}:${ownerId}`;
    const text = commentDrafts[interactionKey]?.trim();
    if (!text || pendingAction) return;
    const id = crypto.randomUUID().replace(/-/g, '');
    const parent = replyTo[interactionKey];
    setPendingAction(`comment-${ownerId}`);
    try {
      await updateDoc(roomRef, {
        [wishPath(ownerId, `comments.${id}`, sourceKey)]: {
          text,
          authorId: userProfile.uid,
          authorName: userProfile.displayName,
          authorCharacter: myCharacter,
          createdAt: new Date(),
          parentCommentId: parent?.id || null,
          parentAuthorName: parent?.name || null,
        } satisfies WeeklyDateComment,
      });
      setCommentDrafts((previous) => ({ ...previous, [interactionKey]: '' }));
      setReplyTo((previous) => ({ ...previous, [interactionKey]: null }));
      await createNotification({
        coupleId: coupleRoom.id,
        senderId: userProfile.uid,
        senderName: userProfile.displayName,
        senderCharacter: myCharacter,
        type: 'weekly_date_comment',
        title: `${userProfile.displayName}님이 데이트에 댓글을 남겼어요 💬`,
        body: text,
        targetId: sourceKey,
      });
    } catch (error) {
      console.error('Error adding date comment:', error);
      window.alert('댓글을 저장하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const removeComment = async (ownerId: string, commentId: string, sourceKey = weekKey) => {
    const comment = allDateWishes[sourceKey]?.[ownerId]?.comments?.[commentId];
    if (!comment || comment.authorId !== userProfile.uid || pendingAction || !window.confirm('내 댓글을 삭제할까?')) return;
    setPendingAction(`remove-comment-${commentId}`);
    try {
      await updateDoc(roomRef, { [wishPath(ownerId, `comments.${commentId}`, sourceKey)]: deleteField() });
    } catch (error) {
      console.error('Error removing date comment:', error);
      window.alert('댓글을 삭제하지 못했어. 다시 시도해 줘.');
    } finally {
      setPendingAction(null);
    }
  };

  const periodLabel = (key: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return '이전 기록';
    const start = new Date(`${key}T12:00:00`);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return `${start.getMonth() + 1}월 ${start.getDate()}일 ~ ${end.getMonth() + 1}월 ${end.getDate()}일`;
  };

  const renderChecklist = (ownerId: string, wish: WeeklyDateWish | undefined, isMine: boolean, sourceKey = weekKey) => {
    const isMainList = sourceKey === weekKey;
    const items = Object.entries(wish?.items || {}).sort((a, b) => timeValue(a[1].createdAt) - timeValue(b[1].createdAt));
    const completedCount = items.filter(([, item]) => item.completed).length;
    return <div className="mt-4 border-t border-stone-100 pt-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-black text-stone-800">데이트 체크리스트</h2>
        <span className="text-xs font-bold text-rose-500">{completedCount}/{items.length} 완료</span>
      </div>
      {items.length === 0 ? (
        <p className="rounded-xl bg-stone-50 p-3 text-sm text-stone-500">아직 적어둔 데이트가 없어.</p>
      ) : (
        <div className="space-y-2">
          {items.map(([id, item]) => <div key={id} className="flex min-h-12 items-start gap-2 rounded-xl bg-stone-50 px-2 py-1.5">
            <button
              type="button"
              onClick={() => toggleItem(ownerId, id, item.completed, sourceKey)}
              disabled={!!pendingAction}
              aria-label={`${item.text} ${item.completed ? '완료 취소' : '완료 표시'}`}
              aria-pressed={item.completed}
              className="flex min-h-10 min-w-10 items-center justify-center text-rose-500 disabled:opacity-60"
            >
              {item.completed ? <CheckSquare size={23} /> : <Square size={23} />}
            </button>
            {isMine && editingItem?.id === id ? <form onSubmit={saveItemEdit} className="flex min-w-0 flex-1 items-center gap-1">
              <input
                value={editingItem.text}
                onChange={(event) => setEditingItem({ id, text: event.target.value })}
                maxLength={120}
                aria-label="데이트 항목 수정"
                className="min-w-0 flex-1 rounded-lg border border-rose-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-100"
              />
              <button type="submit" disabled={!editingItem.text.trim() || !!pendingAction} className="min-h-10 rounded-lg px-2 text-xs font-black text-rose-500 disabled:opacity-40">저장</button>
              <button type="button" onClick={() => setEditingItem(null)} className="min-h-10 rounded-lg px-2 text-xs font-bold text-stone-500">취소</button>
            </form> : <>
              <span className={`min-w-0 flex-1 py-2 text-sm leading-relaxed ${item.completed ? 'text-stone-400 line-through' : 'font-semibold text-stone-700'}`}>{item.text}</span>
              {isMine && isMainList && <div className="flex shrink-0 items-center">
                <button type="button" onClick={() => setEditingItem({ id, text: item.text })} aria-label={`${item.text} 수정`} className="flex min-h-10 min-w-10 items-center justify-center text-stone-400 hover:text-rose-500"><Pencil size={16} /></button>
                <button type="button" onClick={() => removeItem(id)} aria-label={`${item.text} 삭제`} className="flex min-h-10 min-w-10 items-center justify-center text-stone-400 hover:text-red-500"><Trash2 size={17} /></button>
              </div>}
            </>}
          </div>)}
        </div>
      )}
      {isMine && isMainList && <form onSubmit={addItem} className="mt-3 flex gap-2">
        <label htmlFor="date-item-input" className="sr-only">기대하는 데이트 추가</label>
        <input
          id="date-item-input"
          value={itemDraft}
          onChange={(event) => setItemDraft(event.target.value)}
          maxLength={120}
          placeholder="하고 싶은 데이트를 하나씩 적어봐"
          className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
        />
        <button type="submit" disabled={!itemDraft.trim() || !!pendingAction} className="flex min-h-11 items-center gap-1 rounded-xl bg-rose-500 px-3 text-sm font-black text-white disabled:bg-stone-300"><Plus size={17} /> 추가</button>
      </form>}
    </div>;
  };

  const renderEngagement = (ownerId: string, wish: WeeklyDateWish | undefined, sourceKey = weekKey) => {
    const interactionKey = `${sourceKey}:${ownerId}`;
    const comments = Object.entries(wish?.comments || {}).sort((a, b) => timeValue(a[1].createdAt) - timeValue(b[1].createdAt));
    const hasContent = Boolean(wish?.text?.trim() || Object.keys(wish?.items || {}).length || comments.length);
    if (!hasContent) return null;
    const likedBy = wish?.likedBy || [];
    const liked = likedBy.includes(userProfile.uid);
    const commentRow = ([id, comment]: [string, WeeklyDateComment], rootId: string, isReply = false) => <div key={id} className={`rounded-xl p-3 ${isReply ? 'ml-5 bg-rose-50/60' : 'bg-stone-50'}`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-xs font-black text-stone-700">{comment.authorName}</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-stone-400">{new Date(timeValue(comment.createdAt)).toLocaleDateString('ko-KR')}</span>
          {comment.authorId === userProfile.uid && <button type="button" onClick={() => removeComment(ownerId, id, sourceKey)} aria-label="내 댓글 삭제" className="flex min-h-9 min-w-9 items-center justify-center text-stone-400 hover:text-red-500"><Trash2 size={15} /></button>}
        </div>
      </div>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{comment.parentAuthorName && <span className="mr-1 font-bold text-rose-500">@{comment.parentAuthorName}</span>}{comment.text}</p>
      <button
        type="button"
        onClick={() => { setReplyTo((previous) => ({ ...previous, [interactionKey]: { id: rootId, name: comment.authorName } })); setShowComments((previous) => ({ ...previous, [interactionKey]: true })); }}
        className="mt-1 min-h-9 text-xs font-bold text-rose-500"
      >답글</button>
    </div>;
    const rootComments = comments.filter(([id, comment]) => !comment.parentCommentId || !wish?.comments?.[comment.parentCommentId] || comment.parentCommentId === id);

    return <div className="mt-4 border-t border-stone-100 pt-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => toggleHeart(ownerId, liked, sourceKey)}
          disabled={!!pendingAction}
          aria-label={liked ? '하트 취소' : '하트 보내기'}
          aria-pressed={liked}
          className={`flex min-h-11 items-center gap-1.5 text-sm font-black ${liked ? 'text-rose-500' : 'text-stone-500'} disabled:opacity-50`}
        ><Heart size={19} className={liked ? 'fill-rose-500' : ''} /> {likedBy.length}</button>
        <button
          type="button"
          onClick={() => setShowComments((previous) => ({ ...previous, [interactionKey]: !previous[interactionKey] }))}
          className="flex min-h-11 items-center gap-1.5 text-sm font-black text-stone-500"
        ><MessageCircle size={19} /> 댓글 {comments.length}</button>
      </div>
      {showComments[interactionKey] && <div className="mt-3 space-y-2">
        {comments.length === 0 ? <p className="text-sm text-stone-400">첫 댓글을 남겨봐 💬</p> : rootComments.map((root) => <div key={root[0]} className="space-y-2">
          {commentRow(root, root[0])}
          {comments.filter(([, comment]) => comment.parentCommentId === root[0]).map((reply) => commentRow(reply, root[0], true))}
        </div>)}
        {replyTo[interactionKey] && <div className="flex items-center gap-2 text-xs font-bold text-rose-500">
          @{replyTo[interactionKey]?.name}에게 답글
          <button type="button" onClick={() => setReplyTo((previous) => ({ ...previous, [interactionKey]: null }))} aria-label="답글 취소" className="flex min-h-9 min-w-9 items-center justify-center"><X size={16} /></button>
        </div>}
        <form onSubmit={(event) => addComment(event, ownerId, sourceKey)} className="flex items-end gap-2">
          <label htmlFor={`date-comment-${interactionKey}`} className="sr-only">데이트 댓글</label>
          <textarea
            id={`date-comment-${interactionKey}`}
            value={commentDrafts[interactionKey] || ''}
            onChange={(event) => setCommentDrafts((previous) => ({ ...previous, [interactionKey]: event.target.value }))}
            maxLength={280}
            rows={2}
            placeholder="댓글을 남겨봐"
            className="min-w-0 flex-1 resize-none rounded-xl border border-stone-200 p-3 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
          <button type="submit" disabled={!commentDrafts[interactionKey]?.trim() || !!pendingAction} className="flex min-h-11 items-center gap-1 rounded-xl bg-rose-500 px-3 text-sm font-black text-white disabled:bg-stone-300"><Send size={16} /> 등록</button>
        </form>
      </div>}
    </div>;
  };

  return (
    <div className="min-h-full bg-[#FAF7F2] px-5 pb-10 pt-20">
      <div className="mb-6 rounded-3xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-rose-500">
          <CalendarHeart size={21} />
          <span className="text-xs font-black tracking-widest">우리의 데이트 리스트</span>
        </div>
        <h1 className="text-2xl font-black text-stone-800">다음엔 뭐 하고 싶어?</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">주가 바뀌어도 목록은 사라지지 않아. 하고 싶은 데이트를 모아두고, 다녀오면 체크해 봐.</p>
      </div>

      {isCurrentWeek ? <div className="mb-5 rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          {myCharacter === 'jara' ? <JaraIcon size={38} /> : <LatteIcon size={38} />}
          <div>
            <p className="text-sm font-black text-stone-800">{userProfile.displayName}의 기대</p>
            <p className="text-xs text-stone-500">내가 기대하는 데이트</p>
          </div>
        </div>
        {!isEditing ? <div>
          {myWish?.text && <p className="whitespace-pre-wrap rounded-2xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">{myWish.text}</p>}
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-2 flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-black text-rose-500 transition hover:bg-rose-50"
          >
            <Pencil size={16} /> {myWish?.text ? '한마디 수정하기' : '기대 한마디 남기기'}
          </button>
        </div> : <form onSubmit={saveWish}>
          <label htmlFor="weekly-date-wish" className="sr-only">내가 기대하는 데이트 한마디</label>
          <textarea
            id="weekly-date-wish"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={280}
            rows={4}
            placeholder="예: 토요일에 같이 산책하고 맛있는 거 먹기 🌷"
            className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 p-4 text-sm leading-relaxed text-stone-800 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-stone-400">{draft.length}/280자</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => { setDraft(myWish?.text || ''); setIsEditing(false); }}
                className="min-h-11 rounded-xl px-3 text-sm font-bold text-stone-500 hover:bg-stone-100 disabled:opacity-50"
              >취소</button>
              <button
                type="submit"
                disabled={saving || !draft.trim() || draft.trim() === myWish?.text}
                className="flex min-h-11 items-center gap-2 rounded-xl bg-rose-500 px-5 text-sm font-black text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                <Send size={16} /> {saving ? '저장 중...' : '저장하기'}
              </button>
            </div>
          </div>
        </form>}
        {renderChecklist(userProfile.uid, myWish, true)}
        {renderEngagement(userProfile.uid, myWish)}
      </div> : (
        <div className="mb-5 rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
          <p className="mb-2 text-sm font-black text-stone-800">{userProfile.displayName}의 기대</p>
          {myWish?.text ? <p className="whitespace-pre-wrap rounded-2xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">{myWish.text}</p> : !myWish?.items && <p className="text-sm text-stone-500">이 주에는 남긴 이야기가 없어.</p>}
          {renderChecklist(userProfile.uid, myWish, true)}
          {renderEngagement(userProfile.uid, myWish)}
        </div>
      )}

      <div className="rounded-3xl border border-stone-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-3">
          {partnerCharacter === 'latte' ? <LatteIcon size={38} /> : <JaraIcon size={38} />}
          <div>
            <p className="text-sm font-black text-stone-800">{partnerName}의 기대</p>
            <p className="text-xs text-stone-500">상대방이 기대하는 데이트</p>
          </div>
          <Heart size={17} className="ml-auto fill-rose-100 text-rose-400" />
        </div>
        {partnerWish?.text ? <p className="whitespace-pre-wrap rounded-2xl bg-rose-50/70 p-4 text-sm leading-relaxed text-stone-700">{partnerWish.text}</p> : !partnerWish?.items && <p className="text-sm text-stone-500">아직 데이트 이야기를 남기지 않았어 💌</p>}
        {partnerId && renderChecklist(partnerId, partnerWish || undefined, false)}
        {partnerId && renderEngagement(partnerId, partnerWish || undefined)}
      </div>

      {legacyDateEntries.length > 0 && <section className="mt-6">
        <div className="mb-3 px-1">
          <h2 className="text-lg font-black text-stone-800">이전 기록</h2>
          <p className="mt-1 text-xs text-stone-500">전에 적은 내용도 그대로 있어. 미완료 항목은 여기서 계속 체크할 수 있어.</p>
        </div>
        <div className="space-y-4">
          {legacyDateEntries.map(([sourceKey, legacyWishes]) => {
            const legacyMine = legacyWishes[userProfile.uid];
            const legacyPartner = partnerId ? legacyWishes[partnerId] : undefined;
            if (!legacyMine && !legacyPartner) return null;
            return <div key={sourceKey} className="rounded-3xl border border-stone-200 bg-white p-4 shadow-sm">
              <p className="mb-4 text-xs font-black text-rose-500">{periodLabel(sourceKey)}</p>
              {legacyMine && <div className="mb-4 rounded-2xl bg-stone-50/70 p-3">
                <p className="mb-2 text-sm font-black text-stone-800">{userProfile.displayName}의 기록</p>
                {legacyMine.text && <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{legacyMine.text}</p>}
                {renderChecklist(userProfile.uid, legacyMine, true, sourceKey)}
                {renderEngagement(userProfile.uid, legacyMine, sourceKey)}
              </div>}
              {legacyPartner && partnerId && <div className="rounded-2xl bg-rose-50/50 p-3">
                <p className="mb-2 text-sm font-black text-stone-800">{partnerName}의 기록</p>
                {legacyPartner.text && <p className="whitespace-pre-wrap text-sm leading-relaxed text-stone-700">{legacyPartner.text}</p>}
                {renderChecklist(partnerId, legacyPartner, false, sourceKey)}
                {renderEngagement(partnerId, legacyPartner, sourceKey)}
              </div>}
            </div>;
          })}
        </div>
      </section>}
    </div>
  );
}
