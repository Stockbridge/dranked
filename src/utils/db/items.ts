import { query } from '../db';
import type { ItemSummary } from '../../../types/models';
import type { ItemRow } from '../../../types/database';

/**
 * Parameters for adding a new beverage item to an event.
 */
export interface CreateItemParams extends Omit<ItemSummary, 'id'> {
  /** UUID of the event to add item to */
  eventId: string;
  /** UUID of the user adding this item */
  addedByUserId: string;
  /** Name of the user adding this item */
  addedByName: string;
}

/**
 * Adds a new beverage item to an event.
 * 
 * @param params - Item creation parameters
 * @returns Promise resolving to the created item record
 * @throws Database error if event doesn't exist or constraints violated
 */
export const addItemToEvent = async (params: CreateItemParams): Promise<ItemRow> => {
  const result = await query(
    `INSERT INTO items (event_id, name, producer, year, type, added_by_user_id, added_by_name)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [params.eventId, params.name, params.producer, params.year, params.type, params.addedByUserId, params.addedByName]
  );

  return result.rows[0];
};

/**
 * Retrieves all items for an event, ordered by creation time.
 * 
 * @param eventId - UUID of the event
 * @returns Promise resolving to array of items (empty if none exist)
 */
export const getItemsByEventId = async (eventId: string): Promise<ItemRow[]> => {
  const result = await query(
    'SELECT * FROM items WHERE event_id = $1 ORDER BY created_at ASC',
    [eventId]
  );

  return result.rows;
};

/**
 * Parameters for updating an existing item.
 */
export interface UpdateItemParams extends ItemSummary {
}

/**
 * Updates an existing item.
 * 
 * @param params - Item update parameters
 * @returns Promise resolving to the updated item record
 * @throws Database error if item doesn't exist
 */
export const updateItem = async (params: UpdateItemParams): Promise<ItemRow> => {
  const result = await query(
    `UPDATE items 
     SET name = $1, producer = $2, year = $3, type = $4
     WHERE id = $5
     RETURNING *`,
    [params.name, params.producer, params.year, params.type, params.id]
  );

  return result.rows[0];
};
