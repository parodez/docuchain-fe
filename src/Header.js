import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const triggerMenu = () => {
    setOpen((x) => !x);
  };

  return (
    <div className="header">
      <h1>Gulod National Highschool</h1>
      <div className="header-menu-button" onClick={triggerMenu}>
        <div />
        <div />
        <div />
      </div>
      {open && (
        <div className="header-menu-container">
          <div className="bg" onClick={triggerMenu} />
          <div className="header-menu">
            <div className="header-menu-head">
              <div>
                <div className="close-button" onClick={triggerMenu}>
                  close
                </div>
              </div>
              <div>
                <div className="profile-pic"></div>
                <div>
                  <div className="name">Firstname Lastname</div>
                  <div className="email">example@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="header-menu-content">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/requests">Requests</Link>
              <Link to="/documents">Documents</Link>
            </div>
            <div className="header-menu-footer">
              <button
                className="logout"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
