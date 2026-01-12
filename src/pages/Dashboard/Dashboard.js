import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to DocuChain</p>
        </header>
        
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">📄</div>
              <h3 className="card-title">Documents</h3>
              <p className="card-description">Manage your documents</p>
            </div>
            
            <div className="dashboard-card">
              <div className="card-icon">🔗</div>
              <h3 className="card-title">Chain</h3>
              <p className="card-description">View blockchain records</p>
            </div>
            
            <div className="dashboard-card">
              <div className="card-icon">⚙️</div>
              <h3 className="card-title">Settings</h3>
              <p className="card-description">Configure your account</p>
            </div>
            
            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3 className="card-title">Analytics</h3>
              <p className="card-description">View statistics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
