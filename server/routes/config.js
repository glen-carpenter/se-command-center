const router = require('express').Router()
const { getConfig, setConfig } = require('../config')

router.get('/', async (req, res) => {
  try {
    const torchUrl   = await getConfig('torch_api_url', process.env.TORCH_API_URL || '')
    const serverName = await getConfig('server_name', process.env.SERVER_NAME || 'SE Server')
    res.json({ torch_api_url: torchUrl, server_name: serverName })
    // torch_api_key is intentionally never returned
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { torch_api_url, torch_api_key, server_name } = req.body
    if (torch_api_url  !== undefined) await setConfig('torch_api_url', torch_api_url)
    if (torch_api_key  !== undefined && torch_api_key !== '') await setConfig('torch_api_key', torch_api_key)
    if (server_name    !== undefined) await setConfig('server_name', server_name)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
