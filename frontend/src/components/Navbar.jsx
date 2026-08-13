import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      {/* ── Logo ── */}
      <Link to="/" className="nav-logo">
        <span className="nav-logo-icon">S2E</span>
        <span className="nav-logo-text">Skill2Earn</span>
      </Link>

      {/* ── Nav Links ── */}
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/learning" className="nav-link">Learning</Link>
        <Link to="/opportunities" className="nav-link">Oppertunities</Link>
        <Link to="/onboarding" className="nav-link">How Try It</Link>
      </div>

      {/* ── Auth Buttons ── */}
      <div className="nav-auth">
        {user ? (
          <>
            <Link to="/profile" className="nav-profile-btn">
              <span className="nav-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </span>
              <span className="nav-username">
                {user.name || user.email}
              </span>
            </Link>

            {/* ── SIGN OUT BUTTON ── */}
            <button
              onClick={handleSignOut}
              className="nav-signout-btn"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/register" className="nav-register-btn">
              Get Started →
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}