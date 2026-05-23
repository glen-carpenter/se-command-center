const router = require('express').Router()
const pool = require('../db')

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM events ORDER BY timestamp DESC LIMIT 50`
    )
    res.json(rows)
  } catch {
    res.json([])
  }
})

module.exports = router
