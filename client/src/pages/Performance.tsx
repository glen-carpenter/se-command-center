import { Activity } from 'lucide-react'
import PageShell from '../components/PageShell'

export default function Performance() {
  return (
    <PageShell
      title="Performance"
      subtitle="Sim speed, frame timing, and load by sector"
      icon={<Activity size={28} />}
      pageId="performance"
    />
  )
}
