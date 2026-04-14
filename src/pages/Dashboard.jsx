import { useNavigate } from 'react-router-dom';

// ── Static seed data (replace with API calls later) ──
const RECENT_PAYMENTS = [
  { initials: 'AW', name: 'Amina Wanjiru',   meta: 'Form 3A · ADM-0721', txn: 'QA73NXP2', amount: 'KES 14,500', time: 'Today 09:14 AM' },
  { initials: 'BO', name: 'Brian Otieno',    meta: 'Form 1B · ADM-1154', txn: 'QB81MKR4', amount: 'KES 8,000',  time: 'Today 08:31 AM' },
  { initials: 'CM', name: 'Christine Muthoni', meta: 'Form 2C · ADM-0834', txn: 'BNK-04421', amount: 'KES 22,000', time: 'Today 07:05 AM' },
  { initials: 'EN', name: 'Esther Njeri',    meta: 'Form 2A · ADM-0903', txn: 'QC92PLT7', amount: 'KES 22,000', time: 'Yesterday 04:22 PM' },
  { initials: 'MK', name: 'Moses Kamau',     meta: 'Form 4B · ADM-1012', txn: 'QD15WVX9', amount: 'KES 18,000', time: 'Yesterday 02:10 PM' },
];

const TOP_UNPAID = [
  { rank: 1, name: 'Grace Achieng',  cls: 'Form 3B · ADM-0987', bal: 'KES 16,000', days: '24 days' },
  { rank: 2, name: 'David Kipchoge', cls: 'Form 4A · ADM-1042', bal: 'KES 18,500', days: '21 days' },
  { rank: 3, name: 'John Mwangi',    cls: 'Form 2D · ADM-1103', bal: 'KES 15,500', days: '20 days' },
  { rank: 4, name: 'Faith Wambui',   cls: 'Form 1C · ADM-1201', bal: 'KES 12,000', days: '19 days' },
  { rank: 5, name: 'Peter Ochieng',  cls: 'Form 4C · ADM-1055', bal: 'KES 11,000', days: '19 days' },
];

const STATS = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="var(--green)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"/>
      </svg>
    ),
    iconBg: 'var(--green-bg)', iconBorder: 'var(--green-border)',
    badge: '↑ 8.2%', badgeBg: 'var(--green-bg)', badgeColor: 'var(--green)',
    value: 'KES 2.4M', valueColor: 'var(--text)',
    label: 'Total Collected',
    sub: 'Term target: KES 3.87M',
    progress: 62, progressClass: '',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="var(--red)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
    iconBg: 'var(--red-bg)', iconBorder: 'var(--red-border)',
    badge: '↑ 3 new', badgeBg: 'var(--red-bg)', badgeColor: 'var(--red)',
    value: 'KES 1.47M', valueColor: 'var(--red)',
    label: 'Outstanding',
    sub: '87 students with arrears',
    progress: 38, progressClass: 'bad',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="var(--green)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    iconBg: 'var(--green-bg)', iconBorder: 'var(--green-border)',
    badge: null,
    value: '468', valueColor: 'var(--text)',
    label: 'Fully Paid',
    sub: 'Out of 542 students (86%)',
    progress: 86, progressClass: '',
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="var(--red)">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 9H6M10 13H6m10 4H6M20 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2z"/>
      </svg>
    ),
    iconBg: 'var(--red-bg)', iconBorder: 'var(--red-border)',
    badge: '74 students', badgeBg: 'var(--red-bg)', badgeColor: 'var(--red)',
    value: '74', valueColor: 'var(--red)',
    label: 'Unpaid / Partial',
    sub: '57 partial · 17 overdue',
    progress: 14, progressClass: 'warn',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Today bar */}
      <div className="today-bar">
        <div className="today-left">
          <div className="pulse-dot" />
          <div>
            <div className="today-label"><strong>Today's collections</strong> are live</div>
            <div style={{ fontSize: 11.5, color: 'var(--text3)', marginTop: 2 }}>Last payment: 14 min ago via M-Pesa</div>
          </div>
        </div>
        <div className="today-right">
          <div className="today-stat">
            <div className="today-stat-val">KES 47,500</div>
            <div className="today-stat-lbl">Collected today</div>
          </div>
          <div className="today-stat">
            <div className="today-stat-val" style={{ color: 'var(--text2)' }}>18</div>
            <div className="today-stat-lbl">Payments today</div>
          </div>
        </div>
      </div>

      {/* KPI stats */}
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-header">
              <div className="stat-icon" style={{ background: s.iconBg, border: `1px solid ${s.iconBorder}` }}>
                {s.icon}
              </div>
              {s.badge && (
                <div className="stat-badge" style={{ background: s.badgeBg, color: s.badgeColor }}>
                  {s.badge}
                </div>
              )}
            </div>
            <div className="stat-value" style={{ color: s.valueColor }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
            <div className="prog-bar">
              <div className={`prog-fill${s.progressClass ? ' ' + s.progressClass : ''}`} style={{ width: `${s.progress}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Two col: live feed + top unpaid */}
      <div className="two-col">

        {/* Recent payments */}
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Recent Payments</div>
              <div className="card-sub">Live feed · Today</div>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/payments')}>See all</button>
          </div>
          <div className="feed card-body-flush">
            {RECENT_PAYMENTS.map((p, i) => (
              <div className="feed-item" key={i}>
                <div className="feed-avatar">{p.initials}</div>
                <div>
                  <div className="feed-name">{p.name}</div>
                  <div className="feed-meta">{p.meta}</div>
                  <span className="feed-txn">{p.txn}</span>
                </div>
                <div className="feed-amount">{p.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top unpaid */}
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Top Unpaid</div>
              <div className="card-sub">Highest balances overdue</div>
            </div>
          </div>
          {TOP_UNPAID.map((u, i) => (
            <div className="unpaid-item" key={i} onClick={() => navigate('/students')}>
              <div className="unpaid-rank">{u.rank}</div>
              <div className="unpaid-info">
                <div className="unpaid-name">{u.name}</div>
                <div className="unpaid-class">{u.cls}</div>
              </div>
              <div>
                <div className="unpaid-bal">{u.bal}</div>
                <span className="unpaid-days">{u.days}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Dashboard;
