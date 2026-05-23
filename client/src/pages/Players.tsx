import { Users } from 'lucide-react'
import PageShell from '../components/PageShell'

export default function Players() {
  return (
    <PageShell
      title="Players"
      subtitle="Connected pilots, sessions, and history"
      icon={<Users size={28} />}
      pageId="players"
    />
  )
}
