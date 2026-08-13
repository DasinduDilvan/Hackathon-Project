
import React from "react";
import { Link } from 'react-router-dom';

function HowToTry() {
  return (
    <section id="tryit" className="cta-section">
      <span className="cta-label">YOUR FUTURE STARTS HERE</span>
      <h2 className="cta-heading">
        Your skills have value.<br />Let's unlock it.
      </h2>
      <p className="cta-text">
        Join thousands of students and businesses building the future of work together.
      </p>
      <Link to="/register" className="btn-primary">Create Your Free Profile →</Link>
    </section>
  );
}

export default HowToTry;