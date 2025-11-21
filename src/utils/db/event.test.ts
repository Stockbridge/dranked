import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createEvent, getEventByJoinCode } from './event';

// Mock the data query function
vi.mock('./index', () => ({
  query: vi.fn()
}));

// Mock the users module
vi.mock('./users', () => ({
  addUserToEvent: vi.fn()
}));

import { query } from '../db';
import { addUserToEvent } from './users';
const mockQuery = vi.mocked(query);
const mockAddUserToEvent = vi.mocked(addUserToEvent);

describe('Events DB Functions', () => {
  beforeEach(() => {
    mockQuery.mockClear();
    mockAddUserToEvent.mockClear();
  });

  describe('createEvent', () => {
    it('should create event with generated codes and host user', async () => {
      const mockEventResult = {
        rows: [{
          id: 'test-id',
          join_code: 'ABC123',
          host_token: 'test-token'
        }]
      };
      const mockHostUser = {
        id: 'user-id',
        name: 'Test Host'
      };
      
      mockQuery.mockResolvedValue(mockEventResult);
      mockAddUserToEvent.mockResolvedValue(mockHostUser);

      const params = {
        hostName: 'Test Host',
        eventName: 'Test Event',
        beverageType: 'beer' as const,
        tastingStyle: 'open' as const
      };

      const result = await createEvent(params);

      expect(mockQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO events'),
        expect.arrayContaining(['Test Event', 'beer', 'open', expect.any(String), 'Test Host', expect.any(String)])
      );
      expect(mockAddUserToEvent).toHaveBeenCalledWith({
        eventId: 'test-id',
        name: 'Test Host'
      });
      expect(result).toEqual({
        ...mockEventResult.rows[0],
        host_user: mockHostUser
      });
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
