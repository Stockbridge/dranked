/**
 * Shared type definitions for domain models
 */

/**
 * User participating in an event
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
}

/**
 * Tasting event
 */
export interface Event {
  /** Unique identifier */
  id: string;
  /** Event name */
  name: string;
  /** Type of beverage being tasted */
  beverage_type: string;
  /** Open (show details) or blind (hide details) */
  tasting_style: string;
  /** 6-character code for joining */
  join_code: string;
  /** Name of event host */
  host_name: string;
  /** Secret token for host access */
  host_token: string;
  /** When event was created */
  created_at: string;
  /** Whether event is active */
  is_active: boolean;
}

/**
 * Item being tasted in an event
 */
export interface Item {
  /** Unique identifier */
  id: string;
  /** Event this item belongs to */
  event_id: string;
  /** Item name */
  name: string;
  /** Producer/brewery/winery/distillery */
  producer?: string;
  /** Vintage or production year */
  year?: number;
  /** Style/type (IPA, Pinot Noir, etc) */
  type?: string;
  /** User who added this item */
  added_by_user_id: string;
  /** Name of user who added this item */
  added_by_name: string;
  /** When item was added */
  created_at: string;
}

/**
 * User's rating for an item
 */
export interface Rating {
  /** Unique identifier */
  id: string;
  /** Event this rating belongs to */
  event_id: string;
  /** Item being rated */
  item_id: string;
  /** User who submitted rating */
  user_id: string;
  /** Rating score (1-10) */
  score: number;
  /** When rating was submitted */
  created_at: string;
}

/**
 * Minimal event info for display
 */
export type EventSummary = Pick<Event, 'id' | 'name' | 'beverage_type' | 'host_name' | 'join_code'>;

/**
 * Minimal item info for display and forms
 */
export type ItemSummary = Pick<Item, 'id' | 'name' | 'producer' | 'year' | 'type'>;
