import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addItemToEvent, getItemsByEventId } from './items';

vi.mock('./index', () => ({
  query: vi.fn()
}));

import { query } from './index';
const mockQuery = vi.mocked(query);

describe('Items DB Functions', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('addItemToEvent', () => {
    it('should create item with all fields', async () => {
      const mockResult = {
        rows: [{
          id: 'item-id',
          name: 'Test Beer',
          producer: 'Test Brewery',
          year: 2023,
          type: 'IPA'
        }]
      };
      mockQuery.mockResolvedValue(mockResult);

      const params = {
        event_id: 'event-id',
        name: 'Test Beer',
        producer: 'Test Brewery',
        year: 2023,
        type: 'IPA',
        added_by_user_id: 'user-id',
        added_by_name: 'Test User'
      };

      const result = await addItemToEvent(params);

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO items'),
        ['event-id', 'Test Beer', 'Test Brewery', 2023, 'IPA', 'user-id', 'Test User']
      );
      expect(result).toEqual(mockResult.rows[0]);
    });
  });

  describe('getItemsByEventId', () => {
    it('should return items for event', async () => {
      const mockItems = [
        { id: 'item1', name: 'Beer 1' },
        { id: 'item2', name: 'Beer 2' }
      ];
      mockQuery.mockResolvedValue({ rows: mockItems });

      const result = await getItemsByEventId('event-id');

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM items WHERE event_id = $1 ORDER BY created_at ASC',
        ['event-id']
      );
      expect(result).toEqual(mockItems);
    });
  });
});
