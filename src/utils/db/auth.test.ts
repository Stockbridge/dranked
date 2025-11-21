import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyCanEditItem } from './auth';
import { AuthError } from '../errors';
import * as users from './users';
import * as db from './index';

vi.mock('./users');
vi.mock('./index', () => ({
  query: vi.fn(),
  default: {}
}));

describe('verifyCanEditItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('allows item owner to edit', async () => {
    vi.mocked(db.query).mockResolvedValueOnce({
      rows: [{ added_by_user_id: 'user-123' }]
    } as any).mockResolvedValueOnce({
      rows: [{ host_name: 'Host' }]
    } as any);

    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-456',
      name: 'Owner',
      joined_at: '2024-01-01'
    });

    await expect(verifyCanEditItem('user-123', 'item-789', 'event-456')).resolves.toBeUndefined();
  });

  it('allows host to edit any item', async () => {
    vi.mocked(db.query).mockResolvedValueOnce({
      rows: [{ added_by_user_id: 'user-999' }]
    } as any).mockResolvedValueOnce({
      rows: [{ host_name: 'Host' }]
    } as any);

    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-456',
      name: 'Host',
      joined_at: '2024-01-01'
    });

    await expect(verifyCanEditItem('user-123', 'item-789', 'event-456')).resolves.toBeUndefined();
  });

  it('throws when user is neither owner nor host', async () => {
    vi.mocked(db.query).mockResolvedValueOnce({
      rows: [{ added_by_user_id: 'user-999' }]
    } as any).mockResolvedValueOnce({
      rows: [{ host_name: 'Host' }]
    } as any);

    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-456',
      name: 'Other User',
      joined_at: '2024-01-01'
    });

    await expect(verifyCanEditItem('user-123', 'item-789', 'event-456'))
      .rejects.toThrow(new AuthError('Only the host or item creator can edit this item'));
  });

  it('throws when item does not exist', async () => {
    vi.mocked(db.query).mockResolvedValueOnce({
      rows: []
    } as any).mockResolvedValueOnce({
      rows: [{ host_name: 'Host' }]
    } as any);

    vi.mocked(users.getUserById).mockResolvedValue({
      id: 'user-123',
      event_id: 'event-456',
      name: 'User',
      joined_at: '2024-01-01'
    });

    await expect(verifyCanEditItem('user-123', 'item-789', 'event-456'))
      .rejects.toThrow(new AuthError('Item not found'));
  });
});
