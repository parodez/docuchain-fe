import React from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../css/MasterLayout.css";
import { getUserRole } from "../../auth";
import { useLogout } from "../../hooks/useAuth";

function MasterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: logout } = useLogout();

  // hide layout on login
  if (location.pathname === "/" || location.pathname === "/login") {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col h-dvh">
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="school-name">Gulod National Highschool</span>
        </div>
      </header>

      <div className="flex bg-[#f5f4ea] flex-1 h-1">
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

            {/* {(role === "Admin" || role === "Registrar") && ( */}
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive ? "nav-btn active" : "nav-btn"
              }
            >
              Request
            </NavLink>
            {/* )} */}

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

          <button
            className="signout"
            onClick={() => {
              logout();
            }}
          >
            Sign out
          </button>
        </aside>

        {/* CONTENT */}
        <section className="content overflow-y-auto">
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
