import React from "react";
import { useContext } from "react";

import UserContext from "../../context/userContext";
import auth from "../../services/authService";

function NavBar() {
  const user = useContext(UserContext);
  const handleLogOut = () => {
    auth.logout();
    window.location = "/";
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <button className="btn" id="menu-toggle">
        <i className="fas fa-angle-double-left"></i>
      </button>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              href="http://abc.com"
              id="navAccount"
              role="button"
            >
              {user && user.name}
            </a>
          </li>
          <li>
            <button className="btn btnLogout" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
