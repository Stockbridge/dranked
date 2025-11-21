import type { Rating } from '../../../types/data';

/**
 * Submits or updates a user's rating for an item.
 * 
 * @param eventId - UUID of the event
 * @param userId - UUID of the user
 * @param itemId - UUID of the item being rated
 * @param score - Rating score (1-10)
 * @returns Promise resolving to the rating record
 * @throws Error if API request fails
 */
export const submitRating = async (
  eventId: string,
  userId: string,
  itemId: string,
  score: number
): Promise<Rating> => {
  const response = await fetch(`/api/event/${eventId}/user/${userId}/ratings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemId, score })
  });

  if (!response.ok) {
    throw new Error('Failed to submit rating');
  }

  return response.json();
};

/**
 * Gets all ratings for a user in an event.
 * 
 * @param eventId - UUID of the event
 * @param userId - UUID of the user
 * @returns Promise resolving to array of ratings
 * @throws Error if API request fails
 */
export const getUserRatings = async (
  eventId: string,
  userId: string
): Promise<Rating[]> => {
  const response = await fetch(`/api/event/${eventId}/user/${userId}/ratings`);

  if (!response.ok) {
    throw new Error('Failed to fetch ratings');
  }

  return response.json();
};
