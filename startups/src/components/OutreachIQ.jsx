export default function OutreachIQ() {
  return (
    <div className="container" style={{ background: '#fafafa', color: '#111', minHeight: '100vh' }}>
      <style>{`
        .container { max-width: 900px; margin: 0 auto; padding: 60px 24px; }
        .logo { font-weight: 800; font-size: 20px; letter-spacing: -0.5px; }
        .logo span { color: #0066cc; }
        h1 { font-size: clamp(32px, 7vw, 56px); font-weight: 800; line-height: 1.15; margin: 24px 0; letter-spacing: -1.5px; }
        .hero-text { font-size: 18px; color: #666; max-width: 520px; margin-bottom: 40px; }
        .stats { display: flex; gap: 48px; margin-bottom: 48px; }
        .stat { font-size: 48px; font-weight: 800; color: #0066cc; line-height: 1; }
        .stat-label { font-size: 13px; color: #666; margin-top: 8px; }
        .quote { background: #fff; border-left: 4px solid #0066cc; padding: 24px 28px; margin: 32px 0; font-style: italic; color: #666; font-size: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .quote-author { font-style: normal; font-weight: 600; color: #111; margin-top: 12px; font-size: 13px; }
        .comparison { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 40px 0; }
        .comp-box { background: #fff; border: 1px solid #e5e5e5; border-radius: 12px; padding: 28px; }
        .comp-box.bad { border-color: #ffcccc; background: #fffafa; }
        .comp-box.good { border-color: #cce5ff; background: #f0f7ff; }
        .comp-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; font-weight: 600; }
        .comp-box.bad .comp-label { color: #cc0000; }
        .comp-box.good .comp-label { color: #0066cc; }
        .comp-box p { font-size: 14px; color: #666; }
        .price-section { background: #fff; border: 2px solid #0066cc; border-radius: 16px; padding: 40px; text-align: center; margin-top: 48px; box-shadow: 0 4px 16px rgba(0,102,204,0.1); }
        .price { font-size: 56px; font-weight: 800; letter-spacing: -2px; }
        .price span { font-size: 18px; color: #666; font-weight: 400; }
        .cta-btn { display: inline-block; background: #0066cc; color: #fff; padding: 18px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none; margin-top: 24px; }
        .email-input { display: flex; gap: 12px; max-width: 400px; margin: 24px auto 0; }
        .email-input input { flex: 1; padding: 14px 16px; border: 1px solid #e5e5e5; border-radius: 8px; font-size: 15px; }
        .email-input button { background: #0066cc; color: #fff; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
      `}</style>
      
      <div className="logo">Outreach<span>IQ</span></div>
      
      <h1>Cold emails that<br />get replies</h1>
      <p className="hero-text">We scan what your prospects are actually talking about online — then write emails that feel personal, not robotic.</p>
      
      <div className="stats">
        <div>
          <div className="stat">47%</div>
          <div className="stat-label">Avg. reply rate (vs 2%)</div>
        </div>
        <div>
          <div className="stat">10x</div>
          <div className="stat-label">More meetings booked</div>
        </div>
      </div>
      
      <div className="quote">
        "We're sending 500 emails/week with 'personalization' (first name, company) but reply rate is under 2%. Everyone says cold email is dead."
        <div className="quote-author">— r/startups</div>
      </div>
      
      <div className="comparison">
        <div className="comp-box bad">
          <div className="comp-label">❌ Generic</div>
          <p>Hi {`{first_name}`}, I noticed {`{company}`} is growing fast and thought you'd be interested in...</p>
        </div>
        <div className="comp-box good">
          <div className="comp-label">✅ With OutreachIQ</div>
          <p>Hey Sarah — saw your post about struggling with churn on r/SaaS. Here's what worked for us...</p>
        </div>
      </div>
      
      <div className="price-section">
        <div className="price">$49<span>/month</span></div>
        <p style={{ color: '#666', marginTop: 8 }}>No credit card required to start</p>
        <div className="email-input">
          <input type="email" placeholder="Your email" required />
          <button>Join Waitlist</button>
        </div>
      </div>
    </div>
  )
}