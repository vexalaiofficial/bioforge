export default function ChurnGuard() {
  return (
    <div className="container">
      <div className="badge">NOW IN BETA</div>
      <h1>Stop Losing<br /><span>Customers</span></h1>
      <p className="hero-text">ChurnGuard predicts which users are about to leave — before they cancel. Get automated retention campaigns that actually work.</p>

      <div className="problem">
        <div className="problem-label">THE PAIN</div>
        <p className="problem-text">"We're at $15K MRR but churn is 8%. Every time we add 5 customers, we lose 3. It's like running on a treadmill."</p>
      </div>

      <div className="features">
        <div className="feature">
          <h3>🔮 Predictive Scoring</h3>
          <p>AI analyzes usage patterns to flag at-risk accounts weeks before they churn.</p>
        </div>
        <div className="feature">
          <h3>⚡ Auto-Intervention</h3>
          <p>Trigger personalized offers, emails, or discounts when risk score spikes.</p>
        </div>
        <div className="feature">
          <h3>📊 Churn Analytics</h3>
          <p>Know exactly why users leave. Root cause analysis, not just metrics.</p>
        </div>
      </div>

      <div className="price">$29<span>/month</span></div>

      <div className="cta">
        <form className="email-form" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Get Early Access</button>
        </form>
      </div>
    </div>
  )
}