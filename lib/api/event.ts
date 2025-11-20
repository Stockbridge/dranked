/**
 * Data required to create a new tasting event.
 */
export interface CreateEventData {
  /** Name of the person hosting the event */
  hostName: string;
  /** Display name for the event */
  eventName: string;
  /** Type of beverages (beer, wine, whiskey) */
  beverageType: 'beer' | 'wine' | 'whiskey';
  /** Open (show details) or blind (hide details) */
  tastingStyle: 'open' | 'blind';
}

/**
 * Response from creating an event, includes access URLs and tokens.
 */
export interface EventResponse {
  /** UUID of the created event */
  id: string;
  /** 6-character join code for participants */
  joinCode: string;
  /** Secret token for host admin access */
  hostToken: string;
  /** Host user object */
  hostUser: {
    id: string;
    name: string;
  };
  /** URL participants use to join the event */
  joinUrl: string;
  /** URL host uses to manage the event */
  hostUrl: string;
}

/**
 * Creates a new tasting event and returns access URLs.
 * 
 * @param data - Event creation data
 * @param data.hostName - Name of the person hosting the event
 * @param data.eventName - Display name for the event
 * @param data.beverageType - Type of beverages (beer, wine, whiskey)
 * @param data.tastingStyle - Open (show details) or blind (hide details)
 * @returns Promise resolving to event with join/host URLs
 * @throws Error if API request fails
 * 
 * @example
 * ```typescript
 * const event = await createEvent({
 *   hostName: 'Alice',
 *   eventName: 'Friday Beer Night',
 *   beverageType: 'beer',
 *   tastingStyle: 'open'
 * });
 * // Share event.joinUrl with participants
 * // Bookmark event.hostUrl for management
 * ```
 */
export const createEvent = async (data: CreateEventData): Promise<EventResponse> => {
  const response = await fetch('/api/event/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create event');
  }

  return response.json();
};

/**
 * Retrieves all items for a specific event.
 * 
 * @param eventId - UUID of the event
 * @returns Promise resolving to array of items
 * @throws Error if API request fails
 */
export const getEventItems = async (eventId: string) => {
  const response = await fetch(`/api/event/${eventId}/items`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  return response.json();
};
