import Header from "../../Header";
import "./Dashboard.css";

function Dashboard() {
  const dashboardItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-main">
        <div className="intro">
          <h1>Welcome User</h1>
          <p>Manage Files and Requests</p>
        </div>
        <div className="dashboard-items">
          {dashboardItems.map((x) => {
            return <div key={x}></div>;
          })}
        </div>
        <div className="search-file">
          <div className="search-button">
            <div>Search</div>
          </div>
        </div>
        <div className="notif-area"></div>
      </div>
    </div>
  );
}

export default Dashboard;
