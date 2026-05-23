const pool = require('./db')

async function getConfig(key, fallback = null) {
  const { rows } = await pool.query('SELECT value FROM config WHERE key = $1', [key])
  return rows.length ? rows[0].value : fallback
}

async function setConfig(key, value) {
  await pool.query(
    `INSERT INTO config (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [key, value]
  )
}

module.exports = { getConfig, setConfig }
