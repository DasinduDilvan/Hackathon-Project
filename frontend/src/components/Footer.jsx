import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">
              <span style={{ color: '#2b8b76' }}>S</span> Skill2Earn
            </h3>
            <p className="footer-desc">
              Helping university students turn skills into careers.
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Platform</h4>
            <a href="/learning" className="footer-link">Courses</a>
            <a href="/opportunities" className="footer-link">Opportunities</a>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <a href="/" className="footer-link">About</a>
            <a href="/" className="footer-link">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SKILL2EARN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}