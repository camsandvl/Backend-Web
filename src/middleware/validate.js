const VALID_STATUSES = ['watching', 'completed', 'dropped', 'planned'];

function validateSeries(req, res, next) {
  const { title, status, rating } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and cannot be empty' });
  }

  if (status && !VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: `status must be one of: ${VALID_STATUSES.join(', ')}`
    });
  }

  if (rating !== undefined && rating !== '') {
    const r = parseFloat(rating);
    if (isNaN(r) || r < 0 || r > 10) {
      return res.status(400).json({ error: 'rating must be a number between 0 and 10' });
    }
  }

  next();
}

module.exports = { validateSeries };
