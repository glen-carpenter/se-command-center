-- SE Command Center — PostgreSQL schema
-- All timestamps stored in UTC (TIMESTAMPTZ)

CREATE TABLE IF NOT EXISTS players (
  steam_id      TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  last_seen     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_playtime INTERVAL NOT NULL DEFAULT '0'
);

CREATE TABLE IF NOT EXISTS player_sessions (
  id        SERIAL PRIMARY KEY,
  steam_id  TEXT NOT NULL REFERENCES players(steam_id),
  join_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  leave_time TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS inventory_snapshots (
  id        SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL,
  amount    NUMERIC NOT NULL
);

CREATE TABLE IF NOT EXISTS server_stats (
  id           SERIAL PRIMARY KEY,
  timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sim_speed    NUMERIC NOT NULL,
  entity_count INTEGER NOT NULL,
  player_count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS grids (
  id          SERIAL PRIMARY KEY,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  grid_id     TEXT NOT NULL,
  name        TEXT NOT NULL,
  owner       TEXT,
  block_count INTEGER NOT NULL DEFAULT 0,
  pcu         INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  timestamp   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  event_type  TEXT NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS factions (
  id           SERIAL PRIMARY KEY,
  timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  faction_id   TEXT NOT NULL,
  name         TEXT NOT NULL,
  member_count INTEGER NOT NULL DEFAULT 0,
  pcu          INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS config (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_server_stats_timestamp ON server_stats(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_snapshots_item ON inventory_snapshots(item_name, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_grids_grid_id ON grids(grid_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_factions_faction_id ON factions(faction_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_player_sessions_steam_id ON player_sessions(steam_id);
