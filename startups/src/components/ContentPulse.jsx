export default function ContentPulse() {
  return (
    <div className="container" style={{ background: '#0d1117', color: '#e6edf3', minHeight: '100vh' }}>
      <style>{`
        .container { max-width: 800px; margin: 0 auto; padding: 60px 24px; }
        h1 { font-size: clamp(32px, 7vw, 52px); font-weight: 700; line-height: 1.15; margin-bottom: 20px; letter-spacing: -1px; }
        h1 span { color: #7ee787; }
        .hero-text { font-size: 18px; color: #8b949e; max-width: 500px; margin-bottom: 40px; }
        .terminal { background: #161b22; border: 1px solid #30363d; border-radius: 12px; overflow: hidden; margin: 32px 0; }
        .terminal-header { background: #161b22; border-bottom: 1px solid #30363d; padding: 12px 16px; display: flex; gap: 8px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot.red { background: #ff5f57; }
        .dot.yellow { background: #febc2e; }
        .dot.green { background: #28c840; }
        .terminal-body { padding: 20px; font-family: 'SF Mono', Monaco, monospace; font-size: 13px; }
        .terminal-line { color: #8b949e; margin-bottom: 8px; }
        .terminal-line .lime { color: #7ee787; }
        .terminal-line .purple { color: #d2a8ff; }
        .result { background: rgba(126, 231, 135, 0.12); border: 1px solid #7ee787; border-radius: 8px; padding: 16px; margin-top: 16px; }
        .result-title { font-weight: 600; color: #7ee787; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
        .result p { font-size: 15px; line-height: 1.5; }
        .quote { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 24px; margin: 32px 0; font-style: italic; color: #8b949e; }
        .quote-author { font-style: normal; font-weight: 600; color: #e6edf3; margin-top: 12px; font-size: 13px; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 40px 0; }
        .feature { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 24px; }
        .feature h3 { font-size: 16px; margin-bottom: 8px; color: #7ee787; }
        .feature p { font-size: 14px; color: #8b949e; }
        .price { font-size: 48px; font-weight: 700; margin-top: 40px; }
        .price span { font-size: 16px; color: #8b949e; font-weight: 400; }
        .btn { display: inline-block; background: #7ee787; color: #0d1117; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; text-decoration: none; }
        .email-form { margin-top: 24px; display: flex; gap: 12px; max-width: 400px; }
        .email-form input { flex: 1; background: #161b22; border: 1px solid #30363d; padding: 14px 16px; border-radius: 8px; color: #e6edf3; font-size: 16px; }
        .email-form button { background: #7ee787; color: #0d1117; border: none; padding: 14px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; }
      `}</style>
      
      <h1>Never run out of<br /><span>content ideas</span></h1>
      <p className="hero-text">ContentPulse monitors what your audience is actually asking — in real Reddit threads, Discord servers, and forums. Then generates blog posts they'll actually read.</p>
      
      <div className="terminal">
        <div className="terminal-header">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">$ contentpulse scan --community r/SaaS</div>
          <div className="terminal-line">🔍 Scanning 847 discussions...</div>
          <div className="terminal-line"><span className="purple">→ Found 23 high-intent questions about churn</span></div>
          <div className="terminal-line"><span className="purple">→ Found 18 questions about cold email optimization</span></div>
          <div className="terminal-line"><span className="lime">✓ Generating blog post outline...</span></div>
          <div className="result">
            <div className="result-title">Blog Post #1</div>
            <p><strong>"The Real Reason Your SaaS Churn is High (It's Not Your Product)"</strong></p>
            <p style={{ marginTop: 8, color: '#8b949e', fontSize: 14 }}>Based on 23 discussions in r/SaaS. Estimated traffic: 2,400/mo</p>
          </div>
        </div>
      </div>
      
      <div className="quote">
        "We're posting 2-3 blogs/month but barely getting traffic. How do you know what topics your audience actually cares about? We're just guessing based on keyword tools."
        <div className="quote-author">— r/SaaS</div>
      </div>
      
      <div className="features">
        <div className="feature">
          <h3>🎯 Real Questions</h3>
          <p>Monitor 50+ communities. Get questions people are actually asking.</p>
        </div>
        <div className="feature">
          <h3>✍️ Auto-Outline</h3>
          <p>Generate SEO-optimized blog outlines in seconds, not hours.</p>
        </div>
        <div className="feature">
          <h3>📈 Traffic Prediction</h3>
          <p>See estimated monthly searches before you write.</p>
        </div>
      </div>
      
      <div className="price">$39<span>/month</span></div>
      
      <div className="cta">
        <a href="#" className="btn">Start Free Trial</a>
        <form className="email-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Get Access</button>
        </form>
      </div>
    </div>
  )
}