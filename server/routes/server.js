const router = require('express').Router()
const pool = require('../db')

router.get('/status', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM server_stats ORDER BY timestamp DESC LIMIT 1`
    )
    if (rows.length === 0) throw new Error('no data')
    const row = rows[0]
    const ageMs = Date.now() - new Date(row.timestamp).getTime()
    res.json({
      name: process.env.SERVER_NAME || 'SE Server',
      online: ageMs < 120_000,
      simSpeed: row.sim_speed,
      entityCount: row.entity_count,
      playerCount: row.player_count,
      maxPlayers: 16,
      stale: ageMs > 120_000,
    })
  } catch {
    // Mock fallback
    res.json({
      name: process.env.SERVER_NAME || 'SE Server',
      online: false,
      simSpeed: 0,
      entityCount: 0,
      playerCount: 0,
      maxPlayers: 16,
      stale: true,
    })
  }
})

module.exports = router
