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

// Animated background
function AnimatedBackground({ theme, effect }) {
  if (effect === 'none') return null
  
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, background: theme.bg }}>
      {effect === 'gradient' && (
        <>
          <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '10%', left: '10%', width: 600, height: 600, background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`, filter: 'blur(100px)' }}
          />
          <motion.div 
            animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, background: `radial-gradient(circle, ${theme.secondary}12 0%, transparent 70%)`, filter: 'blur(100px)' }}
          />
        </>
      )}
      {effect === 'particles' && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${theme.border}22 1px, transparent 1px), linear-gradient(90deg, ${theme.border}22 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.3 }} />
      )}
      {effect === 'aurora' && (
        <>
          <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '0%', left: '0%', width: '100%', height: '50%', background: `linear-gradient(180deg, ${theme.accent}10, transparent)`, filter: 'blur(60px)', opacity: 0.5 }} />
          <motion.div animate={{ x: [0, -30, 0], y: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }} style={{ position: 'absolute', bottom: '0%', right: '0%', width: '100%', height: '50%', background: `linear-gradient(0deg, ${theme.secondary}10, transparent)`, filter: 'blur(60px)', opacity: 0.5 }} />
        </>
      )}
    </div>
  )
}

// Profile page
export default function ProfilePage({ params }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profiles/${params.username}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Profile not found')
          } else {
            setError('Failed to load profile')
          }
          return
        }
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [params.username])

  const handleLinkClick = async (link) => {
    if (!profile?.id) return
    
    // Track click
    try {
      await fetch('/api/analytics/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: profile.id, linkId: link.id })
      })
    } catch (e) {
      // Ignore tracking errors
    }
  }

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030308' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 40, height: 40, border: '3px solid #1f1f2e', borderTopColor: '#7c3aed', borderRadius: '50%' }} />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#030308', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 64 }}>🔍</div>
        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>{error}</h1>
        <p style={{ color: '#666' }}>This page doesn't exist or has been removed.</p>
      </div>
    )
  }

  const theme = THEMES[profile.theme] || THEMES.midnight
  const appearance = profile.appearance || {}
  const { buttonStyle = 'rounded', buttonAnimation = true, backgroundEffect = 'gradient', showBranding = true } = appearance

  const getButtonStyle = () => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '16px 24px',
      background: theme.card,
      border: `1px solid ${theme.border}`,
      color: theme.text,
      fontSize: 15,
      fontWeight: 600,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }
    
    if (buttonStyle === 'rounded') base.borderRadius = 14
    else if (buttonStyle === 'pill') base.borderRadius = 24
    else base.borderRadius = 4
    
    return base
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative' }}>
      <AnimatedBackground theme={theme} effect={backgroundEffect} />
      
      <div style={{ position: 'relative', zIndex: 1, padding: '100px 20px 60px', maxWidth: 480, margin: '0 auto' }}>
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          {/* Avatar */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            style={{ 
              width: 96, 
              height: 96, 
              margin: '0 auto 20px',
              background: profile.avatar 
                ? `url(${profile.avatar}) center/cover` 
                : `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`,
              borderRadius: '50%',
              border: `3px solid ${theme.border}`,
              boxShadow: `0 8px 32px ${theme.accent}40`
            }}
          >
            {!profile.avatar && (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 700, color: '#fff' }}>
                {(profile.displayName || profile.username || '?').charAt(0).toUpperCase()}
              </div>
            )}
          </motion.div>

          {/* Name & Username */}
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, color: theme.text }}>
            {profile.displayName || profile.username}
          </h1>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 12 }}>@{profile.username}</p>
          
          {/* Bio */}
          {profile.bio && (
            <p style={{ color: '#888', fontSize: 15, maxWidth: 320, margin: '0 auto', lineHeight: 1.6 }}>
              {profile.bio}
            </p>
          )}

          {/* Social Icons */}
          {profile.socials && Object.values(profile.socials).some(v => v) && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20 }}>
              {profile.socials.tiktok && (
                <motion.a whileHover={{ scale: 1.1 }} href={`https://tiktok.com/@${profile.socials.tiktok}`} target="_blank" rel="noopener" style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18 }}>
                  🎵
                </motion.a>
              )}
              {profile.socials.instagram && (
                <motion.a whileHover={{ scale: 1.1 }} href={`https://instagram.com/${profile.socials.instagram}`} target="_blank" rel="noopener" style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18 }}>
                  📷
                </motion.a>
              )}
              {profile.socials.twitter && (
                <motion.a whileHover={{ scale: 1.1 }} href={`https://twitter.com/${profile.socials.twitter}`} target="_blank" rel="noopener" style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18 }}>
                  🐦
                </motion.a>
              )}
              {profile.socials.youtube && (
                <motion.a whileHover={{ scale: 1.1 }} href={profile.socials.youtube} target="_blank" rel="noopener" style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18 }}>
                  ▶️
                </motion.a>
              )}
              {profile.socials.email && (
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleCopy(profile.socials.email, 'email')} style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 18 }}>
                  {copied === 'email' ? '✓' : '📧'}
                </motion.button>
              )}
              {profile.socials.website && (
                <motion.a whileHover={{ scale: 1.1 }} href={profile.socials.website} target="_blank" rel="noopener" style={{ width: 40, height: 40, background: theme.card, border: `1px solid ${theme.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 18 }}>
                  🌐
                </motion.a>
              )}
            </div>
          )}
        </motion.div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 12px' }}>
          <AnimatePresence mode="popLayout">
            {profile.links?.filter(l => l.enabled !== false).map((link, i) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener"
                onClick={() => handleLinkClick(link)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1 }}
                whileHover={buttonAnimation ? { scale: 1.02, boxShadow: `0 4px 20px ${theme.accent}30` } : {}}
                whileTap={buttonAnimation ? { scale: 0.98 } : {}}
                style={getButtonStyle()}
              >
                <span style={{ fontSize: 20 }}>{link.icon || '🔗'}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>{link.title}</span>
                <span style={{ color: '#666', fontSize: 14 }}>↗</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer / Branding */}
        {showBranding !== false && (
          <div style={{ textAlign: 'center', marginTop: 48, paddingTop: 24, borderTop: `1px solid ${theme.border}` }}>
            <a href="/" style={{ color: '#555', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Made with <span style={{ color: theme.accent }}>⚡</span> BioForge
            </a>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}