const pages = [
  { id: 'churnguard', label: 'ChurnGuard' },
  { id: 'outreachiq', label: 'OutreachIQ' },
  { id: 'contentpulse', label: 'ContentPulse' },
  { id: 'pricespy', label: 'PriceSpy' },
]

export default function Nav({ active, onNavigate }) {
  return (
    <nav style={{
      background: '#141414',
      borderBottom: '1px solid #2a2a2a',
      padding: '16px 24px',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100
    }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginRight: 'auto' }}>⚡ Vexal</div>
      {pages.map(page => (
        <a
          key={page.id}
          href={`#${page.id}`}
          onClick={(e) => { e.preventDefault(); onNavigate(page.id); }}
          style={{
            color: active === page.id ? '#fff' : '#888',
            textDecoration: 'none',
            fontSize: 14,
            padding: '8px 16px',
            borderRadius: 6,
            background: active === page.id ? '#2a2a2a' : 'transparent',
            transition: 'all 0.2s'
          }}
        >
          {page.label}
        </a>
      ))}
    </nav>
  )
}