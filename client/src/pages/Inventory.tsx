import { Package } from 'lucide-react'
import PageShell from '../components/PageShell'

export default function Inventory() {
  return (
    <PageShell
      title="Inventory & Production"
      subtitle="Stockpile, refineries, assemblers, and queues"
      icon={<Package size={28} />}
      pageId="inventory"
    />
  )
}
