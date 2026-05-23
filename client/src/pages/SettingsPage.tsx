import { useState, useEffect } from 'react'
import { Settings, Save, Check } from 'lucide-react'
import axios from 'axios'

interface ConfigData {
  torch_api_url: string
  server_name: string
}

export default function SettingsPage() {
  const [torchUrl, setTorchUrl]   = useState('')
  const [torchKey, setTorchKey]   = useState('')
  const [serverName, setServerName] = useState('')
  const [saved, setSaved]   = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState('')

  useEffect(() => {
    axios.get<ConfigData>('/api/config').then(({ data }) => {
      setTorchUrl(data.torch_api_url ?? '')
      setServerName(data.server_name ?? '')
    }).catch(() => {})
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSaved(false)
    try {
      const body: Record<string, string> = {
        torch_api_url: torchUrl,
        server_name: serverName,
      }
      if (torchKey !== '') body.torch_api_key = torchKey
      await axios.post('/api/config', body)
      setSaved(true)
      setTorchKey('')
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to save settings. Check that the server is running.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <div className="page-subtitle">Server configuration and connection credentials</div>
      </div>

      <div className="page-body">
        <form onSubmit={handleSave} className="settings-card">
          <div className="settings-section">
            <div className="settings-section-title">
              <Settings size={15} />
              Torch Server Connection
            </div>

            <div className="field">
              <label className="field-label" htmlFor="torch-url">Torch Server URL</label>
              <input
                id="torch-url"
                type="text"
                className="field-input"
                value={torchUrl}
                onChange={e => setTorchUrl(e.target.value)}
                placeholder="http://192.168.x.x:8080"
                spellCheck={false}
              />
              <div className="field-hint">Base URL of your Torch server API (no trailing slash)</div>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="torch-key">Torch API Key</label>
              <input
                id="torch-key"
                type="password"
                className="field-input"
                value={torchKey}
                onChange={e => setTorchKey(e.target.value)}
                placeholder="Leave blank to keep existing key"
                autoComplete="new-password"
              />
              <div className="field-hint">Stored securely in the database — never exposed after saving</div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-title">
              <Settings size={15} />
              Display
            </div>

            <div className="field">
              <label className="field-label" htmlFor="server-name">Server Display Name</label>
              <input
                id="server-name"
                type="text"
                className="field-input"
                value={serverName}
                onChange={e => setServerName(e.target.value)}
                placeholder="My SE Server"
              />
              <div className="field-hint">Shown in the header bar</div>
            </div>
          </div>

          <div className="settings-footer">
            {error && <span className="settings-error">{error}</span>}
            <button type="submit" className="save-btn" disabled={saving}>
              {saved
                ? <><Check size={15} /> Saved</>
                : <><Save size={15} /> {saving ? 'Saving…' : 'Save Settings'}</>
              }
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
