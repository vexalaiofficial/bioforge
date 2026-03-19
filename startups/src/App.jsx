import { useState, useEffect } from 'react'
import ChurnGuard from './components/ChurnGuard'
import OutreachIQ from './components/OutreachIQ'
import ContentPulse from './components/ContentPulse'
import PriceSpy from './components/PriceSpy'
import Nav from './components/Nav'

const pages = {
  churnguard: <ChurnGuard />,
  outreachiq: <OutreachIQ />,
  contentpulse: <ContentPulse />,
  pricespy: <PriceSpy />
}

export default function App() {
  const [active, setActive] = useState('churnguard')

  useEffect(() => {
    const hash = window.location.hash.slice(1) || 'churnguard'
    setActive(hash)
    window.addEventListener('hashchange', () => {
      const h = window.location.hash.slice(1) || 'churnguard'
      setActive(h)
    })
  }, [])

  const handleNav = (id) => {
    window.location.hash = id
    setActive(id)
  }

  return (
    <>
      <Nav active={active} onNavigate={handleNav} />
      <main style={{ paddingTop: 60 }}>
        {pages[active]}
      </main>
    </>
  )
}