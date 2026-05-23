const router = require('express').Router()
const pool = require('../db')

router.get('/online', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.steam_id, p.name, ps.join_time
       FROM player_sessions ps
       JOIN players p ON p.steam_id = ps.steam_id
       WHERE ps.leave_time IS NULL
       ORDER BY ps.join_time ASC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

router.get('/history', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT steam_id, name, last_seen, total_playtime FROM players ORDER BY last_seen DESC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
