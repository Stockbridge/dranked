import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyUserInEvent } from './auth';
import { AuthError } from './errors';
import * as users from './db/users';

vi.mock('./db/users');
vi.mock('./db/index', () => ({
  query: vi.fn()
}));

describe('verifyUserInEvent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('passes when user exists and belongs to event', async () => {
    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-456',
      name: 'Test User',
      joined_at: '2024-01-01'
    });

    await expect(verifyUserInEvent('user-123', 'event-456')).resolves.toBeUndefined();
  });

  it('throws when user does not exist', async () => {
    vi.mocked(users.getUserById).mockResolvedValue(null);

    await expect(verifyUserInEvent('user-123', 'event-456'))
      .rejects.toThrow(new AuthError('User not found'));
  });

  it('throws when user belongs to different event', async () => {
    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-999',
      name: 'Test User',
      joined_at: '2024-01-01'
    });

    await expect(verifyUserInEvent('user-123', 'event-456'))
      .rejects.toThrow(new AuthError('User does not belong to this event'));
  });
});

