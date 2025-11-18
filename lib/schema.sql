-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  beverage_type VARCHAR(20) NOT NULL CHECK (beverage_type IN ('beer', 'wine', 'whiskey')),
  tasting_style VARCHAR(20) NOT NULL CHECK (tasting_style IN ('open', 'blind')),
  join_code VARCHAR(6) NOT NULL UNIQUE,
  host_name VARCHAR(255) NOT NULL,
  host_token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Items table
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  added_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users table (participants in events)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(event_id, name)
);

-- Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 10),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(item_id, user_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_join_code ON events(join_code);
CREATE INDEX IF NOT EXISTS idx_items_event_id ON items(event_id);
CREATE INDEX IF NOT EXISTS idx_ratings_event_id ON ratings(event_id);
CREATE INDEX IF NOT EXISTS idx_ratings_item_id ON ratings(item_id);
CREATE INDEX IF NOT EXISTS idx_users_event_id ON users(event_id);
