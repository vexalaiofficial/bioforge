'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Premium themes
const THEMES = {
  midnight: { name: 'Midnight', bg: '#030308', card: '#0f0f18', text: '#fff', accent: '#7c3aed', secondary: '#a855f7', border: '#1f1f2e' },
  aurora: { name: 'Aurora', bg: '#0a0f1a', card: '#0f1923', text: '#e0f2fe', accent: '#06b6d4', secondary: '#22d3ee', border: '#1e3a5f' },
  ember: { name: 'Ember', bg: '#0f0505', card: '#1a0a0a', text: '#fef2f2', accent: '#ef4444', secondary: '#f97316', border: '#2a1010' },
  forest: { name: 'Forest', bg: '#050f0a', card: '#0a150f', text: '#ecfdf5', accent: '#10b981', secondary: '#34d399', border: '#10271a' },
  royalty: { name: 'Royalty', bg: '#0f0a1a', card: '#150f20', text: '#f5f3ff', accent: '#8b5cf6', secondary: '#c084fc', border: '#1f1528' },
  monochrome: { name: 'Monochrome', bg: '#0a0a0a', card: '#141414', text: '#fafafa', accent: '#525252', secondary: '#a3a3a3', border: '#262626' },
}

// Animated background component
function AnimatedBackground({ theme }) {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, background: theme.bg }}>
      {/* Gradient orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 60, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${theme.secondary}12 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 0], 
          y: [0, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${theme.accent}08 0%, transparent 60%)`,
          filter: 'blur(120px)',
        }}
      />
      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${theme.border}22 1px, transparent 1px), linear-gradient(90deg, ${theme.border}22 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: 0.3,
      }} />
    </div>
  )
}

// Navigation
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(3, 3, 8, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{ 
            width: 42, 
            height: 42, 
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)', 
            borderRadius: 14, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: 22,
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.4)'
          }}>
            ⚡
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-1px', color: '#fff' }}>
            Bio<span style={{ color: '#a855f7' }}>Forge</span>
          </span>
        </motion.div>
        <nav style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.03)', padding: 6, borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)' }}>
          {['Features', 'Themes', 'Pricing', 'Dashboard'].map((item, i) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: i === 0 ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                color: i === 0 ? '#fff' : '#888',
                border: 'none',
                padding: '10px 18px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {item}
            </motion.button>
          ))}
        </nav>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
          }}
        >
          Get Started
        </motion.button>
      </div>
    </motion.header>
  )
}

// Hero section
function Hero({ theme }) {
  return (
    <section style={{ padding: '160px 24px 100px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 10, 
            background: 'rgba(124, 58, 237, 0.1)', 
            border: '1px solid rgba(124, 58, 237, 0.3)', 
            padding: '10px 20px', 
            borderRadius: 100, 
            fontSize: 14, 
            marginBottom: 32 
          }}
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 8, height: 8, background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }}
          />
          <span style={{ color: '#a0a0b0' }}>✨ Now with 50+ themes & custom domains</span>
        </motion.div>

        <h1 style={{ 
          fontSize: 'clamp(42px, 8vw, 80px)', 
          fontWeight: 800, 
          lineHeight: 1.05, 
          marginBottom: 24, 
          letterSpacing: '-3px',
          color: '#fff'
        }}>
          Your link in bio,<br />
          <span style={{ 
            background: 'linear-gradient(135deg, #7c3aed, #a855f7, #ec4899)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            forged in fire.
          </span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            color: '#888', 
            maxWidth: 600, 
            margin: '0 auto 48px', 
            lineHeight: 1.7 
          }}
        >
          The most customizable link page platform. Themes, analytics, custom domains — 
          everything you need to own your digital identity.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 80 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 40px rgba(124, 58, 237, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)', 
              color: '#fff', 
              padding: '18px 40px', 
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 700, 
              border: 'none', 
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            Create Your Page
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              color: '#fff', 
              padding: '18px 40px', 
              borderRadius: 16, 
              fontSize: 16, 
              fontWeight: 600, 
              border: '1px solid rgba(255,255,255,0.1)', 
              cursor: 'pointer' 
            }}
          >
            View Demo
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Preview mockups */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}
      >
        <div style={{ 
          background: theme.card, 
          border: `1px solid ${theme.border}`, 
          borderRadius: 32, 
          padding: 24,
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${theme.accent}10`
        }}>
          {/* Fake browser chrome */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, padding: '0 8px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
          </div>
          {/* Mockup content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {/* Phone mockup */}
            <div style={{ 
              background: theme.bg, 
              borderRadius: 24, 
              padding: 24, 
              border: `1px solid ${theme.border}`,
              textAlign: 'center'
            }}>
              <div style={{ width: '80%', height: 16, background: theme.border, borderRadius: 10, margin: '0 auto 16px' }} />
              <div style={{ width: 60, height: 60, background: `linear-gradient(135deg, ${theme.accent}, ${theme.secondary})`, borderRadius: '50%', margin: '0 auto 12px' }} />
              <div style={{ width: '60%', height: 14, background: theme.border, borderRadius: 8, margin: '0 auto 8px' }} />
              <div style={{ width: '40%', height: 12, background: theme.border, borderRadius: 6, margin: '0 auto 16px' }} />
              {[1,2,3,4].map(i => (
                <div key={i} style={{ 
                  background: theme.card, 
                  border: `1px solid ${theme.border}`, 
                  borderRadius: 12, 
                  padding: 14, 
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <div style={{ width: 20, height: 20, background: theme.border, borderRadius: 6 }} />
                  <div style={{ flex: 1, height: 10, background: theme.border, borderRadius: 6 }} />
                </div>
              ))}
            </div>
            {/* Dashboard mockup */}
            <div style={{ 
              background: theme.bg, 
              borderRadius: 24, 
              padding: 24, 
              border: `1px solid ${theme.border}` 
            }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {['Links', 'Appearance', 'Analytics'].map((tab, i) => (
                  <div key={tab} style={{ 
                    padding: '8px 16px', 
                    borderRadius: 8, 
                    background: i === 0 ? 'rgba(124, 58, 237, 0.2)' : 'transparent',
                    fontSize: 12,
                    color: i === 0 ? '#fff' : '#666',
                  }}>{tab}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {['Views', 'Clicks', 'Links', 'Rate'].map(metric => (
                  <div key={metric} style={{ background: theme.card, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>1.2K</div>
                    <div style={{ fontSize: 11, color: '#666' }}>{metric}</div>
                  </div>
                ))}
              </div>
              {[1,2,3].map(i => (
                <div key={i} style={{ 
                  background: theme.card, 
                  borderRadius: 10, 
                  padding: 12, 
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <div style={{ width: 24, height: 24, background: theme.border, borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '60%', height: 10, background: theme.border, borderRadius: 6, marginBottom: 4 }} />
                    <div style={{ width: '30%', height: 8, background: theme.border, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Features section
function Features() {
  const features = [
    { icon: '🎨', title: '50+ Themes', desc: 'From minimal to maximal, find your vibe. Or build your own.' },
    { icon: '📊', title: 'Deep Analytics', desc: 'See who clicks, when they click, and what they care about.' },
    { icon: '🔗', title: 'Custom Links', desc: 'Add unlimited links, reorder with drag & drop.' },
    { icon: '🌐', title: 'Custom Domains', desc: 'Use your own domain. beyou.io/yourname or yourdomain.com' },
    { icon: '📱', title: 'Mobile Optimized', desc: 'Lightning fast on every device. No bloat, just speed.' },
    { icon: '🔒', title: 'Privacy First', desc: 'Your data is yours. No tracking, no selling.' },
  ]

  return (
    <section style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
          Everything you need
        </h2>
        <p style={{ fontSize: 18, color: '#888', maxWidth: 500, margin: '0 auto' }}>
          Built for creators who care about their brand
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.02 }}
            style={{ 
              background: 'rgba(15, 15, 24, 0.8)', 
              border: '1px solid rgba(255,255,255,0.05)', 
              borderRadius: 20, 
              padding: 28,
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 16 }}>{feature.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#fff' }}>{feature.title}</h3>
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Theme showcase
function ThemeShowcase({ theme }) {
  return (
    <section style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
          Find your look
        </h2>
        <p style={{ fontSize: 18, color: '#888' }}>
          Pick a theme or go custom. Your page, your rules.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {Object.entries(THEMES).map(([key, t], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -5 }}
            style={{ 
              background: t.bg, 
              border: `1px solid ${t.border}`, 
              borderRadius: 20, 
              padding: 20,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 150,
              height: 150,
              background: `radial-gradient(circle, ${t.accent}30 0%, transparent 70%)`,
              filter: 'blur(40px)',
            }} />
            {/* Theme preview */}
            <div style={{ 
              background: t.card, 
              borderRadius: 14, 
              padding: 16, 
              border: `1px solid ${t.border}`,
              marginBottom: 16,
            }}>
              <div style={{ width: '60%', height: 8, background: t.border, borderRadius: 6, marginBottom: 12 }} />
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, background: `linear-gradient(135deg, ${t.accent}, ${t.secondary})`, borderRadius: 10 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: '60%', height: 10, background: t.border, borderRadius: 6, marginBottom: 4 }} />
                  <div style={{ width: '40%', height: 8, background: t.border, borderRadius: 4 }} />
                </div>
              </div>
              {[1,2,3].map(j => (
                <div key={j} style={{ 
                  background: t.bg, 
                  borderRadius: 8, 
                  padding: 10, 
                  marginBottom: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{ width: 16, height: 16, background: t.border, borderRadius: 4 }} />
                  <div style={{ flex: 1, height: 8, background: t.border, borderRadius: 4 }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: t.text, fontWeight: 600, fontSize: 15 }}>{t.name}</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.accent }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.secondary }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.border }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Pricing
function Pricing() {
  const plans = [
    { name: 'Starter', price: '$0', period: '/mo', features: ['5 links', 'Basic themes', 'Analytics', 'Mobile optimized'], cta: 'Start Free', popular: false },
    { name: 'Pro', price: '$9', period: '/mo', features: ['Unlimited links', 'All themes', 'Custom domain', 'Advanced analytics', 'No branding', 'Priority support'], cta: 'Go Pro', popular: true },
    { name: 'Business', price: '$29', period: '/mo', features: ['Everything in Pro', '5 team members', 'API access', 'Custom branding', 'Dedicated support'], cta: 'Contact Us', popular: false },
  ]

  return (
    <section style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>
          Simple pricing
        </h2>
        <p style={{ fontSize: 18, color: '#888' }}>
          Start free, upgrade when you're ready
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            style={{ 
              background: plan.popular 
                ? 'linear-gradient(180deg, rgba(124, 58, 237, 0.15), rgba(124, 58, 237, 0.05))' 
                : 'rgba(15, 15, 24, 0.8)', 
              border: plan.popular ? '2px solid #7c3aed' : '1px solid rgba(255,255,255,0.05)', 
              borderRadius: 24, 
              padding: 32,
              position: 'relative',
            }}
          >
            {plan.popular && (
              <div style={{ 
                position: 'absolute', 
                top: -12, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                background: 'linear-gradient(135deg, #7c3aed, #a855f7)', 
                color: '#fff', 
                fontSize: 12, 
                fontWeight: 700, 
                padding: '6px 16px', 
                borderRadius: 20 
              }}>
                Most Popular
              </div>
            )}
            <div style={{ fontSize: 14, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {plan.name}
            </div>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              {plan.price}<span style={{ fontSize: 16, color: '#666', fontWeight: 400 }}>{plan.period}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0' }}>
              {plan.features.map((f, j) => (
                <li key={j} style={{ padding: '10px 0', display: 'flex', alignItems: 'center', gap: 10, color: '#aaa', fontSize: 14 }}>
                  <span style={{ color: '#10b981' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <button style={{ 
              width: '100%',
              background: plan.popular 
                ? 'linear-gradient(135deg, #7c3aed, #a855f7)' 
                : 'rgba(255,255,255,0.05)', 
              color: '#fff', 
              padding: '14px 24px', 
              borderRadius: 12, 
              fontSize: 14, 
              fontWeight: 600, 
              border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)', 
              cursor: 'pointer' 
            }}>
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      padding: '60px 24px 40px', 
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>
          Bio<span style={{ color: '#a855f7' }}>Forge</span>
        </span>
      </div>
      <p style={{ color: '#555', fontSize: 14, marginBottom: 20 }}>
        © 2026 BioForge. Own your identity.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, color: '#666', fontSize: 14 }}>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacy</a>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms</a>
        <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Contact</a>
      </div>
    </footer>
  )
}

// Main App
export default function Home() {
  const [theme, setTheme] = useState(THEMES.midnight)

  return (
    <div style={{ background: theme.bg, minHeight: '100vh', color: '#fff', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <AnimatedBackground theme={theme} />
      <Nav />
      <Hero theme={theme} />
      <Features />
      <ThemeShowcase theme={theme} />
      <Pricing />
      <Footer />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
          background: ${theme.bg};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}; }
      `}</style>
    </div>
  )
}