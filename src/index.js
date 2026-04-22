require('dotenv').config();
const app  = require('./app');
const pool = require('./db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await pool.query('SELECT 1'); // verify DB connection before starting
    console.log('✅ Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Swagger UI at  http://localhost:${PORT}/docs`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }
}

start();
