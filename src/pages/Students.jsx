import { useState, useMemo } from 'react';

const STUDENTS = [
  { name: 'Amina Wanjiru',    adm: 'ADM-0721', cls: 'Form 3A', fee: 22000, paid: 22000, status: 'Paid' },
  { name: 'Brian Otieno',     adm: 'ADM-1154', cls: 'Form 1B', fee: 18000, paid: 8000,  status: 'Partial' },
  { name: 'Christine Muthoni',adm: 'ADM-0834', cls: 'Form 2C', fee: 20000, paid: 20000, status: 'Paid' },
  { name: 'David Kipchoge',   adm: 'ADM-1042', cls: 'Form 4A', fee: 24000, paid: 5500,  status: 'Unpaid' },
  { name: 'Esther Njeri',     adm: 'ADM-0903', cls: 'Form 2A', fee: 20000, paid: 20000, status: 'Paid' },
  { name: 'Faith Wambui',     adm: 'ADM-1201', cls: 'Form 1C', fee: 18000, paid: 6000,  status: 'Partial' },
  { name: 'George Mutua',     adm: 'ADM-0612', cls: 'Form 4B', fee: 24000, paid: 24000, status: 'Paid' },
  { name: 'Grace Achieng',    adm: 'ADM-0987', cls: 'Form 3B', fee: 22000, paid: 6000,  status: 'Unpaid' },
  { name: 'Henry Njoroge',    adm: 'ADM-1089', cls: 'Form 2D', fee: 20000, paid: 14000, status: 'Partial' },
  { name: 'Irene Adhiambo',   adm: 'ADM-0765', cls: 'Form 3A', fee: 22000, paid: 22000, status: 'Paid' },
  { name: 'James Kariuki',    adm: 'ADM-1321', cls: 'Form 1A', fee: 18000, paid: 18000, status: 'Paid' },
  { name: 'John Mwangi',      adm: 'ADM-1103', cls: 'Form 2D', fee: 20000, paid: 4500,  status: 'Unpaid' },
  { name: 'Joyce Kemunto',    adm: 'ADM-0892', cls: 'Form 3B', fee: 22000, paid: 22000, status: 'Paid' },
  { name: 'Kevin Odhiambo',   adm: 'ADM-1178', cls: 'Form 1B', fee: 18000, paid: 10000, status: 'Partial' },
  { name: 'Lucy Wangari',     adm: 'ADM-0741', cls: 'Form 4A', fee: 24000, paid: 24000, status: 'Paid' },
  { name: 'Moses Kamau',      adm: 'ADM-1012', cls: 'Form 4B', fee: 24000, paid: 18000, status: 'Partial' },
  { name: 'Nancy Chebet',     adm: 'ADM-0856', cls: 'Form 3A', fee: 22000, paid: 22000, status: 'Paid' },
  { name: 'Oscar Omondi',     adm: 'ADM-1244', cls: 'Form 1C', fee: 18000, paid: 18000, status: 'Paid' },
  { name: 'Peter Ochieng',    adm: 'ADM-1055', cls: 'Form 4C', fee: 24000, paid: 13000, status: 'Partial' },
  { name: 'Rose Nyambura',    adm: 'ADM-0688', cls: 'Form 4C', fee: 24000, paid: 24000, status: 'Paid' },
];

const PAYMENT_HISTORY = {
  'ADM-0721': [{ date: 'May 12', txn: 'QA73NXP2', amt: 14500 }, { date: 'May 5', txn: 'QZ11ABA2', amt: 7500 }],
  'ADM-1154': [{ date: 'May 12', txn: 'QB81MKR4', amt: 8000 }],
  'ADM-0834': [{ date: 'May 12', txn: 'BNK-04421', amt: 22000 }],
  'ADM-1042': [{ date: 'Apr 28', txn: 'QR44TUV3', amt: 5500 }],
  'ADM-0903': [{ date: 'May 11', txn: 'QC92PLT7', amt: 22000 }],
  'ADM-0987': [{ date: 'Apr 22', txn: 'QT77GHI9', amt: 6000 }],
};

const CLASSES  = ['Form 1A','Form 1B','Form 1C','Form 2A','Form 2C','Form 2D','Form 3A','Form 3B','Form 4A','Form 4B','Form 4C'];
const STATUSES = ['Paid','Partial','Unpaid'];

const fmt = (n) => 'KES ' + n.toLocaleString();

const badgeClass = (s) =>
  s === 'Paid' ? 'badge-paid' : s === 'Partial' ? 'badge-partial' : 'badge-unpaid';

const balClass = (s) =>
  s === 'Paid' ? 'td-balance-ok' : s === 'Partial' ? 'td-balance-warn' : 'td-balance-bad';

// Student modal
const StudentModal = ({ student, onClose }) => {
  if (!student) return null;
  const bal = student.fee - student.paid;
  const pct = Math.round((student.paid / student.fee) * 100);
  const hist = PAYMENT_HISTORY[student.adm] || [];

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <div className="modal-title">{student.name}</div>
          <button className="modal-close" onClick={onClose}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="student-summary">
            <div className="student-summary-name">{student.name}</div>
            <div className="student-summary-meta">{student.cls} · {student.adm}</div>
            <div className="summary-stats">
              <div className="summary-stat">
                <div className="summary-stat-val" style={{ color: 'var(--text)' }}>{fmt(student.fee)}</div>
                <div className="summary-stat-lbl">Total Fee</div>
              </div>
              <div className="summary-stat">
                <div className="summary-stat-val" style={{ color: 'var(--green)' }}>{fmt(student.paid)}</div>
                <div className="summary-stat-lbl">Paid</div>
              </div>
              <div className="summary-stat">
                <div className="summary-stat-val" style={{ color: bal === 0 ? 'var(--green)' : 'var(--red)' }}>
                  {bal === 0 ? 'Cleared' : fmt(bal)}
                </div>
                <div className="summary-stat-lbl">Balance</div>
              </div>
            </div>
            <div className="prog-bar" style={{ marginTop: 14, height: 6 }}>
              <div className={`prog-fill${pct < 100 ? ' warn' : ''}`} style={{ width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 5 }}>{pct}% of fees paid</div>
          </div>

          <div className="history-title">Payment History</div>
          {hist.length ? (
            hist.map((h, i) => (
              <div className="hist-item" key={i}>
                <div className="hist-dot" />
                <div className="hist-info">
                  <div className="hist-date">May 2025 — {h.date}</div>
                  <div className="hist-txn">{h.txn}</div>
                </div>
                <div className="hist-amt">{fmt(h.amt)}</div>
              </div>
            ))
          ) : (
            <div className="empty">
              <div className="empty-icon">📭</div>
              <div className="empty-text">No payments recorded yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Students = () => {
  const [query, setQuery]     = useState('');
  const [clsFilter, setCls]   = useState('');
  const [stFilter, setSt]     = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return STUDENTS.filter(s => {
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.adm.toLowerCase().includes(q);
      const matchC = !clsFilter || s.cls === clsFilter;
      const matchS = !stFilter  || s.status === stFilter;
      return matchQ && matchC && matchS;
    });
  }, [query, clsFilter, stFilter]);

  return (
    <>
      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            className="search-input"
            placeholder="Search by name or admission number…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <select className="select-filter" value={clsFilter} onChange={e => setCls(e.target.value)}>
          <option value="">All Classes</option>
          {CLASSES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className="select-filter" value={stFilter} onChange={e => setSt(e.target.value)}>
          <option value="">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table card */}
      <div className="card">
        <div className="card-head">
          <div>
            <div className="card-title">All Students</div>
            <div className="card-sub">Showing {filtered.length} students</div>
          </div>
          <button className="btn btn-outline btn-sm">Export CSV</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Adm No.</th>
                <th>Class</th>
                <th>Total Fee</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 30, color: 'var(--text3)' }}>No students found</td>
                </tr>
              ) : filtered.map(s => {
                const bal = s.fee - s.paid;
                return (
                  <tr key={s.adm} onClick={() => setSelected(s)}>
                    <td className="td-primary">{s.name}</td>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{s.adm}</td>
                    <td>{s.cls}</td>
                    <td className="td-mono">{fmt(s.fee)}</td>
                    <td className="td-balance-ok">{fmt(s.paid)}</td>
                    <td className={balClass(s.status)}>{bal === 0 ? '—' : fmt(bal)}</td>
                    <td><span className={`badge ${badgeClass(s.status)}`}>{s.status}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selected && <StudentModal student={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default Students;
