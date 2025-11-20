/**
 * Data required to add a new beverage item to an event.
 */
export interface AddItemData {
  /** Name/title of the beverage (required) */
  name: string;
  /** Brewery, winery, or distillery name (optional) */
  producer?: string;
  /** Vintage or production year (optional) */
  year?: number;
  /** Style/type like "IPA", "Pinot Noir" (optional) */
  type?: string;
  /** UUID of the user adding this item */
  addedByUserId: string;
  /** Name of the user adding this item */
  addedByName: string;
}

/**
 * Adds a new beverage item to an event.
 * 
 * @param eventId - UUID of the event to add item to
 * @param data - Item data to add
 * @returns Promise resolving to the created item record
 * @throws Error if API request fails
 * 
 * @example
 * ```typescript
 * const item = await addItem('abc-123', {
 *   name: 'Pliny the Elder',
 *   producer: 'Russian River Brewing',
 *   type: 'Double IPA',
 *   year: 2024,
 *   addedBy: 'John'
 * });
 * ```
 */
export const addItem = async (eventId: string, data: AddItemData) => {
  const response = await fetch(`/api/event/${eventId}/add-item`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to add item');
  }

  return response.json();
};

/**
 * Data required to update an existing item.
 */
export interface UpdateItemData {
  /** UUID of the item to update */
  id: string;
  /** UUID of the user making the update */
  userId: string;
  /** Name/title of the beverage */
  name: string;
  /** Brewery, winery, or distillery name (optional) */
  producer?: string;
  /** Vintage or production year (optional) */
  year?: number;
  /** Style/type like "IPA", "Pinot Noir" (optional) */
  type?: string;
}

/**
 * Updates an existing item.
 * 
 * @param eventId - UUID of the event
 * @param data - Item data to update
 * @returns Promise resolving to the updated item record
 * @throws Error if API request fails
 */
export const updateItem = async (eventId: string, data: UpdateItemData) => {
  const response = await fetch(`/api/event/${eventId}/edit-item`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to update item');
  }

  return response.json();
};
