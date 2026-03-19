'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Theme definitions
const THEMES = {
  midnight: { name: 'Midnight', bg: '#030308', card: '#0f0f18', text: '#fff', accent: '#7c3aed', secondary: '#a855f7', border: '#1f1f2e' },
  aurora: { name: 'Aurora', bg: '#0a0f1a', card: '#0f1923', text: '#e0f2fe', accent: '#06b6d4', secondary: '#22d3ee', border: '#1e3a5f' },
  ember: { name: 'Ember', bg: '#0f0505', card: '#1a0a0a', text: '#fef2f2', accent: '#ef4444', secondary: '#f97316', border: '#2a1010' },
  forest: { name: 'Forest', bg: '#050f0a', card: '#0a150f', text: '#ecfdf5', accent: '#10b981', secondary: '#34d399', border: '#10271a' },
  royalty: { name: 'Royalty', bg: '#0f0a1a', card: '#150f20', text: '#f5f3ff', accent: '#8b5cf6', secondary: '#c084fc', border: '#1f1528' },
  monochrome: { name: 'Monochrome', bg: '#0a0a0a', card: '#141414', text: '#fafafa', accent: '#525252', secondary: '#a3a3a3', border: '#262626' },
}

// Default profile structure
const DEFAULT_PROFILE = {
  username: '',
  email: '',
  displayName: '',
  bio: '',
  theme: 'midnight',
  avatar: null,
  socials: { tiktok: '', instagram: '', twitter: '', youtube: '', email: '', website: '' },
  links: [
    { id: '1', title: 'My Website', url: 'https://example.com', icon: '🌐', enabled: true },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/', icon: '📷', enabled: true },
    { id: '3', title: 'YouTube', url: 'https://youtube.com', icon: '▶️', enabled: true },
    { id: '4', title: 'Twitter', url: 'https://twitter.com', icon: '🐦', enabled: true },
  ],
  appearance: {
    buttonStyle: 'rounded',
    buttonAnimation: true,
    backgroundEffect: 'gradient',
    showBranding: true
  }
}

// Demo analytics
const DEMO_ANALYTICS = {
  totalViews: 2847,
  totalClicks: 1923,
  clickRate: 68,
  topLinks: [
    { title: 'My Website', clicks: 523 },
    { title: 'YouTube', clicks: 412 },
    { title: 'Instagram', clicks: 287 },
    { title: 'Twitter', clicks: 198 },
  ]
}

export default function Dashboard() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [activeTab, setActiveTab] = useState('links')
  const [editingLink, setEditingLink] = useState(null)
  const [analytics, setAnalytics] = useState(DEMO_ANALYTICS)
  const [saved, setSaved] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('bioforge_profile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  // Save to localStorage when profile changes
  useEffect(() => {
    localStorage.setItem('bioforge_profile', JSON.stringify(profile))
  }, [profile])

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const updateSocial = (key, value) => {
    setProfile(prev => ({ ...prev, socials: { ...prev.socials, [key]: value } }))
  }

  const updateAppearance = (key, value) => {
    setProfile(prev => ({ ...prev, appearance: { ...prev.appearance, [key]: value } }))
  }

  const addLink = () => {
    const newLink = { 
      id: Date.now().toString(), 
      title: '', 
      url: '', 
      icon: '🔗', 
      enabled: true 
    }
    setProfile(prev => ({ ...prev, links: [...prev.links, newLink] }))
    setEditingLink(newLink)
  }

  const updateLink = (id, updates) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, ...updates } : l)
    }))
    setEditingLink(null)
  }

  const deleteLink = (id) => {
    setProfile(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }))
  }

  const toggleLink = (id) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(l => l.id === id ? { ...l, enabled: !l.enabled } : l)
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const checkUsername = async (username) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null)
      return
    }
    // In production, call API
    // Mock check
    setUsernameAvailable(username.length >= 3)
  }

  const theme = THEMES[profile.theme]

  const tabs = [
    { id: 'links', label: 'Links', icon: '🔗' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]

  return (
    <div style={{ background: '#030308', minHeight: '100vh', color: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      
      {/* Header */}
      <header style={{ background: 'rgba(3, 3, 8, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚡</div>
            <span style={{ fontSize: 20, fontWeight: 800 }}>Bio<span style={{ color: '#a855f7' }}>Forge</span></span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {profile.username && (
              <a 
                href={`/${profile.username}`} 
                target="_blank" 
                rel="noopener"
                style={{ color: '#888', fontSize: 13, textDecoration: 'none' }}
              >
                bioforge.app/{profile.username} ↗
              </a>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              style={{ background: saved ? '#10b981' : 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}
            >
              {saved ? '✓ Saved!' : 'Save Changes'}
            </motion.button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, padding: 24 }}>
        
        {/* Sidebar */}
        <nav style={{ background: '#0f0f18', borderRadius: 16, padding: 16, height: 'fit-content', position: 'sticky', top: 80 }}>
          {tabs.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12, 
                padding: '14px 16px', 
                background: activeTab === item.id ? 'rgba(124, 58, 237, 0.15)' : 'transparent', 
                border: 'none', 
                borderRadius: 12, 
                color: activeTab === item.id ? '#a855f7' : '#888', 
                fontSize: 14, 
                fontWeight: 500, 
                cursor: 'pointer', 
                textAlign: 'left',
                marginBottom: 4
              }}
            >
              <span>{item.icon}</span> {item.label}
            </motion.button>
          ))}
          
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Quick Stats</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: '#1a1a28', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#a855f7' }}>{analytics.totalViews}</div>
                <div style={{ fontSize: 10, color: '#666' }}>Views</div>
              </div>
              <div style={{ background: '#1a1a28', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#10b981' }}>{analytics.totalClicks}</div>
                <div style={{ fontSize: 10, color: '#666' }}>Clicks</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ background: '#0f0f18', borderRadius: 16, padding: 32 }}>

          {/* LINKS TAB */}
          {activeTab === 'links' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700 }}>Links</h2>
                <motion.button whileHover={{ scale: 1.05 }} onClick={addLink} style={{ background: '#7c3aed', color: '#fff', padding: '10px 20px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer' }}>+ Add Link</motion.button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {profile.links.map((link, index) => (
                  <motion.div 
                    key={link.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: '#1a1a28', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 16, opacity: link.enabled ? 1 : 0.5 }}
                  >
                    <span style={{ fontSize: 20, width: 40, textAlign: 'center' }}>{link.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{link.title || 'Untitled Link'}</div>
                      <div style={{ fontSize: 13, color: '#666' }}>{link.url || 'No URL'}</div>
                    </div>
                    <button onClick={() => toggleLink(link.id)} style={{ background: link.enabled ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', color: link.enabled ? '#10b981' : '#666', padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
                      {link.enabled ? 'ON' : 'OFF'}
                    </button>
                    <button onClick={() => setEditingLink(link)} style={{ background: 'transparent', color: '#888', padding: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>✏️</button>
                    <button onClick={() => deleteLink(link.id)} style={{ background: 'transparent', color: '#ef4444', padding: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>🗑️</button>
                  </motion.div>
                ))}
                {profile.links.length === 0 && (
                  <div style={{ textAlign: 'center', padding: 48, color: '#555' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔗</div>
                    <p>No links yet. Add your first link!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Profile</h2>
              
              <div style={{ display: 'grid', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Username</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#555', fontSize: 15 }}>bioforge.app/</span>
                    <input 
                      value={profile.username} 
                      onChange={(e) => { updateProfile('username', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')); checkUsername(e.target.value) }}
                      onBlur={(e) => checkUsername(e.target.value)}
                      placeholder="yourname"
                      style={{ flex: 1, padding: 14, background: '#1a1a28', border: usernameAvailable === false ? '1px solid #ef4444' : '1px solid #2a2a3a', borderRadius: 10, color: '#fff', fontSize: 15 }}
                    />
                  </div>
                  {usernameAvailable === true && <span style={{ color: '#10b981', fontSize: 12, marginTop: 4, display: 'block' }}>✓ Username available</span>}
                  {usernameAvailable === false && <span style={{ color: '#ef4444', fontSize: 12, marginTop: 4, display: 'block' }}>✗ Username taken</span>}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Display Name</label>
                    <input value={profile.displayName} onChange={(e) => updateProfile('displayName', e.target.value)} placeholder="Your Name" style={{ width: '100%', padding: 14, background: '#1a1a28', border: '1px solid #2a2a3a', borderRadius: 10, color: '#fff', fontSize: 15 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Email</label>
                    <input value={profile.email} onChange={(e) => updateProfile('email', e.target.value)} placeholder="you@example.com" style={{ width: '100%', padding: 14, background: '#1a1a28', border: '1px solid #2a2a3a', borderRadius: 10, color: '#fff', fontSize: 15 }} />
                  </div>
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Bio</label>
                  <textarea value={profile.bio} onChange={(e) => updateProfile('bio', e.target.value)} rows={3} placeholder="Tell the world about yourself..." style={{ width: '100%', padding: 14, background: '#1a1a28', border: '1px solid #2a2a3a', borderRadius: 10, color: '#fff', fontSize: 15, resize: 'vertical' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 12, textTransform: 'uppercase' }}>Social Links</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { key: 'tiktok', label: 'TikTok', placeholder: 'username' },
                      { key: 'instagram', label: 'Instagram', placeholder: 'username' },
                      { key: 'twitter', label: 'Twitter', placeholder: 'username' },
                      { key: 'youtube', label: 'YouTube', placeholder: 'channel URL' },
                      { key: 'email', label: 'Email', placeholder: 'you@example.com' },
                      { key: 'website', label: 'Website', placeholder: 'https://...' },
                    ].map(social => (
                      <div key={social.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 80, fontSize: 13, color: '#666' }}>{social.label}</span>
                        <input value={profile.socials[social.key]} onChange={(e) => updateSocial(social.key, e.target.value)} placeholder={social.placeholder} style={{ flex: 1, padding: 10, background: '#1a1a28', border: '1px solid #2a2a3a', borderRadius: 8, color: '#fff', fontSize: 13 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Appearance</h2>
              
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 16, textTransform: 'uppercase' }}>Theme</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {Object.entries(THEMES).map(([key, t]) => (
                    <motion.button
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => updateProfile('theme', key)}
                      style={{ padding: 16, background: t.bg, border: profile.theme === key ? `2px solid ${t.accent}` : `1px solid ${t.border}`, borderRadius: 14, cursor: 'pointer', textAlign: 'left' }}
                    >
                      <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.accent }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.secondary }} />
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.border }} />
                      </div>
                      <div style={{ color: t.text, fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 16, textTransform: 'uppercase' }}>Button Style</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['rounded', 'square', 'pill'].map(style => (
                    <button onClick={() => updateAppearance('buttonStyle', style)} style={{ padding: '14px 28px', background: profile.appearance.buttonStyle === style ? '#7c3aed' : '#1a1a28', border: 'none', borderRadius: style === 'pill' ? 24 : style === 'rounded' ? 12 : 4, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 16, textTransform: 'uppercase' }}>Background Effect</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['gradient', 'particles', 'aurora', 'none'].map(effect => (
                    <button onClick={() => updateAppearance('backgroundEffect', effect)} style={{ padding: '14px 28px', background: profile.appearance.backgroundEffect === effect ? '#7c3aed' : '#1a1a28', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                      {effect}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 16, textTransform: 'uppercase' }}>Options</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={profile.appearance.buttonAnimation} onChange={(e) => updateAppearance('buttonAnimation', e.target.checked)} style={{ width: 20, height: 20, accentColor: '#7c3aed' }} />
                    <span>Button hover animation</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                    <input type="checkbox" checked={profile.appearance.showBranding} onChange={(e) => updateAppearance('showBranding', e.target.checked)} style={{ width: 20, height: 20, accentColor: '#7c3aed' }} />
                    <span>Show "Made with BioForge" branding</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Analytics</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                <div style={{ background: '#1a1a28', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#a855f7' }}>{analytics.totalViews.toLocaleString()}</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Total Views</div>
                </div>
                <div style={{ background: '#1a1a28', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#10b981' }}>{analytics.totalClicks.toLocaleString()}</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Total Clicks</div>
                </div>
                <div style={{ background: '#1a1a28', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#06b6d4' }}>{analytics.clickRate}%</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>Click Rate</div>
                </div>
              </div>

              <div style={{ background: '#1a1a28', borderRadius: 14, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Top Performing Links</h3>
                {analytics.topLinks.map((link, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ width: 24, height: 24, background: '#7c3aed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
                    <span style={{ flex: 1, fontSize: 14 }}>{link.title}</span>
                    <span style={{ color: '#10b981', fontWeight: 600 }}>{link.clicks} clicks</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Link Editor Modal */}
      <AnimatePresence>
        {editingLink && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
            onClick={() => setEditingLink(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 20, padding: 32, width: '90%', maxWidth: 480 }}
            >
              <h3 style={{ marginBottom: 24, fontSize: 20, fontWeight: 700 }}>{editingLink.id ? 'Edit Link' : 'Add New Link'}</h3>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Title</label>
                <input 
                  type="text" 
                  value={editingLink.title || ''} 
                  onChange={(e) => setEditingLink({ ...editingLink, title: e.target.value })}
                  placeholder="e.g., My Website"
                  style={{ width: '100%', padding: 14, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15 }}
                />
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>URL</label>
                <input 
                  type="url" 
                  value={editingLink.url || ''} 
                  onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                  placeholder="https://..."
                  style={{ width: '100%', padding: 14, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15 }}
                />
              </div>
              
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 8, textTransform: 'uppercase' }}>Icon (emoji)</label>
                <input 
                  type="text" 
                  value={editingLink.icon || ''} 
                  onChange={(e) => setEditingLink({ ...editingLink, icon: e.target.value })}
                  placeholder="🔗"
                  style={{ width: '100%', padding: 14, background: theme.bg, border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setEditingLink(null)} style={{ flex: 1, padding: 14, background: 'transparent', border: `1px solid ${theme.border}`, borderRadius: 12, color: theme.text, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button 
                  onClick={() => editingLink.id ? updateLink(editingLink.id, editingLink) : addLink()} 
                  style={{ flex: 1, padding: 14, background: '#7c3aed', border: 'none', borderRadius: 12, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
                >
                  Save Link
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, button { font-family: inherit; }
      `}</style>
    </div>
  )
}