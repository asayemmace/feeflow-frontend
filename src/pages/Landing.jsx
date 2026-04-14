import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const FEATURES = [
  {
    color: 'var(--green)',
    bg: 'var(--green-bg)',
    border: 'var(--green-border)',
    title: 'M-Pesa Integration',
    desc: 'Receive payments directly via M-Pesa Daraja. Every transaction is auto-matched to a student record in real time.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
  },
  {
    color: 'var(--blue)',
    bg: 'var(--blue-bg)',
    border: 'var(--blue-border)',
    title: 'Automated Invoices',
    desc: 'Generate and send professional PDF invoices to parents over WhatsApp — all triggered automatically via n8n workflows.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    color: 'var(--amber)',
    bg: 'var(--amber-bg)',
    border: 'var(--amber-border)',
    title: 'Smart Reminders',
    desc: 'Automatic 3-day, 1-day, and overdue payment reminders sent directly to parents. Zero manual follow-up required.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    ),
  },
  {
    color: 'var(--green)',
    bg: 'var(--green-bg)',
    border: 'var(--green-border)',
    title: 'Student Management',
    desc: 'Track every student\'s fee balance, payment history, and status in one clean dashboard. Export to CSV anytime.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    color: 'var(--blue)',
    bg: 'var(--blue-bg)',
    border: 'var(--blue-border)',
    title: 'Live Analytics',
    desc: 'Real-time collection stats, term-over-term comparisons, and overdue alerts. Know exactly where your fees stand.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
  },
  {
    color: 'var(--amber)',
    bg: 'var(--amber-bg)',
    border: 'var(--amber-border)',
    title: 'Fully Managed',
    desc: 'No software to install. We host everything. Your school gets a dedicated account on our secure, always-on platform.',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/>
      </svg>
    ),
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <div className="landing-nav-logo-mark"><LogoIcon /></div>
          <div className="landing-nav-logo-text">FeeFlow</div>
        </div>
        <div className="landing-nav-actions">
          <button className="btn btn-outline" onClick={() => navigate('/login')}>Sign in</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-tag">
          <span style={{ width: 7, height: 7, background: 'var(--green)', borderRadius: '50%', display: 'inline-block' }} />
          Built for Kenyan schools
        </div>
        <h1 className="landing-h1">
          School fee management<br />
          <span>without the chaos.</span>
        </h1>
        <p className="landing-sub">
          FeeFlow automates M-Pesa collection, invoice delivery, and payment reminders
          — so bursars spend less time chasing fees.
        </p>
        <div className="landing-ctas">
          <button className="landing-cta-primary" onClick={() => navigate('/register')}>
            Start free trial →
          </button>
          <button className="landing-cta-secondary" onClick={() => navigate('/login')}>
            Sign into your account
          </button>
        </div>
      </section>

      {/* Stats */}
      <div className="landing-stats">
        {[
          { val: 'KES 2.4M', lbl: 'Collected per term' },
          { val: '542+',     lbl: 'Students tracked' },
          { val: '86%',      lbl: 'Collection rate' },
          { val: '<2 min',   lbl: 'Invoice delivery time' },
        ].map(s => (
          <div key={s.lbl} style={{ textAlign: 'center' }}>
            <div className="landing-stat-val">{s.val}</div>
            <div className="landing-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-section-label">Why FeeFlow</div>
        <h2 className="landing-h2">Everything your bursar needs</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                <svg style={{ width: 20, height: 20, color: f.color, strokeWidth: 1.8 }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {f.icon.props.children}
                </svg>
              </div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © 2025 FeeFlow · Built for African schools · yahiawarsame@gmail.com
      </footer>
    </div>
  );
};

export default Landing;
