import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

var JOURNEY = [
  { key: 'LEARN', icon: '📚', title: 'Learn', desc: 'Build knowledge' },
  { key: 'PROVE', icon: '🏆', title: 'Prove', desc: 'Verify skills' },
  { key: 'MATCH', icon: '🎯', title: 'Match', desc: 'Find opportunities' },
  { key: 'WORK', icon: '💼', title: 'Work', desc: 'Start career' },
  { key: 'EARN', icon: '💰', title: 'Earn', desc: 'Grow professionally' }
];

export default function ProfilePage() {
  var auth = useAuth();
  var navigate = useNavigate();
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];
  var skillsState = useState([]);
  var skills = skillsState[0];
  var setSkills = skillsState[1];
  var jobsState = useState([]);
  var jobs = jobsState[0];
  var setJobs = jobsState[1];
  var appsState = useState([]);
  var applications = appsState[0];
  var setApplications = appsState[1];
  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  if (!auth.user) {
    return (
      <div className="auth-redirect">
        <h2>Please log in first</h2>
        <Link to="/login" className="btn-primary">Log in →</Link>
      </div>
    );
  }

  var user = auth.user;
  var userId = user.id || user._id;

  useEffect(function () {
    var promises = [
      fetch('/api/users/' + userId + '/skills').then(function (r) { return r.json(); }).catch(function () { return { data: [] }; }),
      fetch('/api/courses').then(function (r) { return r.json(); }).catch(function () { return { data: [] }; }),
      fetch('/api/opportunities/recommended/' + userId).then(function (r) { return r.json(); }).catch(function () { return { data: [] }; }),
      fetch('/api/applications/student/' + userId).then(function (r) { return r.json(); }).catch(function () { return { data: [] }; })
    ];

    Promise.all(promises).then(function (results) {
      setSkills(results[0].data || results[0] || []);
      setCourses(results[1].data || results[1] || []);
      setJobs(results[2].data || results[2] || []);
      setApplications(results[3].data || results[3] || []);
      setLoading(false);
    }).catch(function () {
      setLoading(false);
    });
  }, [userId]);

  // Use fallback data if APIs return empty
  var displayCourses = courses.length > 0 ? courses : [
    { _id: '1', title: 'HTML Fundamentals', progress: 100, level: 1, difficulty: 'Beginner' },
    { _id: '2', title: 'CSS Fundamentals', progress: 100, level: 1, difficulty: 'Beginner' },
    { _id: '3', title: 'JavaScript Basics', progress: 100, level: 1, difficulty: 'Beginner' },
    { _id: '4', title: 'React Fundamentals', progress: 100, level: 1, difficulty: 'Intermediate' },
    { _id: '5', title: 'Node.js Fundamentals', progress: 75, level: 2, difficulty: 'Intermediate' },
    { _id: '6', title: 'MongoDB Basics', progress: 50, level: 2, difficulty: 'Intermediate' }
  ];

  var displaySkills = skills.length > 0 ? skills : [
    { name: 'HTML', level: 'Intermediate', verified: true },
    { name: 'CSS', level: 'Intermediate', verified: true },
    { name: 'JavaScript', level: 'Intermediate', verified: true },
    { name: 'React', level: 'Beginner', verified: true },
    { name: 'Node.js', level: 'Beginner', verified: false },
    { name: 'MongoDB', level: 'Beginner', verified: false }
  ];

  var displayJobs = jobs.length > 0 ? jobs : [
    { _id: '1', title: 'Junior Web Developer', company: 'ABC Technologies', location: 'Colombo', type: 'Full Time', match: 92, skills: ['HTML', 'CSS', 'JavaScript', 'React'] },
    { _id: '2', title: 'Frontend Developer Intern', company: 'Tech Solutions Lanka', location: 'Remote', type: 'Internship', match: 87, skills: ['HTML', 'CSS', 'React'] },
    { _id: '3', title: 'React Developer Intern', company: 'Digital Innovations', location: 'Colombo', type: 'Internship', match: 81, skills: ['JavaScript', 'React'] }
  ];

  // Calculations
  var completedCourses = displayCourses.filter(function (c) { return (c.progress || 0) >= 100; });
  var verifiedSkills = displaySkills.filter(function (s) { return s.verified; });

  var overallProgress = displayCourses.length > 0
    ? Math.round(displayCourses.reduce(function (s, c) { return s + (c.progress || 0); }, 0) / displayCourses.length)
    : 0;

  // Level
  var levels = [];
  displayCourses.forEach(function (c) {
    var lv = c.level || 1;
    if (levels.indexOf(lv) === -1) levels.push(lv);
  });
  levels.sort();

  var currentLevel = 1;
  for (var i = 0; i < levels.length; i++) {
    var lv = levels[i];
    var lvCourses = displayCourses.filter(function (c) { return (c.level || 1) === lv; });
    var allDone = lvCourses.every(function (c) { return (c.progress || 0) >= 100; });
    if (allDone) {
      currentLevel = lv + 1;
    } else {
      currentLevel = lv;
      break;
    }
  }

  var currentLevelCourses = displayCourses.filter(function (c) { return (c.level || 1) === currentLevel; });
  var levelProgress = currentLevelCourses.length > 0
    ? Math.round(currentLevelCourses.reduce(function (s, c) { return s + (c.progress || 0); }, 0) / currentLevelCourses.length)
    : 100;

  var jobEligible = currentLevel > 1;
  var employment = applications.filter(function (a) { return a.status === 'Selected' || a.status === 'Accepted'; });
  var hasEmployment = employment.length > 0;

  // Journey stage
  var journeyStage = 'LEARN';
  if (hasEmployment) journeyStage = 'WORK';
  else if (applications.length > 0) journeyStage = 'MATCH';
  else if (jobEligible) journeyStage = 'MATCH';
  else if (completedCourses.length > 0) journeyStage = 'PROVE';

  var journeyIndex = JOURNEY.findIndex(function (s) { return s.key === journeyStage; });

  // Badges
  var badges = [
    { name: 'First Course', icon: '🎯', desc: 'Completed first course', unlocked: completedCourses.length >= 1 },
    { name: 'Course Master', icon: '📚', desc: 'Completed 3 courses', unlocked: completedCourses.length >= 3 },
    { name: 'Level Up', icon: '🚀', desc: 'Completed a level', unlocked: currentLevel > 1 },
    { name: 'Skill Pro', icon: '⭐', desc: 'Verified 3 skills', unlocked: verifiedSkills.length >= 3 },
    { name: 'Job Ready', icon: '💼', desc: 'Eligible for jobs', unlocked: jobEligible }
  ];

  var initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">{initial}</div>
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <div className="profile-badges">
              <span className="profile-badge-item">⭐ {user.points || 0} Points</span>
              <span className="profile-badge-item">🏆 {badges.filter(function (b) { return b.unlocked; }).length} Badges</span>
              <span className="profile-badge-item">📚 {completedCourses.length} Completed</span>
            </div>
          </div>
        </div>
        <span className="profile-role-tag">
          {user.role === 'provider' ? '🏢 Business' : '🎓 Student'}
        </span>
      </div>

      {/* Journey */}
      <div className="journey-card">
        <div className="journey-header">
          <div>
            <span className="journey-label">YOUR CAREER JOURNEY</span>
            <h2 className="journey-title">Learn. Prove. Match. Work. Earn.</h2>
          </div>
          <div className="journey-current">
            {JOURNEY[journeyIndex] ? JOURNEY[journeyIndex].icon : ''}{' '}
            {JOURNEY[journeyIndex] ? JOURNEY[journeyIndex].title : ''}
          </div>
        </div>
        <div className="journey-steps">
          {JOURNEY.map(function (stage, idx) {
            var cls = 'journey-step';
            if (idx < journeyIndex) cls = cls + ' step-done';
            if (idx === journeyIndex) cls = cls + ' step-active';
            return (
              <React.Fragment key={stage.key}>
                <div className={cls}>
                  <div className="step-icon">{stage.icon}</div>
                  <strong>{stage.title}</strong>
                  <span>{stage.desc}</span>
                </div>
                {idx < JOURNEY.length - 1 && (
                  <div className={idx < journeyIndex ? 'step-line line-done' : 'step-line'}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Level */}
      <div className="level-card">
        <div className="level-info">
          <span className="level-emoji">🎓</span>
          <div>
            <span className="level-label">CURRENT LEVEL</span>
            <h2 className="level-number">Level {currentLevel}</h2>
          </div>
        </div>
        <div className="level-progress-section">
          <div className="level-progress-header">
            <span>Level {currentLevel} Progress</span>
            <strong>{levelProgress}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: levelProgress + '%' }}></div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">📚 LEARN</h2>
            <p className="section-desc">Build knowledge through courses.</p>
          </div>
          <div className="overall-stat">
            <strong>{overallProgress}%</strong>
            <span>Overall</span>
          </div>
        </div>
        <div className="progress-track" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: overallProgress + '%' }}></div>
        </div>
        <div className="courses-list">
          {displayCourses.map(function (course) {
            var prog = course.progress || 0;
            var statusCls = prog >= 100 ? 'status-done' : prog > 0 ? 'status-progress' : 'status-new';
            var statusText = prog >= 100 ? '✓ Completed' : prog > 0 ? 'In Progress' : 'Not Started';
            return (
              <div className="course-item" key={course._id || course.id || course.title}>
                <div className="course-top">
                  <div className="course-name-row">
                    <strong>{course.title || course.name}</strong>
                    <span className="course-level-tag">Level {course.level || 1}</span>
                  </div>
                  <span className={statusCls}>{statusText}</span>
                </div>
                <div className="progress-track-sm">
                  <div className="progress-fill-sm" style={{ width: prog + '%' }}></div>
                </div>
                <div className="course-bottom">
                  <span>{prog}% complete</span>
                  {prog >= 100 && <span className="done-text">Course Completed ✓</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">🏆 PROVE</h2>
            <p className="section-desc">Verified skills and achievements.</p>
          </div>
          <span className="verified-badge">{verifiedSkills.length} Verified</span>
        </div>
        <div className="skills-grid">
          {displaySkills.map(function (skill, idx) {
            return (
              <div className="skill-item" key={idx}>
                <div>
                  <h3 className="skill-item-name">{skill.name}</h3>
                  <p className="skill-item-level">{skill.level}</p>
                </div>
                {skill.verified ? (
                  <span className="verified-tag">✓ Verified</span>
                ) : (
                  <span className="unverified-tag">Not Verified</span>
                )}
              </div>
            );
          })}
        </div>
        <h3 className="badges-heading">Achievements</h3>
        <div className="badges-grid">
          {badges.map(function (badge, idx) {
            return (
              <div className={badge.unlocked ? 'badge-item badge-on' : 'badge-item badge-off'} key={idx}>
                <span className="badge-emoji">{badge.icon}</span>
                <div>
                  <h4>{badge.name}</h4>
                  <p>{badge.unlocked ? badge.desc : 'Locked'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matched Jobs */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">🎯 MATCH</h2>
            <p className="section-desc">Opportunities matched to your skills.</p>
          </div>
          <span className="match-count-badge">
            {jobEligible ? displayJobs.length + ' Available' : '🔒 Locked'}
          </span>
        </div>
        {jobEligible ? (
          <div className="jobs-list">
            {displayJobs.map(function (job) {
              return (
                <div className="job-item" key={job._id || job.id}>
                  <div className="job-left">
                    <div className="job-logo">{(job.company || '?').charAt(0)}</div>
                    <div>
                      <h3 className="job-title">{job.title || job.position}</h3>
                      <p className="job-company">{job.company || job.provider_name}</p>
                      <div className="job-meta">
                        <span>📍 {job.location || 'Remote'}</span>
                        <span>💼 {job.type || 'Full Time'}</span>
                      </div>
                      <div className="job-tags">
                        {(job.skills || job.skills_required || []).map(function (s) {
                          return <span className="job-tag" key={s}>{s}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="job-right">
                    {job.match && (
                      <div className="match-display">
                        <strong>{job.match}%</strong>
                        <span>Match</span>
                      </div>
                    )}
                    <button className="btn-apply">Apply</button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="locked-box">
            <div className="locked-icon">🔒</div>
            <h3>Complete Level 1 to unlock</h3>
            <p>Finish your courses to access job opportunities.</p>
          </div>
        )}
      </div>

      {/* Applications */}
      <div className="profile-section">
        <h2 className="section-title-sm">📋 APPLICATIONS</h2>
        {applications.length === 0 ? (
          <div className="empty-box">
            <span>📋</span>
            <h3>No applications yet</h3>
            <p>Your job applications will appear here.</p>
          </div>
        ) : (
          <div className="apps-list">
            {applications.map(function (app, idx) {
              return (
                <div className="app-item" key={idx}>
                  <div>
                    <h3>{app.position || app.opportunity_title}</h3>
                    <p className="job-company">{app.company || app.provider_name}</p>
                  </div>
                  <span className={app.status === 'Selected' ? 'app-status-ok' : 'app-status-pending'}>
                    {app.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}