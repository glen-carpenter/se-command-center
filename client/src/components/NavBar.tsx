import { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Bell, RefreshCw } from 'lucide-react'
import axios from 'axios'

interface ServerStatus {
  name: string
  online: boolean
  playerCount: number
  maxPlayers: number
  simSpeed: number
  stale?: boolean
}

async function fetchStatus(): Promise<ServerStatus> {
  const { data } = await axios.get('/api/server/status')
  return data
}

function formatTime(d: Date) {
  const h = d.getHours()
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = ((h + 11) % 12) + 1
  return `Today, ${h12}:${m} ${ampm}`
}

export default function NavBar() {
  const { data, refetch } = useQuery({
    queryKey: ['server-status'],
    queryFn: fetchStatus,
  })

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(t)
  }, [])
  const lastUpdated = useMemo(() => formatTime(now), [now])

  const online = data?.online ?? false
  const simSpeed = data?.simSpeed?.toFixed(2) ?? '—'
  const playerCount = data?.playerCount ?? '—'
  const maxPlayers = data?.maxPlayers ?? '—'
  const serverName = data?.name ?? 'SE Server'

  return (
    <header className="header-bar">
      {/* Left — server name */}
      <div className="header-left">
        <div className="server-name">{serverName}</div>
        <div className="server-tag mono">DEDICATED</div>
      </div>

      {/* Center — live stats */}
      <div className="header-center">
        <div className="hstat">
          <span className={`status-dot ${online ? '' : 'offline'}`} />
          <span className={online ? 'status-online' : 'status-offline'}>
            {online ? 'Online' : 'Offline'}
          </span>
        </div>

        <div className="hstat-divider" />

        <div className="hstat">
          <span className="hstat-label">Players</span>
          <span className="hstat-value">
            {playerCount}<span className="hstat-cap">/{maxPlayers}</span>
          </span>
        </div>

        <div className="hstat-divider" />

        <div className="hstat">
          <span className="hstat-label">Sim Speed</span>
          <span className="hstat-value">{simSpeed}</span>
        </div>

        {data?.stale && <span className="stale-badge">Stale</span>}
      </div>

      {/* Right — actions + timestamp */}
      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <button
          className="icon-btn"
          aria-label="Refresh"
          onClick={() => { refetch(); setNow(new Date()) }}
        >
          <RefreshCw size={16} />
        </button>
        <div className="last-updated">
          <span className="last-updated-label">Last updated</span>
          <span className="last-updated-time mono">{lastUpdated}</span>
        </div>
      </div>
    </header>
  )
}
