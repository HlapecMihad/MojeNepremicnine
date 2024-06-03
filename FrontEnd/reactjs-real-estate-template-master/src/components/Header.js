import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ComparisonContext } from "../other/ComparisonContext";
import UporabnikDropdown from './UporabnikDropdown';

const Header = () => {
  const { comparisonList } = useContext(ComparisonContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <div className="d-flex align-items-center">
                <i className="fas fa-home"></i>
                <span className="ms-2">Moje Nepremičnine</span>
              </div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/primerjanje">
                    Primerjanje
                    {comparisonList.length > 0 && (
                      <span
                        className="badge bg-secondary ms-1"
                        style={{ verticalAlign: "middle" }}
                      >
                        {comparisonList.length}
                      </span>
                    )}
                  </Link>
                </li>
                {user ? (
                  <li className="nav-item">
                    <UporabnikDropdown user={user} handleLogout={handleLogout} />
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/prijava">
                        Prijava
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;