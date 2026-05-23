const router = require('express').Router()
const pool = require('../db')

router.get('/performance', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT timestamp, sim_speed, entity_count, player_count
       FROM server_stats
       WHERE timestamp > NOW() - INTERVAL '24 hours'
       ORDER BY timestamp ASC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
