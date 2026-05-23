const cron = require('node-cron')
const axios = require('axios')
const pool = require('./db')
const { getConfig } = require('./config')

async function torchGet(path, torchUrl, torchKey) {
  const res = await axios.get(`${torchUrl}${path}`, {
    headers: torchKey ? { Authorization: `Bearer ${torchKey}` } : {},
    timeout: 10_000,
  })
  return res.data
}

async function poll() {
  const torchUrl = await getConfig('torch_api_url', process.env.TORCH_API_URL)
  const torchKey = await getConfig('torch_api_key', process.env.TORCH_API_KEY)

  if (!torchUrl) {
    console.warn('[poller] torch_api_url not configured — skipping poll')
    return
  }

  console.log('[poller] polling Torch API...')

  try {
    const status = await torchGet('/api/status', torchUrl, torchKey)
    await pool.query(
      `INSERT INTO server_stats (sim_speed, entity_count, player_count)
       VALUES ($1, $2, $3)`,
      [status.simSpeed ?? 0, status.entityCount ?? 0, status.playerCount ?? 0]
    )
  } catch (err) {
    console.warn('[poller] Torch API unreachable — skipping poll:', err.message)
  }
}

function startPoller() {
  // Always start — credentials come from DB config, not env vars
  poll()
  cron.schedule('*/30 * * * * *', poll)
  console.log('[poller] started (30s interval)')
}

module.exports = { startPoller }
