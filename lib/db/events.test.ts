import { describe, it, expect, beforeEach, vi } from 'vitest';
import { insertEvent, getEventByJoinCode, getEventById } from './events';

// Mock the database query function
vi.mock('../db', () => ({
  query: vi.fn()
}));

import { query } from '../db';
const mockQuery = vi.mocked(query);

describe('Events DB Functions', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  describe('insertEvent', () => {
    it('should create event with generated codes', async () => {
      const mockResult = {
        rows: [{
          id: 'test-id',
          join_code: 'ABC123',
          host_token: 'test-token'
        }]
      };
      mockQuery.mockResolvedValue(mockResult);

      const params = {
        hostName: 'Test Host',
        eventName: 'Test Event',
        beverageType: 'beer' as const,
        tastingStyle: 'open' as const
      };

      const result = await insertEvent(params);

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        expect.arrayContaining(['Test Event', 'beer', 'open', expect.any(String), 'Test Host', expect.any(String)])
      );
      expect(result).toEqual(mockResult.rows[0]);
    });
  });

  describe('getEventByJoinCode', () => {
    it('should return event for valid join code', async () => {
      const mockEvent = { id: 'test-id', name: 'Test Event' };
      mockQuery.mockResolvedValue({ rows: [mockEvent] });

      const result = await getEventByJoinCode('ABC123');

      expect(mockQuery).toHaveBeenCalledWith(
        'SELECT * FROM events WHERE join_code = $1 AND is_active = true',
        ['ABC123']
      );
      expect(result).toEqual(mockEvent);
    });

    it('should return null for invalid join code', async () => {
      mockQuery.mockResolvedValue({ rows: [] });

      const result = await getEventByJoinCode('INVALID');

      expect(result).toBeNull();
    });
  });
});
