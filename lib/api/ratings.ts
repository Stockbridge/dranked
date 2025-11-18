/**
 * Data required to submit or update a user's rating for a beverage item.
 */
export interface SubmitRatingData {
  /** UUID of the event */
  eventId: string;
  /** UUID of the item being rated */
  itemId: string;
  /** UUID of the user submitting the rating */
  userId: string;
  /** Rating score on 1-10 scale (integers only) */
  score: number;
}

/**
 * Submits or updates a user's rating for a beverage item.
 * Users can change their ratings - the latest submission overwrites previous ones.
 * 
 * @param data - Rating submission data
 * @param data.eventId - UUID of the event
 * @param data.itemId - UUID of the item being rated
 * @param data.userId - UUID of the user submitting the rating
 * @param data.score - Rating score on 1-10 scale (integers only)
 * @returns Promise resolving to the rating record
 * @throws Error if API request fails or score is out of range
 * 
 * @example
 * ```typescript
 * const rating = await submitRating({
 *   eventId: 'abc-123',
 *   itemId: 'item-456',
 *   userId: 'user-789',
 *   score: 8
 * });
 * ```
 */
export const submitRating = async (data: SubmitRatingData) => {
  const response = await fetch('/api/ratings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to submit rating');
  }

  return response.json();
};
