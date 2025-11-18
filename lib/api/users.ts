/**
 * Data required for a user to join an event.
 */
export interface JoinEventData {
  /** UUID of the event to join */
  eventId: string;
  /** Display name for the user (must be unique per event) */
  name: string;
}

/**
 * Joins a user to an event by creating a user record.
 * If the user already exists in the event, updates their join time.
 * 
 * @param data - Join event data
 * @param data.eventId - UUID of the event to join
 * @param data.name - Display name for the user (must be unique per event)
 * @returns Promise resolving to the user record with ID
 * @throws Error if the API request fails or returns non-200 status
 * 
 * @example
 * ```typescript
 * const user = await joinEvent({
 *   eventId: 'abc-123',
 *   name: 'John Doe'
 * });
 * console.log(user.id); // User UUID for future API calls
 * ```
 */
export const joinEvent = async (data: JoinEventData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to join event');
  }

  return response.json();
};
