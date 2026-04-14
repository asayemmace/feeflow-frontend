const MATCHED = [
  { name: 'Amina Wanjiru',    detail: 'Form 3A · ADM-0721', txn: 'QA73NXP2',  amount: 'KES 14,500', time: 'Today 09:14 AM' },
  { name: 'Brian Otieno',     detail: 'Form 1B · ADM-1154', txn: 'QB81MKR4',  amount: 'KES 8,000',  time: 'Today 08:31 AM' },
  { name: 'Christine Muthoni',detail: 'Form 2C · ADM-0834', txn: 'BNK-04421', amount: 'KES 22,000', time: 'Today 07:05 AM' },
  { name: 'Esther Njeri',     detail: 'Form 2A · ADM-0903', txn: 'QC92PLT7',  amount: 'KES 22,000', time: 'Yesterday 04:22 PM' },
  { name: 'Moses Kamau',      detail: 'Form 4B · ADM-1012', txn: 'QD15WVX9',  amount: 'KES 18,000', time: 'Yesterday 02:10 PM' },
];

const UNMATCHED = [
  { phone: '0712 *** 441', txn: 'QE27BNM1', amount: 'KES 5,000',  time: 'Today 10:02 AM' },
  { phone: '0733 *** 882', txn: 'QF38CXP5', amount: 'KES 12,000', time: 'Yesterday 11:45 AM' },
  { phone: '0701 *** 119', txn: 'QG44DHQ8', amount: 'KES 9,500',  time: '2 days ago' },
];

const PayIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"/>
  </svg>
);

const QuestionIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);

const Payments = () => {
  return (
    <>
      {/* Matched payments */}
      <div className="card" style={{ marginBottom: 0 }}>
        <div className="card-head">
          <div>
            <div className="card-title">M-Pesa Payments</div>
            <div className="card-sub">Matched to students · Today</div>
          </div>
          <button className="btn btn-primary btn-sm">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Record Manual
          </button>
        </div>
        <div className="card-body-flush">
          {MATCHED.map((p, i) => (
            <div className="pay-item" key={i}>
              <div className="pay-icon"><PayIcon /></div>
              <div className="pay-info">
                <div className="pay-name">{p.name}</div>
                <div className="pay-detail">
                  {p.detail} <span className="pay-txn">{p.txn}</span>
                </div>
              </div>
              <div className="pay-right">
                <div className="pay-amount">{p.amount}</div>
                <div className="pay-time">{p.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unmatched divider */}
      <div className="section-divider">
        <div className="section-divider-line" />
        <div className="section-divider-text">⚠ Unmatched Payments — Action Required</div>
        <div className="section-divider-line" />
      </div>

      {/* Unmatched payments */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div>
            <div className="card-title" style={{ color: 'var(--amber)' }}>Unmatched M-Pesa Payments</div>
            <div className="card-sub">Could not be linked to a student — please review</div>
          </div>
          <span className="badge badge-unmatched">{UNMATCHED.length} pending</span>
        </div>
        <div className="card-body-flush">
          {UNMATCHED.map((p, i) => (
            <div className="pay-item" key={i}>
              <div className="pay-icon unmatched"><QuestionIcon /></div>
              <div className="pay-info">
                <div className="pay-name" style={{ color: 'var(--amber)' }}>Unknown Sender</div>
                <div className="pay-detail">
                  Phone: {p.phone}{' '}
                  <span className="pay-txn" style={{ color: 'var(--amber)', borderColor: 'var(--amber-border)' }}>{p.txn}</span>
                </div>
              </div>
              <div className="pay-right">
                <div className="pay-amount" style={{ color: 'var(--amber)' }}>{p.amount}</div>
                <div className="pay-time">{p.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Payments;
