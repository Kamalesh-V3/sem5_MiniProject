import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout, isArtist, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg sticky-top custom-navbar py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="fs-3">🎨</span>
          <span className="fw-bold fs-4 tracking-wide gradient-text-gold font-serif">
            Canvas<span className="text-white">Craft</span>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler text-white border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-2 text-white"></i>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-lg-1">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${isActive('/') ? 'text-warning fw-bold' : 'text-light'}`}
                to="/"
              >
                <i className="bi bi-house me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${isActive('/gallery') ? 'text-warning fw-bold' : 'text-light'}`}
                to="/gallery"
              >
                <i className="bi bi-grid-3x3-gap me-1"></i> Explore Gallery
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link px-3 text-light"
                href="/#founders-corner"
              >
                <i className="bi bi-people me-1"></i> Founders
              </a>
            </li>
          </ul>

          {/* Right Action / Auth Buttons */}
          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Post Art Button for Any Customer/Artist */}
                <Link to="/post-art" className="btn btn-outline-gold btn-sm d-flex align-items-center gap-1">
                  <i className="bi bi-plus-circle"></i>
                  <span>Post Art</span>
                </Link>

                {/* Role-Specific Shortcuts */}
                {isAdmin && (
                  <Link to="/admin/dashboard" className="btn btn-sm btn-danger d-flex align-items-center gap-1 shadow-sm">
                    <i className="bi bi-shield-lock"></i>
                    <span>Admin Panel</span>
                  </Link>
                )}

                {isArtist && !isAdmin && (
                  <Link to="/artist/dashboard" className="btn btn-sm btn-primary d-flex align-items-center gap-1">
                    <i className="bi bi-palette"></i>
                    <span>Artist Studio</span>
                  </Link>
                )}

                {!isArtist && !isAdmin && (
                  <Link to="/customer/dashboard" className="btn btn-sm btn-glass d-flex align-items-center gap-1">
                    <i className="bi bi-bag-check"></i>
                    <span>My Orders</span>
                  </Link>
                )}

                {/* User Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-glass d-flex align-items-center gap-2 dropdown-toggle py-1 px-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user.avatar && !String(user.avatar).startsWith('http') ? user.avatar : '/images/Profile image/profile-placeholder.svg'}
                      alt={user.username}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                    <span className="small fw-semibold d-none d-md-inline">{user.username}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow-lg" style={{ background: '#171c2f', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <li className="px-3 py-2 border-bottom border-secondary">
                      <div className="fw-bold">{user.username}</div>
                      <div className="text-secondary small">{user.email}</div>
                      <div className="mt-1">
                        <span className={`badge ${isAdmin ? 'bg-danger' : isArtist ? 'bg-primary' : 'bg-secondary'}`}>
                          {user.role.toUpperCase()}
                        </span>
                      </div>
                    </li>
                    {isArtist && (
                      <li>
                        <Link className="dropdown-menu-item text-light d-block px-3 py-2 text-decoration-none" to="/artist/dashboard">
                          <i className="bi bi-speedometer2 me-2 text-warning"></i> Artist Dashboard
                        </Link>
                      </li>
                    )}
                    {isAdmin && (
                      <li>
                        <Link className="dropdown-menu-item text-light d-block px-3 py-2 text-decoration-none" to="/admin/dashboard">
                          <i className="bi bi-shield-check me-2 text-danger"></i> Admin Dashboard
                        </Link>
                      </li>
                    )}
                    {!isArtist && !isAdmin && <li>
                      <Link className="dropdown-menu-item text-light d-block px-3 py-2 text-decoration-none" to="/customer/dashboard">
                        <i className="bi bi-box-seam me-2 text-success"></i> My Orders & Status
                      </Link>
                    </li>}
                    <li><hr className="dropdown-divider border-secondary" /></li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-box-arrow-right"></i> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="btn btn-glass btn-sm px-3">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-gold btn-sm px-3">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
