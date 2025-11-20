/**
 * Database row types - match PostgreSQL column names (snake_case)
 */

/**
 * User row from database
 */
export interface UserRow {
  /** Unique identifier */
  id: string;
  /** Event this user belongs to */
  event_id: string;
  /** Display name */
  name: string;
  /** When user joined the event */
  joined_at: string;
}

/**
 * Event row from database
 */
export interface EventRow {
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
 * Item row from database
 */
export interface ItemRow {
  /** Unique identifier */
  id: string;
  /** Event this item belongs to */
  event_id: string;
  /** Item name */
  name: string;
  /** Producer/brewery/winery/distillery */
  producer: string | null;
  /** Vintage or production year */
  year: number | null;
  /** Style/type (IPA, Pinot Noir, etc) */
  type: string | null;
  /** User who added this item */
  added_by_user_id: string;
  /** Name of user who added this item */
  added_by_name: string;
  /** When item was added */
  created_at: string;
}

/**
 * Rating row from database
 */
export interface RatingRow {
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
