import { describe, it, expect, beforeEach, vi } from 'vitest';
import { addUserToEvent, getUserById } from './users';

vi.mock('./index', () => ({
  query: vi.fn()
}));

import { query } from './index';
const mockQuery = vi.mocked(query);

describe('Users DB Functions', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('addUserToEvent', () => {
    it('should create or update user', async () => {
      const mockResult = {
        rows: [{
          id: 'user-id',
          event_id: 'event-id',
          name: 'Test User'
        }]
      };
      mockQuery.mockResolvedValue(mockResult);

      const params = {
        eventId: 'event-id',
        name: 'Test User'
      };

      const result = await addUserToEvent(params);

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO users'),
        ['event-id', 'Test User']
      );
      expect(result).toEqual(mockResult.rows[0]);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = { id: 'user-id', name: 'Test User' };
      mockQuery.mockResolvedValue({ rows: [mockUser] });

      const result = await getUserById('user-id');

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        ['user-id']
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null for invalid id', async () => {
      mockQuery.mockResolvedValue({ rows: [] });

      const result = await getUserById('invalid');

      expect(result).toBeNull();
    });
  });
});
