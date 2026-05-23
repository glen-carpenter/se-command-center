import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle: string
  icon: ReactNode
  pageId: string
}

export default function PageShell({ title, subtitle, icon, pageId }: Props) {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <div className="page-subtitle">{subtitle}</div>
      </div>

      <div className="page-body">
        <div className="placeholder-card">
          <div className="placeholder-icon">{icon}</div>
          <div className="placeholder-text">
            <div className="placeholder-title">{title}</div>
            <div className="placeholder-desc">
              Content area for the <span className="mono">{pageId}</span> tab.
              Components for this view will render here.
            </div>
          </div>
          <div className="placeholder-spec">
            <span className="spec-pill">IN PROGRESS</span>
          </div>
        </div>

        <div className="slot-grid">
          <div className="slot" />
          <div className="slot" />
          <div className="slot slot-wide" />
        </div>
      </div>
    </>
  )
}
