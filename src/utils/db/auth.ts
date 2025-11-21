import { query } from './index';
import { getUserById } from './users';
import { AuthError } from '../errors';

/**
 * Verifies that a user is either the host or the person who added the item.
 * @throws AuthError if user can't edit the item
 */
export async function verifyCanEditItem(userId: string, itemId: string, eventId: string): Promise<void> {
  const [itemResult, eventResult, user] = await Promise.all([
    query('SELECT added_by_user_id FROM items WHERE id = $1', [itemId]),
    query('SELECT host_name FROM events WHERE id = $1', [eventId]),
    getUserById(userId)
  ]);
  
  const item = itemResult.rows[0];
  const event = eventResult.rows[0];
  
  if (!item) {
    throw new AuthError('Item not found');
  }
  
  if (!user) {
    throw new AuthError('User not found');
  }
  
  const isOwner = item.added_by_user_id === userId;
  const isHost = user.name === event?.host_name;
  
  if (!isOwner && !isHost) {
    throw new AuthError('Only the host or item creator can edit this item');
  }
}
