const router = require('express').Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (faction_id) faction_id, name, member_count, pcu, timestamp
       FROM factions
       ORDER BY faction_id, timestamp DESC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
