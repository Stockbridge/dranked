import { query } from '../db';

/**
 * Parameters for adding a new beverage item to an event.
 */
export interface CreateItemParams {
  /** UUID of the event to add item to */
  eventId: string;
  /** Name/title of the beverage (required) */
  name: string;
  /** Brewery, winery, or distillery name (optional) */
  producer?: string;
  /** Vintage or production year (optional) */
  year?: number;
  /** Style/type like "IPA", "Pinot Noir" (optional) */
  type?: string;
  /** Name of the person who added this item */
  addedBy: string;
}

/**
 * Adds a new beverage item to an event.
 * 
 * @param params - Item creation parameters
 * @param params.eventId - UUID of the event to add item to
 * @param params.name - Name/title of the beverage (required)
 * @param params.producer - Brewery, winery, or distillery name (optional)
 * @param params.year - Vintage or production year (optional)
 * @param params.type - Style/type like "IPA", "Pinot Noir" (optional)
 * @param params.addedBy - Name of the person who added this item
 * @returns Promise resolving to the created item record
 * @throws Database error if event doesn't exist or constraints violated
 */
export const addItemToEvent = async (params: CreateItemParams) => {
  const result = await query(
    `INSERT INTO items (event_id, name, producer, year, type, added_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [params.eventId, params.name, params.producer, params.year, params.type, params.addedBy]
  );

  return result.rows[0];
};

/**
 * Retrieves all items for an event, ordered by creation time.
 * 
 * @param eventId - UUID of the event
 * @returns Promise resolving to array of items (empty if none exist)
 */
export const getItemsByEventId = async (eventId: string) => {
  const result = await query(
    'SELECT * FROM items WHERE event_id = $1 ORDER BY created_at ASC',
    [eventId]
  );

  return result.rows;
};
