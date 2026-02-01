import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import "../css/MasterLayout.css";

function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // hide layout on login
  if (location.pathname === "/" || location.pathname === "/login") {
    return <Outlet />;
  }

  return (
    <div className="layout">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="school-name">Gulod National Highschool</span>
        </div>
      </header>

      <div className="main">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="nav-panel">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              Request
            </NavLink>

            <NavLink
              to="/documents"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              Document
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              Profile
            </NavLink>
          </div>

          <button className="signout" onClick={() => navigate("/login")}>
            Sign out
          </button>
        </aside>

        {/* CONTENT */}
        <section className="content">
          <Outlet />
        </section>
      </div>

      {/* BOTTOMBAR */}
      <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer>
    </div>
  );
}

export default MasterLayout;
