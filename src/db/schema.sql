CREATE TABLE IF NOT EXISTS series (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  genre      VARCHAR(100),
  status     VARCHAR(50) CHECK (status IN ('watching', 'completed', 'dropped', 'planned')),
  rating     NUMERIC(3,1) CHECK (rating >= 0 AND rating <= 10),
  image_url  TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
  id         SERIAL PRIMARY KEY,
  series_id  INT NOT NULL REFERENCES series(id) ON DELETE CASCADE,
  score      INT NOT NULL CHECK (score >= 1 AND score <= 10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
