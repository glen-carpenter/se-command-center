require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { startPoller } = require('./poller')

const serverRoutes = require('./routes/server')
const playerRoutes = require('./routes/players')
const inventoryRoutes = require('./routes/inventory')
const gridRoutes = require('./routes/grids')
const factionRoutes = require('./routes/factions')
const eventRoutes = require('./routes/events')
const statsRoutes = require('./routes/stats')
const configRoutes = require('./routes/config')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/server', serverRoutes)
app.use('/api/players', playerRoutes)
app.use('/api/inventory', inventoryRoutes)
app.use('/api/grids', gridRoutes)
app.use('/api/factions', factionRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/stats', statsRoutes)
app.use('/api/config', configRoutes)

app.listen(PORT, () => {
  console.log(`SE Command Center server running on port ${PORT}`)
  startPoller()
})
