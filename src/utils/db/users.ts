import { query } from '../db';
import type { UserRow } from '../../../types/database';

/**
 * Parameters for creating a new user in an event.
 */
export interface CreateUserParams {
  /** UUID of the event to join */
  eventId: string;
  /** Display name of the user (must be unique per event) */
  name: string;
}

/**
 * Adds a user to an event or updates their join time if they already exist.
 * Uses ON CONFLICT to handle duplicate name/event combinations.
 * 
 * @param params - User creation parameters
 * @returns Promise resolving to the created/updated user record
 * @throws Database error if event doesn't exist or constraint violations
 */
export const addUserToEvent = async (params: CreateUserParams): Promise<UserRow> => {
  const result = await query(
    `INSERT INTO users (event_id, name)
     VALUES ($1, $2)
     ON CONFLICT (event_id, name) DO UPDATE SET joined_at = NOW()
     RETURNING *`,
    [params.eventId, params.name]
  );

  return result.rows[0];
};

/**
 * Retrieves a user by their unique ID.
 * 
 * @param userId - UUID of the user to retrieve
 * @returns Promise resolving to user record or null if not found
 */
export const getUserById = async (userId: string): Promise<UserRow | null> => {
  const result = await query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  return result.rows[0] || null;
};
