import { Shield } from 'lucide-react'
import PageShell from '../components/PageShell'

export default function Factions() {
  return (
    <PageShell
      title="Factions"
      subtitle="Diplomacy, membership, and reputation"
      icon={<Shield size={28} />}
      pageId="factions"
    />
  )
}
