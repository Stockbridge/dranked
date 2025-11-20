import { getUserById } from './db/users';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Verifies that a user exists and belongs to the specified event.
 * @throws AuthError if user doesn't exist or doesn't belong to event
 */
export async function verifyUserInEvent(userId: string, eventId: string): Promise<void> {
  const user = await getUserById(userId);
  
  if (!user) {
    throw new AuthError('User not found');
  }
  
  if (user.event_id !== eventId) {
    throw new AuthError('User does not belong to this event');
  }
}
