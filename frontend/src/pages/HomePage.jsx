import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HowToTry from '../components/HowToTry.jsx';
import { useAuth } from '../context/AuthContext';

var SKILLS = [
  { name: 'Programming', courses: '120+', icon: '💻' },
  { name: 'UI/UX Design', courses: '85+', icon: '🎨' },
  { name: 'Data & AI', courses: '95+', icon: '📊' },
  { name: 'Digital Marketing', courses: '70+', icon: '📈' },
  { name: 'Content Writing', courses: '60+', icon: '✍️' },
  { name: 'Video & Media', courses: '55+', icon: '🎬' }
];

var SAMPLE_JOBS = [
  { id: 1, title: 'Frontend Developer', company: 'TechCore Solutions', type: 'PART-TIME', location: 'REMOTE', salary: 'LKR 150k - 240k', match: 92, skills: ['React', 'JavaScript', 'CSS'] },
  { id: 2, title: 'UI/UX Designer', company: 'Design Studio', type: 'FREELANCE', location: 'REMOTE', salary: 'LKR 100k - 180k', match: 87, skills: ['Figma', 'UI Design', 'UX'] },
  { id: 3, title: 'Digital Marketing Intern', company: 'MarketAce', type: 'INTERNSHIP', location: 'HYBRID', salary: 'LKR 75k - 120k', match: 81, skills: ['SEO', 'Social Media', 'Analytics'] }
];

var STEPS = [
  { step: '01', title: 'Learn', desc: 'Develop valuable skills through structured courses and learning paths.' },
  { step: '02', title: 'Build Skills', desc: 'Build your profile, earn certificates, collect badges and grow your reputation.' },
  { step: '03', title: 'Get Matched', desc: 'Our skill matching system helps you discover opportunities that fit you.' },
  { step: '04', title: 'Earn', desc: 'Work with businesses, complete projects and turn your skills into income.' }
];

export default function HomePage() {
  var auth = useAuth();

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✦ Practical learning. Real momentum.</div>
          <h1 className="hero-title">
            Your next skill <br />
            <span className="text-teal">can change everything.</span>
          </h1>
          <p className="hero-text">
            Skill2Earn helps university students turn focused learning into proof,
            paid opportunities, and a career that keeps moving.
          </p>
          <div className="hero-buttons">
            {auth.user ? (
              <React.Fragment>
                <Link to="/profile" className="btn-primary">Go to Profile →</Link>
                <Link to="/learning" className="btn-outline">Browse Courses</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link to="/register" className="btn-primary">Start building →</Link>
                <Link to="/opportunities" className="btn-outline">Browse opportunities</Link>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="float-card-main">
            <div className="float-card-header">
              <strong>Your momentum</strong>
              <span>⚡</span>
            </div>
            <div className="momentum-box">
              <span className="momentum-label">THIS WEEK</span>
              <h2 className="momentum-value">+240 XP</h2>
              <div className="momentum-bar">
                <div className="momentum-fill"></div>
              </div>
            </div>
          </div>

          <div className="float-card-dark">
            <p className="match-label">Best match today</p>
            <h3 className="match-title">Frontend project</h3>
            <div className="match-footer">
              <span className="match-company">Northstar Labs</span>
              <span className="match-percent">92%</span>
            </div>
          </div>

          <div className="float-card-orange">Work that counts.</div>
        </div>
      </section>

      <div className="home-sections">
        {/* Stats */}
        <section className="stats-bar">
          <div className="stat">
            <h3>10K+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat">
            <h3>2.5K+</h3>
            <p>Opportunities</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Businesses</p>
          </div>
          <div className="stat">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </section>

        {/* How It Works */}
        <section className="section" id="how-it-works">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="section-heading">From learning to earning.</h2>
          <div className="grid-4">
            {STEPS.map(function (item) {
              return (
                <div className="card" key={item.step}>
                  <div className="card-step">{item.step}</div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore Skills */}
        <section className="section skills-section">
          <span className="section-label">EXPLORE SKILLS</span>
          <h2 className="section-heading">Learn what the world needs.</h2>
          <div className="grid-3">
            {SKILLS.map(function (skill) {
              return (
                <Link to="/learning" className="skill-card" key={skill.name}>
                  <div>
                    <span className="skill-icon">{skill.icon}</span>
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-courses">{skill.courses} Courses</p>
                  </div>
                  <span className="skill-arrow">→</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Opportunities Preview */}
        <section className="section">
          <span className="section-label">OPPORTUNITIES</span>
          <h2 className="section-heading">Find work that fits your skills.</h2>
          <div className="grid-3">
            {SAMPLE_JOBS.map(function (job) {
              return (
                <div className="opp-card" key={job.id}>
                  <div>
                    <span className="opp-type">{job.type} • {job.location}</span>
                    <h3 className="opp-title">{job.title}</h3>
                    <p className="opp-company">{job.company}</p>
                    <div className="opp-skills">
                      {job.skills.map(function (s) {
                        return <span className="opp-tag" key={s}>{s}</span>;
                      })}
                    </div>
                  </div>
                  <div className="opp-footer">
                    <strong>{job.salary}</strong>
                    <span className="opp-match">{job.match}% Match</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* CTA */}
      <HowToTry />
    </div>
  );
}