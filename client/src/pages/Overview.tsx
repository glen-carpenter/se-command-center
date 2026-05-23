import { LayoutDashboard } from 'lucide-react'
import PageShell from '../components/PageShell'

export default function Overview() {
  return (
    <PageShell
      title="Overview"
      subtitle="At-a-glance server health and activity"
      icon={<LayoutDashboard size={28} />}
      pageId="overview"
    />
  )
}
