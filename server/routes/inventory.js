const router = require('express').Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (item_name) item_name, item_type, amount, timestamp
       FROM inventory_snapshots
       ORDER BY item_name, timestamp DESC`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
