import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecentPayments, getTopUnpaid, getStats } from "../api/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentPayments, setRecentPayments] = useState([]);
  const [topUnpaid, setTopUnpaid] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [payments, unpaid, statsData] = await Promise.all([
          getRecentPayments(),
          getTopUnpaid(),
          getStats()
        ]);
        setRecentPayments(payments);
        setTopUnpaid(unpaid);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Today bar */}
      <div className="today-bar">
        <div className="today-left">
          <div className="pulse-dot" />
          <div>
            <div className="today-label"><strong>Today's collections</strong> are live</div>
            <div style={{ fontSize: 11.5, color: 'var(--text3)', marginTop: 2 }}>
              Last payment just now
            </div>
          </div>
        </div>
        <div className="today-right">
          <div className="today-stat">
            <div className="today-stat-val">KES {stats.totalCollected}</div>
            <div className="today-stat-lbl">Collected today</div>
          </div>
          <div className="today-stat">
            <div className="today-stat-val" style={{ color: 'var(--text2)' }}>{stats.paymentsToday}</div>
            <div className="today-stat-lbl">Payments today</div>
          </div>
        </div>
      </div>

      {/* KPI stats */}
      <div className="stats-grid">
        {stats.items?.map((s, i) => (
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
            {recentPayments.map((p, i) => (
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
          {topUnpaid.map((u, i) => (
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
