const router = require('express').Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (grid_id) grid_id, name, owner, block_count, pcu, status, timestamp
       FROM grids
       ORDER BY grid_id, timestamp DESC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
