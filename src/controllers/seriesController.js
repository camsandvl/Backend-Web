const pool = require('../db');

const SORTABLE_FIELDS = ['title', 'genre', 'status', 'rating', 'created_at'];
const BASE_URL = (process.env.BASE_URL || '').replace(/\/$/, '');

function buildImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;

  const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return BASE_URL ? `${BASE_URL}${path}` : path;
}

function formatSeries(series) {
  return {
    ...series,
    image_url: buildImageUrl(series.image_url)
  };
}

// GET /series?page=1&limit=10&q=breaking&sort=title&order=asc
exports.getAll = async (req, res) => {
  try {
    const page   = Math.max(parseInt(req.query.page)  || 1, 1);
    const limit  = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const q      = req.query.q || '';
    const sort   = SORTABLE_FIELDS.includes(req.query.sort) ? req.query.sort : 'created_at';
    const order  = req.query.order === 'asc' ? 'ASC' : 'DESC';

    const countRes = await pool.query(
      'SELECT COUNT(*) FROM series WHERE title ILIKE $1',
      [`%${q}%`]
    );
    const total = parseInt(countRes.rows[0].count);

    const dataRes = await pool.query(
      `SELECT * FROM series WHERE title ILIKE $1 ORDER BY ${sort} ${order} LIMIT $2 OFFSET $3`,
      [`%${q}%`, limit, offset]
    );

    res.json({
      data: dataRes.rows.map(formatSeries),
      meta: { total, page, limit, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /series/:id
exports.getById = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM series WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Series not found' });
    res.json(formatSeries(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /series
exports.create = async (req, res) => {
  try {
    const { title, genre, status, rating } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const { rows } = await pool.query(
      `INSERT INTO series (title, genre, status, rating, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title.trim(), genre || null, status || null, rating || null, image_url]
    );
    res.status(201).json(formatSeries(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /series/:id
exports.update = async (req, res) => {
  try {
    const { rows: existing } = await pool.query(
      'SELECT * FROM series WHERE id = $1', [req.params.id]
    );
    if (!existing.length) return res.status(404).json({ error: 'Series not found' });

    const { title, genre, status, rating } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : existing[0].image_url;

    const { rows } = await pool.query(
      `UPDATE series
         SET title=$1, genre=$2, status=$3, rating=$4, image_url=$5, updated_at=NOW()
       WHERE id=$6
       RETURNING *`,
      [title.trim(), genre || null, status || null, rating || null, image_url, req.params.id]
    );
    res.json(formatSeries(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /series/:id
exports.remove = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id FROM series WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Series not found' });

    await pool.query('DELETE FROM series WHERE id = $1', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /series/:id/rating
exports.getRating = async (req, res) => {
  try {
    const { rows: series } = await pool.query('SELECT id FROM series WHERE id = $1', [req.params.id]);
    if (!series.length) return res.status(404).json({ error: 'Series not found' });

    const { rows } = await pool.query(
      'SELECT COUNT(*) AS count, AVG(score) AS average FROM ratings WHERE series_id = $1',
      [req.params.id]
    );
    res.json({
      series_id: parseInt(req.params.id),
      count:     parseInt(rows[0].count),
      average:   parseFloat(rows[0].average) || 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /series/:id/rating
exports.addRating = async (req, res) => {
  try {
    const { rows: series } = await pool.query('SELECT id FROM series WHERE id = $1', [req.params.id]);
    if (!series.length) return res.status(404).json({ error: 'Series not found' });

    const score = parseInt(req.body.score);
    if (!score || score < 1 || score > 10) {
      return res.status(400).json({ error: 'score must be an integer between 1 and 10' });
    }

    const { rows } = await pool.query(
      'INSERT INTO ratings (series_id, score) VALUES ($1, $2) RETURNING *',
      [req.params.id, score]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
