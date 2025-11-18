/**
 * Data required to add a new beverage item to an event.
 */
export interface AddItemData {
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
  /** Name of the person adding this item */
  addedBy: string;
}

/**
 * Adds a new beverage item to an event.
 * 
 * @param data - Item data to add
 * @param data.eventId - UUID of the event to add item to
 * @param data.name - Name/title of the beverage (required)
 * @param data.producer - Brewery, winery, or distillery name (optional)
 * @param data.year - Vintage or production year (optional)
 * @param data.type - Style/type like "IPA", "Pinot Noir" (optional)
 * @param data.addedBy - Name of the person adding this item
 * @returns Promise resolving to the created item record
 * @throws Error if API request fails
 * 
 * @example
 * ```typescript
 * const item = await addItem({
 *   eventId: 'abc-123',
 *   name: 'Pliny the Elder',
 *   producer: 'Russian River Brewing',
 *   type: 'Double IPA',
 *   year: 2024,
 *   addedBy: 'John'
 * });
 * ```
 */
export const addItem = async (data: AddItemData) => {
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to add item');
  }

  return response.json();
};
