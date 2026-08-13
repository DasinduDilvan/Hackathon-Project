import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

var TYPES = ['All', 'Full-Time', 'Part-Time', 'Freelance', 'Internship'];
var LOCATIONS = ['All', 'Remote', 'On-site', 'Hybrid'];

var FALLBACK = [
  { id: 1, title: 'Frontend Developer', company: 'TechCore Solutions', location: 'Colombo', type: 'Part-Time', locationType: 'Remote', salary: 'LKR 150k - 240k', match: 92, skills: ['React', 'JavaScript', 'CSS'], desc: 'Build modern web interfaces.', posted: '2 days ago' },
  { id: 2, title: 'UI/UX Designer', company: 'Design Studio', location: 'Colombo', type: 'Freelance', locationType: 'Remote', salary: 'LKR 100k - 180k', match: 87, skills: ['Figma', 'UI Design', 'UX'], desc: 'Design user-friendly interfaces.', posted: '3 days ago' },
  { id: 3, title: 'Digital Marketing Intern', company: 'MarketAce', location: 'Kandy', type: 'Internship', locationType: 'Hybrid', salary: 'LKR 75k - 120k', match: 81, skills: ['SEO', 'Social Media', 'Analytics'], desc: 'Manage digital marketing campaigns.', posted: '5 days ago' },
  { id: 4, title: 'Backend Developer', company: 'CloudNine Tech', location: 'Colombo', type: 'Full-Time', locationType: 'On-site', salary: 'LKR 200k - 350k', match: 78, skills: ['Node.js', 'MongoDB', 'REST API'], desc: 'Build scalable backend systems.', posted: '1 day ago' },
  { id: 5, title: 'Content Writer', company: 'ContentFlow', location: 'Remote', type: 'Freelance', locationType: 'Remote', salary: 'LKR 50k - 90k', match: 74, skills: ['Writing', 'SEO', 'Research'], desc: 'Create engaging web content.', posted: '4 days ago' },
  { id: 6, title: 'Data Analyst Intern', company: 'DataWorks Lanka', location: 'Colombo', type: 'Internship', locationType: 'Hybrid', salary: 'LKR 80k - 130k', match: 70, skills: ['Python', 'SQL', 'Excel'], desc: 'Analyze datasets for insights.', posted: '6 days ago' }
];

export default function OpportunitiesPage() {
  var auth = useAuth();
  var navigate = useNavigate();
  var oppsState = useState([]);
  var opps = oppsState[0];
  var setOpps = oppsState[1];
  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];
  var typeState = useState('All');
  var typeFilter = typeState[0];
  var setTypeFilter = typeState[1];
  var locState = useState('All');
  var locFilter = locState[0];
  var setLocFilter = locState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  useEffect(function () {
    fetch('/api/opportunities')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var list = data.data || data || [];
        setOpps(list.length > 0 ? list : FALLBACK);
        setLoading(false);
      })
      .catch(function () {
        setOpps(FALLBACK);
        setLoading(false);
      });
  }, []);

  var filtered = opps.filter(function (o) {
    var title = (o.title || '').toLowerCase();
    var company = (o.company || o.provider_name || '').toLowerCase();
    var skillsText = (o.skills || o.skills_required || []).join(' ').toLowerCase();
    var s = search.toLowerCase();
    var matchSearch = !search || title.indexOf(s) !== -1 || company.indexOf(s) !== -1 || skillsText.indexOf(s) !== -1;
    var oType = (o.type || o.employment_type || '').toLowerCase();
    var matchType = typeFilter === 'All' || oType.indexOf(typeFilter.toLowerCase()) !== -1;
    var oLoc = (o.locationType || o.location_type || '').toLowerCase();
    var matchLoc = locFilter === 'All' || oLoc.indexOf(locFilter.toLowerCase()) !== -1;
    return matchSearch && matchType && matchLoc;
  });

  function handleApply(id) {
    if (!auth.user) {
      navigate('/login');
      return;
    }
    alert('Application submitted!');
  }

  return (
    <div className="opp-page">
      <div className="opp-header">
        <span className="section-label">OPPORTUNITIES</span>
        <h1 className="opp-title">Find work that fits your skills.</h1>
        <p className="opp-subtitle">Browse opportunities matched to your level.</p>
      </div>

      <div className="learn-search">
        <span className="search-emoji">🔍</span>
        <input type="text" value={search} onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search by title, company, or skill..." className="search-field" />
        {search && <button onClick={function () { setSearch(''); }} className="search-clear-btn">✕</button>}
      </div>

      <div className="filter-section">
        <div className="filter-bar">
          <span className="filter-label-text">Type:</span>
          {TYPES.map(function (t) {
            return <button key={t} onClick={function () { setTypeFilter(t); }}
              className={typeFilter === t ? 'filter-chip filter-active' : 'filter-chip'}>{t}</button>;
          })}
        </div>
        <div className="filter-bar">
          <span className="filter-label-text">Location:</span>
          {LOCATIONS.map(function (l) {
            return <button key={l} onClick={function () { setLocFilter(l); }}
              className={locFilter === l ? 'filter-chip filter-active' : 'filter-chip'}>{l}</button>;
          })}
        </div>
      </div>

      <p className="results-text">{filtered.length} opportunities found</p>

      {loading ? (
        <div className="loading-box"><div className="spinner"></div><p>Loading...</p></div>
      ) : filtered.length === 0 ? (
        <div className="empty-box">
          <span>🔍</span><h3>No opportunities found</h3>
          <button onClick={function () { setSearch(''); setTypeFilter('All'); setLocFilter('All'); }} className="btn-outline">Clear filters</button>
        </div>
      ) : (
        <div className="opp-list">
          {filtered.map(function (o) {
            var id = o.id || o._id;
            var title = o.title || o.position;
            var company = o.company || o.provider_name;
            var skills = o.skills || o.skills_required || [];
            return (
              <div className="opp-list-card" key={id}>
                <div className="opp-list-top">
                  <div className="opp-list-badges">
                    {o.type && <span className="type-tag">{o.type}</span>}
                    {(o.locationType || o.location_type) && <span className="loc-tag">{o.locationType || o.location_type}</span>}
                  </div>
                  {o.match && (
                    <div className="match-box">
                      <strong>{o.match}%</strong>
                      <span>Match</span>
                    </div>
                  )}
                </div>
                <h3 className="opp-list-title">{title}</h3>
                <p className="opp-list-company">
                  <span className="company-dot">{(company || '?').charAt(0)}</span>
                  {company}
                </p>
                {o.desc && <p className="opp-list-desc">{o.desc}</p>}
                <div className="opp-list-skills">
                  {skills.map(function (s) { return <span className="opp-list-tag" key={s}>{s}</span>; })}
                </div>
                <div className="opp-list-footer">
                  <div className="opp-list-meta">
                    {o.salary && <span className="opp-salary">💰 {o.salary}</span>}
                    <span>📍 {o.location || 'Remote'}</span>
                    {o.posted && <span>🕐 {o.posted}</span>}
                  </div>
                  <button onClick={function () { handleApply(id); }} className="btn-apply">
                    {auth.user ? 'Apply Now →' : 'Sign in to Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}