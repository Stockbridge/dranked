import type { User } from '../../types/models';

export type { User };

export function getUserForEvent(eventId: string): User | null {
  if (typeof window === 'undefined') return null;
  
  const userJson = localStorage.getItem(`event_${eventId}_user`);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
}

export function setUserForEvent(eventId: string, user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`event_${eventId}_user`, JSON.stringify(user));
}

export function getAllEventIds(): string[] {
  if (typeof window === 'undefined') return [];
  
  const eventIds: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('event_') && key.endsWith('_user')) {
      const eventId = key.replace('event_', '').replace('_user', '');
      eventIds.push(eventId);
    }
  }
  return eventIds;
}
