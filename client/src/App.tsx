import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  LayoutDashboard, Users, Package, Grid2x2, Shield,
  Activity, Settings, ChevronLeft, ChevronRight,
} from 'lucide-react'
import NavBar from './components/NavBar'
import Overview from './pages/Overview'
import Players from './pages/Players'
import Inventory from './pages/Inventory'
import Grids from './pages/Grids'
import Factions from './pages/Factions'
import Performance from './pages/Performance'
import SettingsPage from './pages/SettingsPage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchInterval: 30_000, staleTime: 25_000 },
  },
})

const NAV_ITEMS = [
  { path: '/', label: 'Overview',               icon: LayoutDashboard, end: true },
  { path: '/players',     label: 'Players',              icon: Users },
  { path: '/inventory',   label: 'Inventory & Production', icon: Package },
  { path: '/grids',       label: 'Grids',                icon: Grid2x2 },
  { path: '/factions',    label: 'Factions',             icon: Shield },
  { path: '/performance', label: 'Performance',          icon: Activity },
]

export default function App() {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('se_collapsed') === '1' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem('se_collapsed', collapsed ? '1' : '0') } catch {}
  }, [collapsed])

  const sidebarWidth = collapsed ? 64 : 240

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="shell">
          <NavBar />

          <div className="shell-body">
            {/* Sidebar */}
            <aside className="sidebar" style={{ width: sidebarWidth }}>
              {/* Brand + collapse toggle */}
              <div className={`sidebar-header ${collapsed ? 'is-collapsed' : ''}`}>
                {!collapsed ? (
                  <div className="brand">
                    <div className="brand-mark">
                      <span className="brand-mark-inner" />
                    </div>
                    <div className="brand-text">
                      <div className="brand-title">SE</div>
                      <div className="brand-sub">Command Center</div>
                    </div>
                  </div>
                ) : (
                  <div className="brand-mark brand-mark-center">
                    <span className="brand-mark-inner" />
                  </div>
                )}
                <button
                  className="collapse-btn"
                  onClick={() => setCollapsed(c => !c)}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {collapsed
                    ? <ChevronRight size={16} />
                    : <ChevronLeft size={16} />}
                </button>
              </div>

              {/* Main nav */}
              <nav className="sidebar-nav">
                {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? 'is-active' : ''} ${collapsed ? 'is-collapsed' : ''}`
                    }
                  >
                    <span className="nav-item-bar" aria-hidden="true" />
                    <span className="nav-item-icon"><Icon size={18} /></span>
                    {!collapsed && <span className="nav-item-label">{label}</span>}
                    {collapsed && <span className="nav-tooltip">{label}</span>}
                  </NavLink>
                ))}
              </nav>

              {/* Settings pinned to bottom */}
              <div className="sidebar-footer">
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'is-active' : ''} ${collapsed ? 'is-collapsed' : ''}`
                  }
                >
                  <span className="nav-item-bar" aria-hidden="true" />
                  <span className="nav-item-icon"><Settings size={18} /></span>
                  {!collapsed && <span className="nav-item-label">Settings</span>}
                  {collapsed && <span className="nav-tooltip">Settings</span>}
                </NavLink>
              </div>
            </aside>

            {/* Main content */}
            <main className="page">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/players" element={<Players />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/grids" element={<Grids />} />
                <Route path="/factions" element={<Factions />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
