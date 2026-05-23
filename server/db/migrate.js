require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')

  console.log('Applying schema to', process.env.DATABASE_URL.replace(/:.*@/, ':***@'))
  try {
    await pool.query(sql)
    console.log('✓ Schema applied successfully')

    const { rows } = await pool.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    console.log('Tables present:', rows.map(r => r.table_name).join(', '))
  } finally {
    await pool.end()
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
