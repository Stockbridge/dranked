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
  /** Name of the person adding this item */
  addedBy: string;
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
