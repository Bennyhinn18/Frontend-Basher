import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import gem from '../assets/img/gem.svg';
import { fetchUserData } from '../api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdownMenu = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="header dashboard @@headerClass">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="Logo" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation"
                onClick={toggleMobileMenu}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav menu">
                  <li className="nav-item">
                    <Link className="nav-link" to="#About">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#affiliate">
                      Affiliates
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/leaderboard">
                      Leaderboards
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#support">
                      Support
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dashboard_log my-2">
                <div className="d-flex align-items-center">
                  <div className="account_money">
                    <ul>
                      <li className="crypto">
                        <span>{user ? user.points : 'Loading...'}</span>
                      </li>
                      <li className="usd">
                        <img src={gem} alt="Gem" />
                      </li>
                    </ul>
                  </div>
                  <div className="profile_log dropdown" ref={dropdownRef}>
                    <div className="user" onClick={toggleDropdownMenu}>
                      <span className="thumb"><i className="la la-user"></i></span>
                      <span className="name">{user ? user.username : 'Loading...'}</span>
                      <span className="arrow"><i className="la la-angle-down"></i></span>
                    </div>
                    <div className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}>
                      <Link className="dropdown-item" to="/profile" onClick={closeDropdownMenu}>
                        <i className="la la-user"></i>Profile
                      </Link>
                      <Link className="dropdown-item" to="/history" onClick={closeDropdownMenu}>
                        <i className="la la-book"></i>History
                      </Link>
                      <Link className="dropdown-item" to="#settings" onClick={closeDropdownMenu}>
                        <i className="la la-cog"></i>Settings
                      </Link>
                      <Link className="dropdown-item logout" to="#Logout" onClick={closeDropdownMenu}>
                        <i className="la la-sign-out"></i>Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
