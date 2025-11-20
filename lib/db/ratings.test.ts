import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateRating, getRatingsByEventAndUser } from './ratings';

vi.mock('../db', () => ({
  query: vi.fn()
}));

import { query } from '../db';
const mockQuery = vi.mocked(query);

describe('Ratings DB Functions', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('updateRating', () => {
    it('should create or update rating', async () => {
      const mockResult = {
        rows: [{
          id: 'rating-id',
          event_id: 'event-id',
          item_id: 'item-id',
          user_id: 'user-id',
          score: 8
        }]
      };
      mockQuery.mockResolvedValue(mockResult);

      const params = {
        eventId: 'event-id',
        itemId: 'item-id',
        userId: 'user-id',
        score: 8
      };

      const result = await updateRating(params);

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO ratings'),
        ['event-id', 'item-id', 'user-id', 8]
      );
      expect(result).toEqual(mockResult.rows[0]);
    });
  });

  describe('getRatingsByEventAndUser', () => {
    it('should return user ratings for event', async () => {
      const mockRatings = [
        { item_id: 'item1', score: 8 },
        { item_id: 'item2', score: 6 }
      ];
      mockQuery.mockResolvedValue({ rows: mockRatings });

      const result = await getRatingsByEventAndUser('event-id', 'user-id');

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM ratings WHERE event_id = $1 AND user_id = $2',
        ['event-id', 'user-id']
      );
      expect(result).toEqual(mockRatings);
    });
  });
});
