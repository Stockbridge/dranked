import { query } from './index';
import crypto from 'crypto';
import { addUserToEvent } from './users';
import type { Event, User } from '../../../types/data';

/**
 * Parameters for creating a new tasting event.
 */
export interface CreateEventParams {
  /** Name of the event host */
  hostName: string;
  /** Display name for the event */
  eventName: string;
  /** Type of beverages being tasted */
  beverageType: 'beer' | 'wine' | 'whiskey';
  /** Whether participants can see beverage details (open) or not (blind) */
  tastingStyle: 'open' | 'blind';
}

/**
 * Creates a new tasting event with auto-generated join code and host token.
 * Also creates a user record for the host.
 * 
 * @param params - Event creation parameters
 * @returns Promise resolving to event record with generated codes and host user
 * @throws data error if creation fails
 */
export const createEvent = async (params: CreateEventParams): Promise<Event & { host_user: User }> => {
  const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const hostToken = crypto.randomBytes(32).toString('hex');

  const result = await query(
    `INSERT INTO events (name, beverage_type, tasting_style, join_code, host_name, host_token)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [params.eventName, params.beverageType, params.tastingStyle, joinCode, params.hostName, hostToken]
  );

  const event = result.rows[0];

  // Create user for host
  const hostUser = await addUserToEvent({
    eventId: event.id,
    name: params.hostName
  });

  return {
    ...event,
    host_user: hostUser
  };
};

/**
 * Retrieves an active event by its join code.
 * 
 * @param joinCode - 6-character alphanumeric join code
 * @returns Promise resolving to event record or null if not found/inactive
 */
export const getEventByJoinCode = async (joinCode: string): Promise<Event | null> => {
  const result = await query(
    'SELECT * FROM events WHERE join_code = $1 AND is_active = true',
    [joinCode]
  );
  return result.rows[0] || null;
};

/**
 * Retrieves an event by ID, optionally validating host access.
 * 
 * @param id - UUID of the event
 * @param hostToken - Optional host token for admin access validation
 * @returns Promise resolving to event record or null if not found/unauthorized
 */
export const getEventById = async (id: string, hostToken?: string): Promise<Event | null> => {
  const sql = hostToken 
    ? 'SELECT * FROM events WHERE id = $1 AND host_token = $2'
    : 'SELECT * FROM events WHERE id = $1';
  
  const params = hostToken ? [id, hostToken] : [id];
  
  const result = await query(sql, params);
  return result.rows[0] || null;
};
