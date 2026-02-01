import "../css/Dashboard.css";

function Dashboard() {
  const dashboardItems = [1, 2, 3, 4];

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <div className="intro">
          <h1>Welcome Bonjing,</h1>
          <p>Manage Files and Requests</p>
        </div>

        <div className="dashboard-cards">
          {dashboardItems.map((x) => (
            <div key={x} className="dashboard-card" />
          ))}
        </div>

        <div className="dashboard-panels">
          <div className="panel panel-search">
            <div className="searchbar">
              <input type="text" placeholder="Search" />
              <span className="search-icon">Q</span>
            </div>
            <div className="panel-body" />
          </div>
          <div className="panel panel-notif" />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
