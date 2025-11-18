import { query } from '../db';

/**
 * Parameters for creating or updating a user's rating.
 */
export interface CreateRatingParams {
  /** UUID of the event */
  eventId: string;
  /** UUID of the item being rated */
  itemId: string;
  /** UUID of the user submitting the rating */
  userId: string;
  /** Rating score (1-10 scale) */
  score: number;
}

/**
 * Creates or updates a user's rating for a specific item.
 * Uses ON CONFLICT to allow users to change their ratings.
 * 
 * @param params - Rating parameters
 * @param params.eventId - UUID of the event
 * @param params.itemId - UUID of the item being rated
 * @param params.userId - UUID of the user submitting the rating
 * @param params.score - Rating score (1-10 scale)
 * @returns Promise resolving to the created/updated rating record
 * @throws Database error if constraints violated (invalid IDs, score out of range)
 */
export const upsertRating = async (params: CreateRatingParams) => {
  const result = await query(
    `INSERT INTO ratings (event_id, item_id, user_id, score)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (item_id, user_id) DO UPDATE SET score = $4, created_at = NOW()
     RETURNING *`,
    [params.eventId, params.itemId, params.userId, params.score]
  );

  return result.rows[0];
};

/**
 * Retrieves all ratings submitted by a specific user for an event.
 * 
 * @param eventId - UUID of the event
 * @param userId - UUID of the user
 * @returns Promise resolving to array of rating records (empty if none exist)
 */
export const getRatingsByEventAndUser = async (eventId: string, userId: string) => {
  const result = await query(
    'SELECT * FROM ratings WHERE event_id = $1 AND user_id = $2',
    [eventId, userId]
  );

  return result.rows;
};
