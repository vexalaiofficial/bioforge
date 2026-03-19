export default function PriceSpy() {
  return (
    <div className="container" style={{ background: '#fff', color: '#111', minHeight: '100vh' }}>
      <style>{`
        .container { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        h1 { font-size: clamp(32px, 7vw, 52px); font-weight: 800; line-height: 1.1; margin-bottom: 20px; letter-spacing: -1.5px; }
        h1 span { color: #f97316; }
        .hero-text { font-size: 18px; color: #666; max-width: 500px; margin-bottom: 40px; }
        .alert-card { background: #f5f5f5; border-left: 4px solid #f97316; padding: 24px 28px; margin: 32px 0; border-radius: 0 8px 8px 0; }
        .alert-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #f97316; font-weight: 600; margin-bottom: 8px; }
        .alert-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .alert-desc { color: #666; font-size: 14px; }
        .changes { display: grid; gap: 12px; margin-top: 20px; }
        .change { display: flex; justify-content: space-between; align-items: center; background: #fff; padding: 12px 16px; border-radius: 8px; font-size: 14px; }
        .change.up { border: 1px solid #ffccc7; background: #fff5f5; }
        .change.down { border: 1px solid #d9f7be; background: #f6ffed; }
        .change-badge { font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 4px; }
        .change.up .change-badge { background: #ff4d4f; color: #fff; }
        .change.down .change-badge { background: #52c41a; color: #fff; }
        .quote { background: #f5f5f5; border-radius: 12px; padding: 24px; margin: 32px 0; font-style: italic; color: #666; }
        .quote-author { font-style: normal; font-weight: 600; color: #111; margin-top: 12px; font-size: 13px; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 40px 0; }
        .feature { background: #f5f5f5; border-radius: 12px; padding: 24px; }
        .feature h3 { font-size: 16px; margin-bottom: 8px; color: #f97316; }
        .feature p { font-size: 14px; color: #666; }
        .price-section { background: #f5f5f5; border-radius: 16px; padding: 40px; text-align: center; margin-top: 48px; }
        .price { font-size: 48px; font-weight: 800; }
        .price span { font-size: 16px; color: #666; font-weight: 400; }
        .cta-btn { display: inline-block; background: #f97316; color: #fff; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none; margin-top: 24px; }
        .email-form { margin-top: 24px; display: flex; gap: 12px; max-width: 360px; margin-left: auto; margin-right: auto; }
        .email-form input { flex: 1; padding: 14px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 15px; }
        .email-form button { background: #f97316; color: #fff; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
      `}</style>
      
      <h1>Know what competitors<br /><span>charge</span></h1>
      <p className="hero-text">PriceSpy monitors competitor pricing changes, feature removals, and customer complaints — so you always price with confidence.</p>
      
      <div className="alert-card">
        <div className="alert-label">⚡ LIVE ALERT — 2 hours ago</div>
        <div className="alert-title">Competitor raised prices by 40%</div>
        <div className="alert-desc">Competitor XYZ increased from $49 → $69/mo. Their customers are complaining.</div>
        <div className="changes">
          <div className="change down">
            <span>Churnify: $29 → $39</span>
            <span className="change-badge">+34%</span>
          </div>
          <div className="change down">
            <span>PricePoint: $19 → $29</span>
            <span className="change-badge">+53%</span>
          </div>
        </div>
      </div>
      
      <div className="quote">
        "We've changed our pricing 3 times in 6 months. Some people say we're too expensive, others sign up without blinking. We have no idea what the 'right' price is."
        <div className="quote-author">— r/startups</div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>📡 Real-Time Alerts</h3>
          <p>Get notified the minute a competitor changes prices or removes features.</p>
        </div>
        <div className="feature">
          <h3>💬 Complaint Radar</h3>
          <p>See what users actually hate about competitor pricing in reviews.</p>
        </div>
        <div className="feature">
          <h3>🎯 Optimal Pricing</h3>
          <p>AI recommends the perfect price point based on market data.</p>
        </div>
      </div>
      
      <div className="price-section">
        <div className="price">$19<span>/month</span></div>
        <p style={{ color: '#666', marginTop: 8 }}>First 7 days free</p>
        <a href="#" className="cta-btn">Start Monitoring</a>
        <form className="email-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your work email" required />
          <button type="submit">Try Free</button>
        </form>
      </div>
    </div>
  )
}