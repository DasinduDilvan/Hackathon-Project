import React, { createContext, useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';

// =====================================================
// CONFIG
// =====================================================
const API = 'http://localhost:5000/api';



// =====================================================
// AUTH CONTEXT
// =====================================================
var AuthContext = createContext(null);

function AuthProvider(props) {
  var userState = useState(null);
  var user = userState[0];
  var setUser = userState[1];
  var loadState = useState(true);
  var loading = loadState[0];
  var setLoading = loadState[1];

  useEffect(function () {
    try {
      var saved = localStorage.getItem('s2e_user');
      if (saved && saved !== 'undefined') {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      localStorage.removeItem('s2e_user');
    }
    setLoading(false);
  }, []);

  function login(userData) {
    localStorage.setItem('s2e_user', JSON.stringify(userData));
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem('s2e_user');
    setUser(null);
  }

  // Update the stored user data (e.g. after earning points)
  function refreshUser(updatedData) {
    var merged = Object.assign({}, user, updatedData);
    localStorage.setItem('s2e_user', JSON.stringify(merged));
    setUser(merged);
  }

  var value = { user: user, loading: loading, login: login, logout: logout, refreshUser: refreshUser };
  return React.createElement(AuthContext.Provider, { value: value }, props.children);
}

function useAuth() {
  return useContext(AuthContext);
}

<Navbar/>

// =====================================================
// HOME PAGE
// =====================================================
function HomePage() {
  var auth = useAuth();

  // These are real opportunities loaded from DB for the preview section
  var oppsState = useState([]);
  var previewOpps = oppsState[0];
  var setPreviewOpps = oppsState[1];

  var statsState = useState(null);
  var platformStats = statsState[0];
  var setPlatformStats = statsState[1];

  useEffect(function () {
    // Load a few open opportunities for the homepage preview
    fetch(API + '/opportunities?status=open')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) {
          // Show only first 3
          setPreviewOpps(res.data.slice(0, 3));
        }
      })
      .catch(function () {
        // If API fails just show empty - homepage still works
      });

    // Load platform statistics
    fetch(API + '/admin/statistics')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) {
          setPlatformStats(res.data);
        }
      })
      .catch(function () {});
  }, []);

  var skills = [
    { name: 'Programming', courses: '120+', icon: '💻' },
    { name: 'UI/UX Design', courses: '85+', icon: '🎨' },
    { name: 'Data & AI', courses: '95+', icon: '📊' },
    { name: 'Digital Marketing', courses: '70+', icon: '📈' },
    { name: 'Content Writing', courses: '60+', icon: '✍️' },
    { name: 'Video & Media', courses: '55+', icon: '🎬' }
  ];

  var steps = [
    { step: '01', title: 'Learn', desc: 'Develop valuable skills through structured courses and learning paths.' },
    { step: '02', title: 'Build Skills', desc: 'Build your profile, earn certificates, collect badges and grow your reputation.' },
    { step: '03', title: 'Get Matched', desc: 'Our skill matching system helps you discover opportunities that fit you.' },
    { step: '04', title: 'Earn', desc: 'Work with businesses, complete projects and turn your skills into income.' }
  ];

  // Map opportunity type to display label
  function typeLabel(type) {
    var map = {
      'internship': 'INTERNSHIP',
      'part-time': 'PART-TIME',
      'freelance': 'FREELANCE',
      'project': 'PROJECT',
      'community-task': 'COMMUNITY'
    };
    return map[type] || type.toUpperCase();
  }

  return (
    <div>
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
        {/* Real stats from backend */}
        <section className="stats-bar">
          <div className="stat">
            <h3>{platformStats ? platformStats.totalStudents.toLocaleString() + '+' : '10K+'}</h3>
            <p>Active Students</p>
          </div>
          <div className="stat">
            <h3>{platformStats ? platformStats.totalOpportunities.toLocaleString() + '+' : '2.5K+'}</h3>
            <p>Opportunities</p>
          </div>
          <div className="stat">
            <h3>{platformStats ? platformStats.totalProviders.toLocaleString() + '+' : '500+'}</h3>
            <p>Businesses</p>
          </div>
          <div className="stat">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </section>

        <section className="section">
          <span className="section-label">HOW IT WORKS</span>
          <h2 className="section-heading">From learning to earning.</h2>
          <div className="grid-4">
            {steps.map(function (item) {
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

        <section className="section skills-section">
          <span className="section-label">EXPLORE SKILLS</span>
          <h2 className="section-heading">Learn what the world needs.</h2>
          <div className="grid-3">
            {skills.map(function (skill) {
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

        {/* Real opportunities from backend */}
        <section className="section">
          <span className="section-label">OPPORTUNITIES</span>
          <h2 className="section-heading">Find work that fits your skills.</h2>
          <div className="grid-3">
            {previewOpps.length === 0 ? (
              // Fallback skeleton cards while loading
              [1, 2, 3].map(function (n) {
                return (
                  <div className="opp-card" key={n} style={{ opacity: 0.5 }}>
                    <div>
                      <span className="opp-type">LOADING...</span>
                      <h3 className="opp-title">Loading opportunity...</h3>
                      <p className="opp-company">Please wait</p>
                    </div>
                  </div>
                );
              })
            ) : (
              previewOpps.map(function (opp) {
                return (
                  <div className="opp-card" key={opp._id}>
                    <div>
                      <span className="opp-type">
                        {typeLabel(opp.type)} {opp.remote ? '• REMOTE' : '• ON-SITE'}
                      </span>
                      <h3 className="opp-title">{opp.title}</h3>
                      <p className="opp-company">
                        {opp.provider ? opp.provider.name : 'Company'}
                      </p>
                      <div className="opp-skills">
                        {(opp.requiredSkills || []).slice(0, 3).map(function (s) {
                          return <span className="opp-tag" key={s}>{s}</span>;
                        })}
                      </div>
                    </div>
                    <div className="opp-footer">
                      <strong>{opp.payment}</strong>
                      <span className="opp-match">{opp.duration}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/opportunities" className="btn-outline">View All Opportunities →</Link>
          </div>
        </section>
      </div>

      <section className="cta-section">
        <span className="cta-label">YOUR FUTURE STARTS HERE</span>
        <h2 className="cta-heading">
          Your skills have value.<br />Let's unlock it.
        </h2>
        <p className="cta-text">
          Join thousands of students and businesses building the future of work together.
        </p>
        <Link to="/register" className="btn-primary">Create Your Free Profile →</Link>
      </section>
    </div>
  );
}

// =====================================================
// LOGIN PAGE
// =====================================================
function LoginPage() {
  var auth = useAuth();
  var navigate = useNavigate();
  var emailState = useState('');
  var email = emailState[0];
  var setEmail = emailState[1];
  var passState = useState('');
  var password = passState[0];
  var setPassword = passState[1];
  var errState = useState('');
  var error = errState[0];
  var setError = errState[1];
  var loadState = useState(false);
  var isLoading = loadState[0];
  var setIsLoading = loadState[1];

  if (auth.user) {
    return (
      <div className="auth-redirect">
        <h2>You are already logged in!</h2>
        <Link to="/profile" className="btn-primary">Go to Profile →</Link>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    fetch(API + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setError(res.data.message || 'Login failed');
          setIsLoading(false);
          return;
        }
        var u = res.data.data;
        if (!u || !u._id) {
          setError('No user data received');
          setIsLoading(false);
          return;
        }
        auth.login({
          id: u._id,
          _id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          points: u.points || 0,
          skills: u.skills || [],
          bio: u.bio || '',
          location: u.location || '',
          completedCourses: u.completedCourses || [],
          completedProjects: u.completedProjects || 0
        });
        navigate('/profile');
      })
      .catch(function () {
        setError('Cannot connect to server');
        setIsLoading(false);
      });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Log in to your Skill2Earn account</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={function (e) { setEmail(e.target.value); }}
              placeholder="you@example.com"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={function (e) { setPassword(e.target.value); }}
              placeholder="Your password"
              required
              className="form-input"
            />
          </div>
          <button type="submit" disabled={isLoading} className="auth-submit">
            {isLoading ? 'Logging in...' : 'Log in →'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register" className="auth-switch-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

// =====================================================
// REGISTER PAGE
// =====================================================
function RegisterPage() {
  var auth = useAuth();
  var navigate = useNavigate();
  var nameState = useState('');
  var name = nameState[0];
  var setName = nameState[1];
  var emailState = useState('');
  var email = emailState[0];
  var setEmail = emailState[1];
  var passState = useState('');
  var password = passState[0];
  var setPassword = passState[1];
  var roleState = useState('student');
  var role = roleState[0];
  var setRole = roleState[1];
  var errState = useState('');
  var error = errState[0];
  var setError = errState[1];
  var loadState = useState(false);
  var isLoading = loadState[0];
  var setIsLoading = loadState[1];

function logout() {
  setUser(null);
  localStorage.removeItem('authUser');
  localStorage.removeItem('onboardingDone');
}

  if (auth.user) {
    return (
      <div className="auth-redirect">
        <h2>You are already logged in!</h2>
        <Link to="/profile" className="btn-primary">Go to Profile →</Link>
        <button onClick={() => { auth.logout(); navigate('/'); }} style={{ padding: '20px 30px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '18px', marginTop: '10px' }}>Sign Out</button>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    fetch(API + '/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password, role: role })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setError(res.data.message || 'Registration failed');
          setIsLoading(false);
          return;
        }
        var u = res.data.data;
        if (!u || !u._id) {
          setError('Registered but no user data. Try logging in.');
          setIsLoading(false);
          return;
        }
        auth.login({
          id: u._id,
          _id: u._id,
          name: u.name || name,
          email: u.email || email,
          role: u.role || role,
          points: u.points || 0,
          skills: u.skills || [],
          bio: u.bio || '',
          location: u.location || '',
          completedCourses: u.completedCourses || [],
          completedProjects: u.completedProjects || 0
        });
        navigate('/profile');
      })
      .catch(function () {
        setError('Cannot connect to server');
        setIsLoading(false);
      });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Start your Skill2Earn journey</p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={function (e) { setName(e.target.value); }}
              placeholder="Jane Doe"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={function (e) { setEmail(e.target.value); }}
              placeholder="you@example.com"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={function (e) { setPassword(e.target.value); }}
              placeholder="At least 8 characters"
              required
              minLength={8}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <div className="role-buttons">
              <button
                type="button"
                onClick={function () { setRole('student'); }}
                className={role === 'student' ? 'role-btn role-active' : 'role-btn'}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={function () { setRole('provider'); }}
                className={role === 'provider' ? 'role-btn role-active' : 'role-btn'}
              >
                🏢 Business
              </button>
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="auth-submit">
            {isLoading ? 'Creating...' : 'Create Account →'}
          </button>
        </form>
        <p className="auth-switch">
          Have an account?{' '}
          <Link to="/login" className="auth-switch-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}

// =====================================================
// PROFILE ROUTER
// =====================================================
function ProfilePage() {
  var auth = useAuth();

  if (!auth.user) {
    return (
      <div className="auth-redirect">
        <h2>Please log in first</h2>
        <Link to="/login" className="btn-primary">Log in →</Link>
      </div>
    );
  }

  if (auth.user.role === 'provider') {
    return React.createElement(BusinessProfile, { user: auth.user, auth: auth });
  }
  return React.createElement(StudentProfile, { user: auth.user, auth: auth });
}

// =====================================================
// STUDENT PROFILE  — fully connected to real API
// =====================================================
function StudentProfile(props) {
  var user = props.user;
  var auth = props.auth;

  // ── State ──────────────────────────────────────────
  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];

  var statsState = useState(null);
  var stats = statsState[0];
  var setStats = statsState[1];

  var appsState = useState([]);
  var applications = appsState[0];
  var setApplications = appsState[1];

  var recommendedState = useState([]);
  var recommended = recommendedState[0];
  var setRecommended = recommendedState[1];

  var achievementsState = useState([]);
  var achievements = achievementsState[0];
  var setAchievements = achievementsState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  var msgState = useState('');
  var message = msgState[0];
  var setMessage = msgState[1];

  var errState = useState('');
  var pageError = errState[0];
  var setPageError = errState[1];

  var studentId = user._id || user.id;

  // ── Load everything on mount ───────────────────────
  useEffect(function () {
    if (!studentId) return;
    loadAll();
  }, [studentId]);

  function loadAll() {
    setLoading(true);

    var p1 = fetch(API + '/courses')
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res.data) setCourses(res.data); });

    var p2 = fetch(API + '/users/' + studentId + '/statistics')
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res.data) setStats(res.data); });

    var p3 = fetch(API + '/applications/student/' + studentId)
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res.data) setApplications(res.data); });

    var p4 = fetch(API + '/opportunities/recommended/' + studentId)
      .then(function (r) { return r.json(); })
      .then(function (res) { if (res.data) setRecommended(res.data); });

    Promise.all([p1, p2, p3, p4])
      .catch(function (err) {
        setPageError('Failed to load some data. Please refresh.');
        console.error(err);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  // ── Complete a course ──────────────────────────────
  function handleCompleteCourse(courseId) {
    fetch(API + '/courses/' + courseId + '/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: studentId })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage(res.data.message || 'Could not complete course');
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        // Update auth context with new points/skills
        var updated = res.data.data.student;
        auth.refreshUser({
          points: updated.points,
          skills: updated.skills,
          completedCourses: updated.completedCourses,
          completedProjects: updated.completedProjects
        });
        setMessage('🎉 ' + res.data.message);
        setTimeout(function () { setMessage(''); }, 3000);
        // Reload all data to reflect changes
        loadAll();
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  // ── Apply to an opportunity ────────────────────────
  function handleApply(opportunityId, coverMessage) {
    fetch(API + '/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student: studentId,
        opportunity: opportunityId,
        coverMessage: coverMessage || 'I am interested in this opportunity.'
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage(res.data.message || 'Could not apply');
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        setMessage('✅ Application submitted successfully!');
        setTimeout(function () { setMessage(''); }, 3000);
        // Reload applications
        fetch(API + '/applications/student/' + studentId)
          .then(function (r) { return r.json(); })
          .then(function (r2) { if (r2.data) setApplications(r2.data); });
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  // ── Derived values ─────────────────────────────────
  var userSkills = auth.user.skills || [];
  var userCompletedIds = (auth.user.completedCourses || []).map(function (id) {
    return id.toString ? id.toString() : id;
  });
  var userPoints = auth.user.points || 0;
  var userCompletedProjects = auth.user.completedProjects || 0;

  var completedCount = userCompletedIds.length;
  var totalCourses = courses.length;
  var overallProgress = totalCourses > 0
    ? Math.round((completedCount / totalCourses) * 100)
    : 0;

  // Simple level system: every 2 completed courses = next level
  var currentLevel = Math.floor(completedCount / 2) + 1;
  var jobEligible = completedCount >= 2;

  // Journey logic
  var journeyStages = [
    { key: 'LEARN', icon: '📚', title: 'Learn', desc: 'Build knowledge' },
    { key: 'PROVE', icon: '🏆', title: 'Prove', desc: 'Verify skills' },
    { key: 'MATCH', icon: '🎯', title: 'Match', desc: 'Find opportunities' },
    { key: 'WORK', icon: '💼', title: 'Work', desc: 'Start career' },
    { key: 'EARN', icon: '💰', title: 'Earn', desc: 'Grow professionally' }
  ];

  var journeyStage = 'LEARN';
  if (completedCount >= 1 && !jobEligible) { journeyStage = 'PROVE'; }
  if (jobEligible && applications.length === 0) { journeyStage = 'MATCH'; }
  if (applications.some(function (a) { return a.status === 'accepted'; })) { journeyStage = 'WORK'; }
  if (applications.some(function (a) { return a.status === 'completed'; })) { journeyStage = 'EARN'; }
  var journeyIndex = journeyStages.findIndex(function (s) { return s.key === journeyStage; });

  // Dynamic badges based on real data
  var badges = [
    { name: 'First Course', icon: '🎯', desc: 'Completed first course', unlocked: completedCount >= 1 },
    { name: 'Course Master', icon: '📚', desc: 'Completed 3 courses', unlocked: completedCount >= 3 },
    { name: 'Level Up', icon: '🚀', desc: 'Reached Level 2', unlocked: currentLevel >= 2 },
    { name: 'Skill Pro', icon: '⭐', desc: 'Earned 3+ skills', unlocked: userSkills.length >= 3 },
    { name: 'Job Ready', icon: '💼', desc: 'Eligible for jobs', unlocked: jobEligible },
    { name: 'First Apply', icon: '📨', desc: 'Submitted an application', unlocked: applications.length >= 1 },
    { name: 'Project Done', icon: '✅', desc: 'Completed a project', unlocked: userCompletedProjects >= 1 },
    { name: 'Point Earner', icon: '💰', desc: 'Earned 500+ points', unlocked: userPoints >= 500 }
  ];

  var unlockedBadgeCount = badges.filter(function (b) { return b.unlocked; }).length;

  var initial = user.name ? user.name.charAt(0).toUpperCase() : '?';

  // ── Apply modal state ──────────────────────────────
  var modalState = useState(null);
  var applyModal = modalState[0];
  var setApplyModal = modalState[1];

  var coverState = useState('');
  var coverMessage = coverState[0];
  var setCoverMessage = coverState[1];

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* Flash message */}
      {message && (
        <div style={{
          position: 'fixed', top: '80px', right: '20px', zIndex: 9999,
          background: message.startsWith('🎉') || message.startsWith('✅') ? '#ecfdf5' : '#fef2f2',
          color: message.startsWith('🎉') || message.startsWith('✅') ? '#065f46' : '#991b1b',
          border: '1px solid currentColor', borderRadius: '0.75rem',
          padding: '1rem 1.5rem', fontWeight: 600, boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '350px'
        }}>
          {message}
        </div>
      )}

      {pageError && (
        <div style={{ background: '#fef2f2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {pageError}
        </div>
      )}

      {/* Apply Modal */}
      {applyModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '2rem',
            width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Apply: {applyModal.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {applyModal.provider ? applyModal.provider.name : ''} • {applyModal.payment}
            </p>
            <div className="form-group">
              <label className="form-label">Cover Message</label>
              <textarea
                value={coverMessage}
                onChange={function (e) { setCoverMessage(e.target.value); }}
                placeholder="Tell them why you are a great fit..."
                style={{
                  width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                  borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                  minHeight: '120px', resize: 'vertical', boxSizing: 'border-box', outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={function () {
                  handleApply(applyModal._id, coverMessage);
                  setApplyModal(null);
                  setCoverMessage('');
                }}
                className="biz-primary-btn"
                style={{ flex: 1 }}
              >
                Submit Application →
              </button>
              <button
                onClick={function () { setApplyModal(null); setCoverMessage(''); }}
                className="biz-outline-btn"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">{initial}</div>
          <div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            {user.location && (
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                📍 {user.location}
              </p>
            )}
            {user.bio && (
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.25rem', maxWidth: '400px' }}>
                {user.bio}
              </p>
            )}
            <div className="profile-badges">
              <span className="profile-badge-item">⭐ {userPoints} Points</span>
              <span className="profile-badge-item">🏆 {unlockedBadgeCount} Badges</span>
              <span className="profile-badge-item">📚 {completedCount} Completed</span>
              <span className="profile-badge-item">💼 {userCompletedProjects} Projects</span>
            </div>
          </div>
        </div>
        <span className="profile-role-tag">🎓 Student</span>
      </div>

      {/* Journey Card */}
      <div className="journey-card">
        <div className="journey-header">
          <div>
            <span className="journey-label">YOUR CAREER JOURNEY</span>
            <h2 className="journey-title">Learn. Prove. Match. Work. Earn.</h2>
          </div>
          <div className="journey-current">
            {journeyStages[journeyIndex] ? journeyStages[journeyIndex].icon : ''}{' '}
            {journeyStages[journeyIndex] ? journeyStages[journeyIndex].title : ''}
          </div>
        </div>
        <div className="journey-steps">
          {journeyStages.map(function (stage, idx) {
            var cls = 'journey-step';
            if (idx < journeyIndex) { cls = cls + ' step-done'; }
            if (idx === journeyIndex) { cls = cls + ' step-active'; }
            return (
              <React.Fragment key={stage.key}>
                <div className={cls}>
                  <div className="step-icon">{stage.icon}</div>
                  <strong>{stage.title}</strong>
                  <span>{stage.desc}</span>
                </div>
                {idx < journeyStages.length - 1 && (
                  <div className={idx < journeyIndex ? 'step-line line-done' : 'step-line'}></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Level Card */}
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
            <span>Overall Progress</span>
            <strong>{overallProgress}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: overallProgress + '%' }}></div>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>
            {completedCount} of {totalCourses} courses completed
          </p>
        </div>
      </div>

      {/* Statistics Row */}
      {stats && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem', marginBottom: '2rem'
        }}>
          {[
            { label: 'Total Points', value: stats.points, icon: '⭐' },
            { label: 'Courses Done', value: stats.completedCourses, icon: '📚' },
            { label: 'Projects Done', value: stats.completedProjects, icon: '💼' },
            { label: 'Applications', value: stats.totalApplications, icon: '📨' },
            { label: 'Accepted', value: stats.acceptedApplications, icon: '✅' },
            { label: 'Skills Learned', value: stats.totalSkills, icon: '🎯' }
          ].map(function (s) {
            return (
              <div key={s.label} style={{
                background: 'white', borderRadius: '0.875rem', padding: '1.25rem',
                border: '1px solid #f1f5f9', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* LEARN Section - Real Courses */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">📚 LEARN</h2>
            <p className="section-desc">Complete courses to earn points and unlock skills.</p>
          </div>
          <div className="overall-stat">
            <strong>{overallProgress}%</strong>
            <span>Overall</span>
          </div>
        </div>
        <div className="progress-track" style={{ marginBottom: '1.5rem' }}>
          <div className="progress-fill" style={{ width: overallProgress + '%' }}></div>
        </div>

        {courses.length === 0 ? (
          <div className="empty-box">
            <span>📚</span>
            <h3>No courses available yet</h3>
          </div>
        ) : (
          <div className="courses-list">
            {courses.map(function (course) {
              var isCompleted = userCompletedIds.includes(course._id.toString());
              var statusCls = isCompleted ? 'status-done' : 'status-new';
              var statusText = isCompleted ? '✓ Completed' : 'Not Started';

              return (
                <div className="course-item" key={course._id}>
                  <div className="course-top">
                    <div className="course-name-row">
                      <strong>{course.title}</strong>
                      <span className="course-level-tag">{course.level}</span>
                    </div>
                    <span className={statusCls}>{statusText}</span>
                  </div>
                  <div className="progress-track-sm">
                    <div
                      className="progress-fill-sm"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    ></div>
                  </div>
                  <div className="course-bottom">
                    <span>{course.lessons ? course.lessons.length : 0} lessons • {course.points} pts</span>
                    {isCompleted ? (
                      <span className="done-text">Course Completed ✓</span>
                    ) : (
                      <button
                        onClick={function () { handleCompleteCourse(course._id); }}
                        style={{
                          background: '#2b8b76', color: 'white', border: 'none',
                          borderRadius: '0.4rem', padding: '0.3rem 0.75rem',
                          fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        Mark Complete →
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* PROVE Section - Real Skills */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">🏆 PROVE</h2>
            <p className="section-desc">Skills earned by completing courses.</p>
          </div>
          <span className="verified-badge">{userSkills.length} Earned</span>
        </div>

        {userSkills.length === 0 ? (
          <div className="locked-box">
            <div className="locked-icon">📚</div>
            <h3>No skills yet</h3>
            <p>Complete courses to earn skills automatically.</p>
          </div>
        ) : (
          <div className="skills-grid">
            {userSkills.map(function (skill, idx) {
              return (
                <div className="skill-item" key={idx}>
                  <div>
                    <h3 className="skill-item-name">{skill}</h3>
                    <p className="skill-item-level">Earned via course</p>
                  </div>
                  <span className="verified-tag">✓ Verified</span>
                </div>
              );
            })}
          </div>
        )}

        <h3 className="badges-heading">Achievements</h3>
        <div className="badges-grid">
          {badges.map(function (badge, idx) {
            return (
              <div
                className={badge.unlocked ? 'badge-item badge-on' : 'badge-item badge-off'}
                key={idx}
              >
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

      {/* MATCH Section - Real Recommended Opportunities */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">🎯 MATCH</h2>
            <p className="section-desc">Opportunities matched to your skills.</p>
          </div>
          <span className="match-count-badge">
            {jobEligible
              ? recommended.length + ' Available'
              : '🔒 Complete 2 courses to unlock'
            }
          </span>
        </div>

        {!jobEligible ? (
          <div className="locked-box">
            <div className="locked-icon">🔒</div>
            <h3>Complete 2 courses to unlock</h3>
            <p>Finish courses above to access matched job opportunities.</p>
          </div>
        ) : recommended.length === 0 ? (
          <div className="empty-box">
            <span>🎯</span>
            <h3>No opportunities available right now</h3>
            <p>Check back soon or browse all opportunities.</p>
            <Link to="/opportunities" className="btn-outline" style={{ marginTop: '1rem' }}>
              Browse All →
            </Link>
          </div>
        ) : (
          <div className="jobs-list">
            {recommended.map(function (item) {
              var opp = item.opportunity;
              var match = item.matchPercentage;

              // Check if already applied
              var alreadyApplied = applications.some(function (a) {
                var oppId = a.opportunity ? (a.opportunity._id || a.opportunity) : null;
                return oppId && oppId.toString() === opp._id.toString();
              });

              return (
                <div className="job-item" key={opp._id}>
                  <div className="job-left">
                    <div className="job-logo">
                      {opp.provider ? opp.provider.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <h3 className="job-title">{opp.title}</h3>
                      <p className="job-company">
                        {opp.provider ? opp.provider.name : 'Company'}
                      </p>
                      <div className="job-meta">
                        <span>📍 {opp.location || 'Remote'}</span>
                        <span>💼 {opp.type}</span>
                        <span>💰 {opp.payment}</span>
                      </div>
                      <div className="job-tags">
                        {(opp.requiredSkills || []).map(function (s) {
                          return <span className="job-tag" key={s}>{s}</span>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="job-right">
                    <div className="match-display">
                      <strong>{match}%</strong>
                      <span>Match</span>
                    </div>
                    {alreadyApplied ? (
                      <button className="biz-outline-btn" disabled style={{ opacity: 0.6 }}>
                        Applied ✓
                      </button>
                    ) : (
                      <button
                        className="btn-apply"
                        onClick={function () { setApplyModal(opp); }}
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* WORK Section - Real Applications */}
      <div className="profile-section">
        <div className="section-top">
          <div>
            <h2 className="section-title-sm">💼 WORK</h2>
            <p className="section-desc">Your application history.</p>
          </div>
          <span className="match-count-badge">{applications.length} Applications</span>
        </div>

        {applications.length === 0 ? (
          <div className="locked-box">
            <div className="locked-icon">📨</div>
            <h3>No applications yet</h3>
            <p>Apply to opportunities from the Match section above.</p>
          </div>
        ) : (
          <div className="jobs-list">
            {applications.map(function (app) {
              var opp = app.opportunity;
              if (!opp) return null;

              var statusColor = { applied: '#f59e0b', reviewing: '#3b82f6', accepted: '#10b981', rejected: '#ef4444', completed: '#8b5cf6' };
              var statusBg = { applied: '#fffbeb', reviewing: '#eff6ff', accepted: '#ecfdf5', rejected: '#fef2f2', completed: '#f5f3ff' };

              return (
                <div className="job-item" key={app._id}>
                  <div className="job-left">
                    <div className="job-logo" style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.9rem' }}>
                      📋
                    </div>
                    <div>
                      <h3 className="job-title">{opp.title || 'Opportunity'}</h3>
                      <p className="job-company">{opp.type || ''}</p>
                      <div className="job-meta">
                        <span>💰 {opp.payment || ''}</span>
                        <span>📅 Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                      </div>
                      {app.coverMessage && (
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem', fontStyle: 'italic' }}>
                          "{app.coverMessage.substring(0, 80)}..."
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="job-right">
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize',
                      color: statusColor[app.status] || '#64748b',
                      background: statusBg[app.status] || '#f8fafc',
                      padding: '0.4rem 0.85rem', borderRadius: '9999px'
                    }}>
                      {app.status}
                    </span>
                    {app.status === 'completed' && (
                      <span style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 600 }}>
                        +200 pts earned
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================
// BUSINESS PROFILE — fully connected to real API
// =====================================================
function BusinessProfile(props) {
  var user = props.user;
  var auth = props.auth;
  var navigate = useNavigate();

  var tabState = useState('dashboard');
  var activeTab = tabState[0];
  var setActiveTab = tabState[1];

  var showFormState = useState(false);
  var showForm = showFormState[0];
  var setShowForm = showFormState[1];

  var msgState = useState('');
  var message = msgState[0];
  var setMessage = msgState[1];

  var mobileMenuState = useState(false);
  var mobileMenuOpen = mobileMenuState[0];
  var setMobileMenuOpen = mobileMenuState[1];

  // Real data state
  var oppsState = useState([]);
  var opportunities = oppsState[0];
  var setOpportunities = oppsState[1];

  var appsState = useState([]);
  var allApplications = appsState[0];
  var setAllApplications = appsState[1];

  var studentsState = useState([]);
  var students = studentsState[0];
  var setStudents = studentsState[1];

  var statsState = useState(null);
  var platformStats = statsState[0];
  var setPlatformStats = statsState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  // Form state
  var titleState = useState('');
  var jobTitle = titleState[0];
  var setJobTitle = titleState[1];

  var descState = useState('');
  var jobDesc = descState[0];
  var setJobDesc = descState[1];

  var typeState = useState('project');
  var jobType = typeState[0];
  var setJobType = typeState[1];

  var locState = useState('');
  var jobLocation = locState[0];
  var setJobLocation = locState[1];

  var remoteState = useState(true);
  var jobRemote = remoteState[0];
  var setJobRemote = remoteState[1];

  var payState = useState('');
  var jobPayment = payState[0];
  var setJobPayment = payState[1];

  var durationState = useState('');
  var jobDuration = durationState[0];
  var setJobDuration = durationState[1];

  var skillsState = useState('');
  var jobSkills = skillsState[0];
  var setJobSkills = skillsState[1];

  var catState = useState('web');
  var jobCategory = catState[0];
  var setJobCategory = catState[1];

  var deadlineState = useState('');
  var jobDeadline = deadlineState[0];
  var setJobDeadline = deadlineState[1];

  var providerId = user._id || user.id;

  // ── Load data on mount ─────────────────────────────
  useEffect(function () {
    if (!providerId) return;
    loadData();
  }, [providerId]);

  function loadData() {
    setLoading(true);

    // Load provider's opportunities
    var p1 = fetch(API + '/opportunities')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) {
          // Filter to only this provider's opportunities
          var mine = res.data.filter(function (opp) {
            var pid = opp.provider ? (opp.provider._id || opp.provider) : null;
            return pid && pid.toString() === providerId.toString();
          });
          setOpportunities(mine);
          return mine;
        }
        return [];
      });

    // Load students
    var p2 = fetch(API + '/users')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) {
          var onlyStudents = res.data.filter(function (u) { return u.role === 'student'; });
          setStudents(onlyStudents);
        }
      });

    // Load admin stats
    var p3 = fetch(API + '/admin/statistics')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) setPlatformStats(res.data);
      });

    // After loading opportunities, load their applications
    p1.then(function (myOpps) {
      if (myOpps.length === 0) {
        setLoading(false);
        return;
      }
      // Load applications for each opportunity
      var appPromises = myOpps.map(function (opp) {
        return fetch(API + '/applications/opportunity/' + opp._id)
          .then(function (r) { return r.json(); })
          .then(function (res) { return res.data || []; });
      });

      Promise.all(appPromises)
        .then(function (results) {
          var combined = [];
          results.forEach(function (arr) {
            combined = combined.concat(arr);
          });
          setAllApplications(combined);
          setLoading(false);
        })
        .catch(function () { setLoading(false); });
    }).catch(function () { setLoading(false); });

    Promise.all([p2, p3]).catch(function () {});
  }

  // ── Post new opportunity ───────────────────────────
  function handlePostJob(e) {
    e.preventDefault();

    var skillsArray = jobSkills
      .split(',')
      .map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 0; });

    fetch(API + '/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: jobTitle,
        description: jobDesc,
        provider: providerId,
        category: jobCategory,
        requiredSkills: skillsArray,
        type: jobType,
        location: jobLocation || 'Remote',
        remote: jobRemote,
        payment: jobPayment,
        duration: jobDuration,
        deadline: jobDeadline || null,
        status: 'open'
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage('Error: ' + (res.data.message || 'Could not post'));
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        setMessage('✅ Opportunity posted successfully!');
        setTimeout(function () { setMessage(''); }, 3000);
        // Reset form
        setJobTitle(''); setJobDesc(''); setJobPayment('');
        setJobSkills(''); setJobDuration(''); setJobDeadline('');
        setShowForm(false);
        setActiveTab('opportunities');
        loadData();
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  // ── Update application status ──────────────────────
  function handleStatusChange(appId, newStatus) {
    fetch(API + '/applications/' + appId + '/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage('Error: ' + (res.data.message || 'Could not update status'));
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        setMessage('✅ Status updated to "' + newStatus + '"');
        setTimeout(function () { setMessage(''); }, 3000);
        loadData();
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  // ── Delete opportunity ─────────────────────────────
  function handleDeleteOpportunity(oppId) {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;

    fetch(API + '/opportunities/' + oppId, { method: 'DELETE' })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage('Error: ' + (res.data.message || 'Could not delete'));
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        setMessage('✅ Opportunity deleted');
        setTimeout(function () { setMessage(''); }, 3000);
        loadData();
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  function handleLogout() {
    auth.logout();
    navigate('/');
  }

  function handleNavClick(tab) {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'post') {
      setShowForm(true);
      setActiveTab('opportunities');
    } else {
      setShowForm(false);
    }
  }

  // ── Derived values ─────────────────────────────────
  var activeOpps = opportunities.filter(function (o) { return o.status === 'open'; });
  var recentApps = allApplications.slice(0, 3);
  var activeListings = activeOpps.slice(0, 3);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="biz-layout">
      {/* Sidebar */}
      <aside className={mobileMenuOpen ? 'biz-sidebar biz-sidebar-open' : 'biz-sidebar'}>
        <div className="biz-sidebar-top">
          <div className="biz-logo">
            <span className="biz-logo-icon">S2E</span>
            <span className="biz-logo-text">Skill2Earn</span>
            <span className="biz-logo-badge">BIZ</span>
          </div>
        </div>
        <nav className="biz-nav">
          <button
            onClick={function () { handleNavClick('dashboard'); }}
            className={activeTab === 'dashboard' ? 'biz-nav-item biz-nav-active' : 'biz-nav-item'}
          >
            Dashboard
          </button>
          <button
            onClick={function () { handleNavClick('students'); }}
            className={activeTab === 'students' ? 'biz-nav-item biz-nav-active' : 'biz-nav-item'}
          >
            Find Talent
          </button>
          <button
            onClick={function () { handleNavClick('post'); }}
            className={activeTab === 'opportunities' && showForm ? 'biz-nav-item biz-nav-active' : 'biz-nav-item'}
          >
            Post Opportunity
          </button>
          <button
            onClick={function () { handleNavClick('applicants'); }}
            className={activeTab === 'applicants' ? 'biz-nav-item biz-nav-active' : 'biz-nav-item'}
          >
            Review Applicants
          </button>
          <button
            onClick={function () { handleNavClick('opportunities'); }}
            className={activeTab === 'opportunities' && !showForm ? 'biz-nav-item biz-nav-active' : 'biz-nav-item'}
          >
            My Opportunities
          </button>
        </nav>
        <div className="biz-sidebar-bottom">
          <button onClick={handleLogout} className="biz-logout">Log Out</button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div onClick={function () { setMobileMenuOpen(false); }} className="biz-overlay"></div>
      )}

      <main className="biz-main">
        <div className="biz-mobile-header">
          <button onClick={function () { setMobileMenuOpen(true); }} className="biz-menu-btn">☰</button>
          <span className="biz-logo-text">Skill2Earn</span>
          <div style={{ width: '32px' }}></div>
        </div>

        {message && (
          <div className="biz-alert">
            {message}
          </div>
        )}

        {/* ── DASHBOARD TAB ── */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="biz-page-header">
              <div>
                <p className="biz-page-label">Company Dashboard</p>
                <h1 className="biz-page-title">Welcome back, {user.name}!</h1>
              </div>
              <button
                onClick={function () { setActiveTab('opportunities'); setShowForm(true); }}
                className="biz-primary-btn"
              >
                + Post New Opportunity
              </button>
            </div>

            <div className="biz-stats-grid">
              <div className="biz-stat-card">
                <p className="biz-stat-label">My Active Listings</p>
                <h2 className="biz-stat-value" style={{ color: '#2b8b76' }}>{activeOpps.length}</h2>
              </div>
              <div className="biz-stat-card">
                <p className="biz-stat-label">Total Applicants</p>
                <h2 className="biz-stat-value" style={{ color: '#2b8b76' }}>{allApplications.length}</h2>
              </div>
              <div className="biz-stat-card">
                <p className="biz-stat-label">Accepted</p>
                <h2 className="biz-stat-value" style={{ color: '#f59e0b' }}>
                  {allApplications.filter(function (a) { return a.status === 'accepted'; }).length}
                </h2>
              </div>
              <div className="biz-stat-card">
                <p className="biz-stat-label">Platform Students</p>
                <h2 className="biz-stat-value" style={{ color: '#0f172a', fontSize: '1.35rem' }}>
                  {platformStats ? platformStats.totalStudents : students.length}
                </h2>
              </div>
            </div>

            <div className="biz-two-col">
              <div className="biz-panel">
                <div className="biz-panel-header">
                  <h3 className="biz-panel-title">Active Listings</h3>
                  <button
                    onClick={function () { setActiveTab('opportunities'); }}
                    className="biz-link-btn"
                  >
                    View All →
                  </button>
                </div>
                <div className="biz-list">
                  {activeListings.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '1rem 0' }}>
                      No active listings. Post your first opportunity!
                    </p>
                  ) : (
                    activeListings.map(function (opp) {
                      var appCount = allApplications.filter(function (a) {
                        var oid = a.opportunity ? (a.opportunity._id || a.opportunity) : null;
                        return oid && oid.toString() === opp._id.toString();
                      }).length;
                      return (
                        <div key={opp._id} className="biz-listing-item">
                          <div className="biz-listing-info">
                            <span className="biz-listing-type">{opp.type.toUpperCase()}</span>
                            <h4 className="biz-listing-title">{opp.title}</h4>
                            <p className="biz-listing-meta">{appCount} Applicants</p>
                          </div>
                          <div className="biz-listing-right">
                            <span className="biz-status-active">Open</span>
                            <button
                              onClick={function () { setActiveTab('applicants'); }}
                              className="biz-outline-btn"
                            >
                              Manage
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="biz-panel">
                <div className="biz-panel-header">
                  <h3 className="biz-panel-title">Recent Applicants</h3>
                  <button
                    onClick={function () { setActiveTab('applicants'); }}
                    className="biz-link-btn"
                  >
                    Review All →
                  </button>
                </div>
                <div className="biz-list">
                  {recentApps.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '1rem 0' }}>
                      No applicants yet.
                    </p>
                  ) : (
                    recentApps.map(function (app) {
                      var studentName = app.student ? app.student.name : 'Student';
                      var oppTitle = app.opportunity ? app.opportunity.title : 'Opportunity';
                      return (
                        <div key={app._id} className="biz-applicant-item">
                          <div className="biz-applicant-avatar">
                            {studentName.charAt(0)}
                          </div>
                          <div className="biz-applicant-info">
                            <h4 className="biz-applicant-name">{studentName}</h4>
                            <p className="biz-applicant-role">{oppTitle}</p>
                            <span className="biz-match-tag">
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </div>
                          <button
                            onClick={function () { setActiveTab('applicants'); }}
                            className="biz-outline-btn"
                          >
                            Review
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── OPPORTUNITIES TAB ── */}
        {activeTab === 'opportunities' && (
          <div>
            <div className="biz-page-header">
              <div>
                <p className="biz-page-label">Manage Listings</p>
                <h1 className="biz-page-title">My Opportunities</h1>
              </div>
              <button
                onClick={function () { setShowForm(!showForm); }}
                className="biz-primary-btn"
              >
                {showForm ? '✕ Cancel' : '+ Post New Opportunity'}
              </button>
            </div>

            {/* Post Form */}
            {showForm && (
              <div className="biz-panel" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                  Post New Opportunity
                </h3>
                <form onSubmit={handlePostJob}>
                  <div className="form-group">
                    <label className="form-label">Job Title *</label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={function (e) { setJobTitle(e.target.value); }}
                      placeholder="e.g. Frontend React Developer"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      value={jobDesc}
                      onChange={function (e) { setJobDesc(e.target.value); }}
                      placeholder="Describe the role and what you need..."
                      required
                      style={{
                        width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                        borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                        minHeight: '100px', resize: 'vertical', boxSizing: 'border-box', outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Type</label>
                      <select
                        value={jobType}
                        onChange={function (e) { setJobType(e.target.value); }}
                        style={{
                          width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                          borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                          boxSizing: 'border-box', outline: 'none', background: 'white'
                        }}
                      >
                        <option value="internship">Internship</option>
                        <option value="part-time">Part-Time</option>
                        <option value="freelance">Freelance</option>
                        <option value="project">Project</option>
                        <option value="community-task">Community Task</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        value={jobCategory}
                        onChange={function (e) { setJobCategory(e.target.value); }}
                        style={{
                          width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                          borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                          boxSizing: 'border-box', outline: 'none', background: 'white'
                        }}
                      >
                        <option value="web">Web Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="data">Data</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        value={jobLocation}
                        onChange={function (e) { setJobLocation(e.target.value); }}
                        placeholder="e.g. Kuala Lumpur"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Remote?</label>
                      <select
                        value={jobRemote ? 'yes' : 'no'}
                        onChange={function (e) { setJobRemote(e.target.value === 'yes'); }}
                        style={{
                          width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                          borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                          boxSizing: 'border-box', outline: 'none', background: 'white'
                        }}
                      >
                        <option value="yes">Yes - Remote</option>
                        <option value="no">No - On-site</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Payment</label>
                      <input
                        type="text"
                        value={jobPayment}
                        onChange={function (e) { setJobPayment(e.target.value); }}
                        placeholder="e.g. RM 500 fixed"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input
                        type="text"
                        value={jobDuration}
                        onChange={function (e) { setJobDuration(e.target.value); }}
                        placeholder="e.g. 2 weeks"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Deadline</label>
                    <input
                      type="date"
                      value={jobDeadline}
                      onChange={function (e) { setJobDeadline(e.target.value); }}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Required Skills (comma separated)</label>
                    <input
                      type="text"
                      value={jobSkills}
                      onChange={function (e) { setJobSkills(e.target.value); }}
                      placeholder="e.g. React, JavaScript, CSS"
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    className="biz-primary-btn"
                    style={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    Post Opportunity →
                  </button>
                </form>
              </div>
            )}

            {/* Opportunities List */}
            <div className="biz-panel">
              {opportunities.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                  <h3>No opportunities posted yet</h3>
                  <p style={{ marginTop: '0.5rem' }}>Click "Post New Opportunity" to get started.</p>
                </div>
              ) : (
                <div className="biz-list">
                  {opportunities.map(function (opp) {
                    var appCount = allApplications.filter(function (a) {
                      var oid = a.opportunity ? (a.opportunity._id || a.opportunity) : null;
                      return oid && oid.toString() === opp._id.toString();
                    }).length;
                    var statusClass = opp.status === 'open' ? 'biz-status-active' : 'biz-status-closed';

                    return (
                      <div key={opp._id} className="biz-listing-item">
                        <div className="biz-listing-info">
                          <span className="biz-listing-type">
                            {opp.type.toUpperCase()} • {opp.remote ? 'REMOTE' : opp.location}
                          </span>
                          <h4 className="biz-listing-title">{opp.title}</h4>
                          <p className="biz-listing-meta">
                            💰 {opp.payment} • 👥 {appCount} Applicants • ⏱ {opp.duration}
                          </p>
                          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                            {(opp.requiredSkills || []).map(function (s) {
                              return <span key={s} className="job-tag">{s}</span>;
                            })}
                          </div>
                        </div>
                        <div className="biz-listing-right">
                          <span className={statusClass}>
                            {opp.status === 'open' ? 'Open' : 'Closed'}
                          </span>
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                              onClick={function () { setActiveTab('applicants'); }}
                              className="biz-outline-btn"
                            >
                              Applicants ({appCount})
                            </button>
                            <button
                              onClick={function () { handleDeleteOpportunity(opp._id); }}
                              className="biz-outline-btn"
                              style={{ color: '#ef4444', borderColor: '#ef4444' }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── APPLICANTS TAB ── */}
        {activeTab === 'applicants' && (
          <div>
            <div className="biz-page-header">
              <div>
                <p className="biz-page-label">Talent Review</p>
                <h1 className="biz-page-title">Review Applicants</h1>
              </div>
            </div>

            <div className="biz-panel">
              {allApplications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📨</div>
                  <h3>No applicants yet</h3>
                  <p style={{ marginTop: '0.5rem' }}>Applications will appear here when students apply.</p>
                </div>
              ) : (
                <div className="biz-list">
                  {allApplications.map(function (app) {
                    var student = app.student || {};
                    var opp = app.opportunity || {};
                    var studentName = student.name || 'Student';
                    var studentSkills = student.skills || [];
                    var studentPoints = student.points || 0;

                    var statusColor = {
                      applied: '#f59e0b', reviewing: '#3b82f6',
                      accepted: '#10b981', rejected: '#ef4444', completed: '#8b5cf6'
                    };
                    var statusBg = {
                      applied: '#fffbeb', reviewing: '#eff6ff',
                      accepted: '#ecfdf5', rejected: '#fef2f2', completed: '#f5f3ff'
                    };

                    return (
                      <div key={app._id} className="biz-applicant-full">
                        <div className="biz-applicant-full-left">
                          <div
                            className="biz-applicant-avatar"
                            style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
                          >
                            {studentName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="biz-applicant-name" style={{ fontSize: '1rem' }}>
                              {studentName}
                            </h4>
                            <p style={{ color: '#2b8b76', fontWeight: 600, fontSize: '0.85rem' }}>
                              {student.email || ''}
                            </p>
                            <p className="biz-applicant-role">
                              Applied: {opp.title || 'Opportunity'}
                            </p>
                            {app.coverMessage && (
                              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.4rem 0', fontStyle: 'italic' }}>
                                "{app.coverMessage.substring(0, 100)}..."
                              </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                              {studentSkills.map(function (s) {
                                return <span key={s} className="job-tag">{s}</span>;
                              })}
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
                              ⭐ {studentPoints} points
                            </p>
                          </div>
                        </div>
                        <div className="biz-applicant-full-right">
                          <span style={{
                            fontSize: '0.75rem', fontWeight: 600,
                            color: statusColor[app.status] || '#64748b',
                            background: statusBg[app.status] || '#f8fafc',
                            padding: '0.3rem 0.85rem', borderRadius: '9999px',
                            textTransform: 'capitalize'
                          }}>
                            {app.status}
                          </span>

                          {/* Status action buttons */}
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {app.status === 'applied' && (
                              <React.Fragment>
                                <button
                                  onClick={function () { handleStatusChange(app._id, 'reviewing'); }}
                                  className="biz-outline-btn"
                                >
                                  Review
                                </button>
                                <button
                                  onClick={function () { handleStatusChange(app._id, 'rejected'); }}
                                  className="biz-outline-btn"
                                  style={{ color: '#ef4444', borderColor: '#ef4444' }}
                                >
                                  Reject
                                </button>
                              </React.Fragment>
                            )}
                            {app.status === 'reviewing' && (
                              <React.Fragment>
                                <button
                                  onClick={function () { handleStatusChange(app._id, 'accepted'); }}
                                  className="biz-primary-btn"
                                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={function () { handleStatusChange(app._id, 'rejected'); }}
                                  className="biz-outline-btn"
                                  style={{ color: '#ef4444', borderColor: '#ef4444' }}
                                >
                                  Reject
                                </button>
                              </React.Fragment>
                            )}
                            {app.status === 'accepted' && (
                              <button
                                onClick={function () { handleStatusChange(app._id, 'completed'); }}
                                className="biz-primary-btn"
                                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                              >
                                Mark Completed
                              </button>
                            )}
                            {(app.status === 'completed' || app.status === 'rejected') && (
                              <span style={{ fontSize: '0.8rem', color: '#94a3b8', padding: '0.4rem 0' }}>
                                {app.status === 'completed' ? '✅ Done' : '❌ Rejected'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FIND TALENT TAB ── */}
        {activeTab === 'students' && (
          <div>
            <div className="biz-page-header">
              <div>
                <p className="biz-page-label">Talent Pool</p>
                <h1 className="biz-page-title">Find Talent</h1>
              </div>
            </div>

            {students.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h3>No students yet</h3>
              </div>
            ) : (
              <div className="biz-students-grid">
                {students.map(function (student) {
                  var level = Math.floor((student.completedCourses || []).length / 2) + 1;
                  return (
                    <div key={student._id} className="biz-student-card">
                      <div className="biz-student-header">
                        <div
                          className="biz-applicant-avatar"
                          style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
                        >
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="biz-applicant-name">{student.name}</h4>
                          <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                            {student.location || 'Location not set'}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {(student.skills || []).length === 0 ? (
                          <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>No skills yet</span>
                        ) : (
                          student.skills.map(function (s) {
                            return <span key={s} className="job-tag">{s}</span>;
                          })
                        )}
                      </div>
                      <div className="biz-student-stats">
                        <span>🎓 Level {level}</span>
                        <span>⭐ {student.points} pts</span>
                        <span>📚 {(student.completedCourses || []).length}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// =====================================================
// LEARNING PAGE — connected to real API
// =====================================================
function LearningPage() {
  var auth = useAuth();

  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];

  var levelState = useState('All');
  var level = levelState[0];
  var setLevel = levelState[1];

  var coursesState = useState([]);
  var courses = coursesState[0];
  var setCourses = coursesState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  var msgState = useState('');
  var message = msgState[0];
  var setMessage = msgState[1];

  useEffect(function () {
    fetch(API + '/courses')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) setCourses(res.data);
        setLoading(false);
      })
      .catch(function () { setLoading(false); });
  }, []);

  // Get list of completed course IDs from logged in user
  var completedIds = [];
  if (auth.user && auth.user.completedCourses) {
    completedIds = auth.user.completedCourses.map(function (id) {
      return id.toString ? id.toString() : id;
    });
  }

  function handleCompleteCourse(courseId) {
    if (!auth.user) {
      setMessage('Please log in to complete courses');
      setTimeout(function () { setMessage(''); }, 3000);
      return;
    }

    var studentId = auth.user._id || auth.user.id;

    fetch(API + '/courses/' + courseId + '/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: studentId })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage(res.data.message || 'Could not complete course');
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        var updated = res.data.data.student;
        auth.refreshUser({
          points: updated.points,
          skills: updated.skills,
          completedCourses: updated.completedCourses,
          completedProjects: updated.completedProjects
        });
        setMessage('🎉 ' + res.data.message);
        setTimeout(function () { setMessage(''); }, 3000);
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  // Category icons map
  var categoryIcons = {
    'HTML': '🌐', 'CSS': '🎨', 'JavaScript': '⚡', 'React': '⚛️',
    'Node.js': '🖥️', 'MongoDB': '🗄️', 'UI/UX': '✏️', 'Digital Marketing': '📈'
  };

  var levels = ['All', 'beginner', 'intermediate', 'advanced'];

  var filtered = courses.filter(function (c) {
    var s = search.toLowerCase();
    var searchOk = !search ||
      c.title.toLowerCase().indexOf(s) !== -1 ||
      c.description.toLowerCase().indexOf(s) !== -1 ||
      c.skill.toLowerCase().indexOf(s) !== -1;
    var levelOk = level === 'All' || c.level === level;
    return searchOk && levelOk;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="learn-page">
      {/* Flash message */}
      {message && (
        <div style={{
          position: 'fixed', top: '80px', right: '20px', zIndex: 9999,
          background: message.startsWith('🎉') ? '#ecfdf5' : '#fef2f2',
          color: message.startsWith('🎉') ? '#065f46' : '#991b1b',
          border: '1px solid currentColor', borderRadius: '0.75rem',
          padding: '1rem 1.5rem', fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '350px'
        }}>
          {message}
        </div>
      )}

      <div className="learn-header">
        <div>
          <span className="section-label">LEARNING HUB</span>
          <h1 className="learn-title">Learn what the world needs.</h1>
          <p className="learn-subtitle">Complete courses to earn points and unlock real opportunities.</p>
        </div>
        <div className="learn-stats">
          <div className="learn-stat"><strong>{courses.length}</strong><span>Courses</span></div>
          <div className="learn-stat">
            <strong>{auth.user ? completedIds.length : 0}</strong>
            <span>Completed</span>
          </div>
        </div>
      </div>

      <div className="learn-search">
        <span className="search-emoji">🔍</span>
        <input
          type="text"
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search courses or skills..."
          className="search-field"
        />
        {search && (
          <button onClick={function () { setSearch(''); }} className="search-clear-btn">✕</button>
        )}
      </div>

      <div className="filter-bar">
        <span className="filter-label-text">Level:</span>
        {levels.map(function (lv) {
          return (
            <button
              key={lv}
              onClick={function () { setLevel(lv); }}
              className={level === lv ? 'filter-chip filter-active' : 'filter-chip'}
            >
              {lv === 'All' ? 'All' : lv.charAt(0).toUpperCase() + lv.slice(1)}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <p className="results-text" style={{ marginBottom: 0 }}>{filtered.length} courses found</p>
        {(search || level !== 'All') && (
          <button
            onClick={function () { setSearch(''); setLevel('All'); }}
            style={{
              background: 'none', border: 'none', color: '#2b8b76', fontWeight: 600,
              fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit'
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-box">
          <span>📚</span>
          <h3>No courses found</h3>
          <button
            onClick={function () { setSearch(''); setLevel('All'); }}
            className="btn-outline"
            style={{ marginTop: '1rem' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map(function (course) {
            var isCompleted = completedIds.includes(course._id.toString());
            var icon = categoryIcons[course.skill] || '📘';
            var lvClass = course.level === 'beginner' ? 'diff-beginner'
              : course.level === 'intermediate' ? 'diff-intermediate' : 'diff-advanced';

            return (
              <div className="course-card" key={course._id}>
                <div className="course-card-top">
                  <span className="course-icon">{icon}</span>
                  <div className="course-card-badges">
                    <span className={'diff-badge ' + lvClass}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    {isCompleted && (
                      <span style={{
                        background: '#ecfdf5', color: '#065f46', fontSize: '0.7rem',
                        fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '9999px'
                      }}>
                        ✓ Done
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="course-card-title">{course.title}</h3>
                <p className="course-card-desc">{course.description}</p>
                <div className="course-card-skills">
                  <span className="course-tag">{course.skill}</span>
                </div>
                <div className="course-card-meta">
                  <span>📖 {course.lessons ? course.lessons.length : 0} lessons</span>
                  <span>⭐ {course.points} pts</span>
                </div>

                {auth.user && auth.user.role === 'student' ? (
                  isCompleted ? (
                    <button className="course-start-btn" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                      ✓ Completed
                    </button>
                  ) : (
                    <button
                      className="course-start-btn"
                      onClick={function () { handleCompleteCourse(course._id); }}
                    >
                      Complete Course →
                    </button>
                  )
                ) : auth.user && auth.user.role === 'provider' ? (
                  <button className="course-start-btn" disabled style={{ opacity: 0.6 }}>
                    Provider Account
                  </button>
                ) : (
                  <Link to="/register" className="course-start-btn" style={{ display: 'block', textAlign: 'center' }}>
                    Sign up to Learn →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// =====================================================
// OPPORTUNITIES PAGE — connected to real API
// =====================================================
function OpportunitiesPage() {
  var auth = useAuth();

  var searchState = useState('');
  var search = searchState[0];
  var setSearch = searchState[1];

  var typeState = useState('All');
  var typeFilter = typeState[0];
  var setTypeFilter = typeState[1];

  var remoteState = useState('All');
  var remoteFilter = remoteState[0];
  var setRemoteFilter = remoteState[1];

  var oppsState = useState([]);
  var opportunities = oppsState[0];
  var setOpportunities = oppsState[1];

  var appsState = useState([]);
  var myApplications = appsState[0];
  var setMyApplications = appsState[1];

  var loadingState = useState(true);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  var msgState = useState('');
  var message = msgState[0];
  var setMessage = msgState[1];

  var modalState = useState(null);
  var applyModal = modalState[0];
  var setApplyModal = modalState[1];

  var coverState = useState('');
  var coverMessage = coverState[0];
  var setCoverMessage = coverState[1];

  useEffect(function () {
    // Load all open opportunities
    fetch(API + '/opportunities')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.data) setOpportunities(res.data);
        setLoading(false);
      })
      .catch(function () { setLoading(false); });

    // If student is logged in, load their applications too
    if (auth.user && auth.user.role === 'student') {
      var sid = auth.user._id || auth.user.id;
      fetch(API + '/applications/student/' + sid)
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.data) setMyApplications(res.data);
        })
        .catch(function () {});
    }
  }, []);

  function handleApply(opportunityId) {
    if (!auth.user) {
      setMessage('Please log in to apply');
      setTimeout(function () { setMessage(''); }, 3000);
      return;
    }

    var studentId = auth.user._id || auth.user.id;

    fetch(API + '/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student: studentId,
        opportunity: opportunityId,
        coverMessage: coverMessage || 'I am interested in this opportunity.'
      })
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); })
      .then(function (res) {
        if (!res.ok) {
          setMessage(res.data.message || 'Could not apply');
          setTimeout(function () { setMessage(''); }, 3000);
          return;
        }
        setMessage('✅ Application submitted!');
        setTimeout(function () { setMessage(''); }, 3000);
        setApplyModal(null);
        setCoverMessage('');
        // Reload applications
        var sid = auth.user._id || auth.user.id;
        fetch(API + '/applications/student/' + sid)
          .then(function (r) { return r.json(); })
          .then(function (r2) { if (r2.data) setMyApplications(r2.data); });
      })
      .catch(function () {
        setMessage('Server error. Please try again.');
        setTimeout(function () { setMessage(''); }, 3000);
      });
  }

  var types = ['All', 'internship', 'part-time', 'freelance', 'project', 'community-task'];
  var remoteOptions = ['All', 'Remote', 'On-site'];

  var filtered = opportunities.filter(function (opp) {
    var s = search.toLowerCase();
    var searchOk = !search ||
      opp.title.toLowerCase().indexOf(s) !== -1 ||
      (opp.provider && opp.provider.name && opp.provider.name.toLowerCase().indexOf(s) !== -1) ||
      (opp.requiredSkills || []).join(' ').toLowerCase().indexOf(s) !== -1;
    var typeOk = typeFilter === 'All' || opp.type === typeFilter;
    var remoteOk = remoteFilter === 'All' ||
      (remoteFilter === 'Remote' && opp.remote) ||
      (remoteFilter === 'On-site' && !opp.remote);
    return searchOk && typeOk && remoteOk;
  });

  function isApplied(oppId) {
    return myApplications.some(function (a) {
      var oid = a.opportunity ? (a.opportunity._id || a.opportunity) : null;
      return oid && oid.toString() === oppId.toString();
    });
  }

  function getApplicationStatus(oppId) {
    var app = myApplications.find(function (a) {
      var oid = a.opportunity ? (a.opportunity._id || a.opportunity) : null;
      return oid && oid.toString() === oppId.toString();
    });
    return app ? app.status : null;
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
        <p>Loading opportunities...</p>
      </div>
    );
  }

  return (
    <div className="opp-page">
      {/* Flash message */}
      {message && (
        <div style={{
          position: 'fixed', top: '80px', right: '20px', zIndex: 9999,
          background: message.startsWith('✅') ? '#ecfdf5' : '#fef2f2',
          color: message.startsWith('✅') ? '#065f46' : '#991b1b',
          border: '1px solid currentColor', borderRadius: '0.75rem',
          padding: '1rem 1.5rem', fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)', maxWidth: '350px'
        }}>
          {message}
        </div>
      )}

      {/* Apply Modal */}
      {applyModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'white', borderRadius: '1rem', padding: '2rem',
            width: '100%', maxWidth: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Apply: {applyModal.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {applyModal.provider ? applyModal.provider.name : ''} • {applyModal.payment}
            </p>
            <div className="form-group">
              <label className="form-label">Cover Message</label>
              <textarea
                value={coverMessage}
                onChange={function (e) { setCoverMessage(e.target.value); }}
                placeholder="Tell them why you are a great fit for this opportunity..."
                style={{
                  width: '100%', padding: '0.75rem', border: '1.5px solid #e5e7eb',
                  borderRadius: '0.625rem', fontSize: '0.95rem', fontFamily: 'inherit',
                  minHeight: '120px', resize: 'vertical', boxSizing: 'border-box', outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={function () { handleApply(applyModal._id); }}
                className="biz-primary-btn"
                style={{ flex: 1 }}
              >
                Submit Application →
              </button>
              <button
                onClick={function () { setApplyModal(null); setCoverMessage(''); }}
                className="biz-outline-btn"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="opp-header">
        <span className="section-label">OPPORTUNITIES</span>
        <h1 className="learn-title">Find work that fits your skills.</h1>
        <p className="learn-subtitle">
          {opportunities.length} real opportunities from verified businesses.
        </p>
      </div>

      <div className="learn-search">
        <span className="search-emoji">🔍</span>
        <input
          type="text"
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
          placeholder="Search by title, company, or skill..."
          className="search-field"
        />
        {search && (
          <button onClick={function () { setSearch(''); }} className="search-clear-btn">✕</button>
        )}
      </div>

      <div className="filter-section">
        <div className="filter-bar">
          <span className="filter-label-text">Type:</span>
          {types.map(function (t) {
            var label = t === 'All' ? 'All'
              : t === 'community-task' ? 'Community'
              : t === 'part-time' ? 'Part-Time'
              : t.charAt(0).toUpperCase() + t.slice(1);
            return (
              <button
                key={t}
                onClick={function () { setTypeFilter(t); }}
                className={typeFilter === t ? 'filter-chip filter-active' : 'filter-chip'}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="filter-bar">
          <span className="filter-label-text">Location:</span>
          {remoteOptions.map(function (r) {
            return (
              <button
                key={r}
                onClick={function () { setRemoteFilter(r); }}
                className={remoteFilter === r ? 'filter-chip filter-active' : 'filter-chip'}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      <p className="results-text">{filtered.length} opportunities found</p>

      {filtered.length === 0 ? (
        <div className="empty-box">
          <span>🔍</span>
          <h3>No opportunities found</h3>
          <button
            onClick={function () { setSearch(''); setTypeFilter('All'); setRemoteFilter('All'); }}
            className="btn-outline"
            style={{ marginTop: '1rem' }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="opp-list">
          {filtered.map(function (opp) {
            var applied = isApplied(opp._id);
            var appStatus = getApplicationStatus(opp._id);
            var providerName = opp.provider ? opp.provider.name : 'Company';

            var statusColor = {
              applied: '#f59e0b', reviewing: '#3b82f6',
              accepted: '#10b981', rejected: '#ef4444'
            };

            return (
              <div className="opp-list-card" key={opp._id}>
                <div className="opp-list-top">
                  <div className="opp-list-badges">
                    <span className="type-tag">{opp.type.toUpperCase()}</span>
                    <span className="loc-tag">{opp.remote ? 'REMOTE' : 'ON-SITE'}</span>
                  </div>
                  {opp.deadline && (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Deadline: {new Date(opp.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <h3 className="opp-list-title">{opp.title}</h3>
                <p className="opp-list-company">
                  <span className="company-dot">{providerName.charAt(0)}</span>
                  {providerName}
                </p>
                <p className="opp-list-desc">{opp.description}</p>

                <div className="opp-list-skills">
                  {(opp.requiredSkills || []).length === 0 ? (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>No specific skills required</span>
                  ) : (
                    (opp.requiredSkills || []).map(function (sk) {
                      return <span className="opp-list-tag" key={sk}>{sk}</span>;
                    })
                  )}
                </div>

                <div className="opp-list-footer">
                  <div className="opp-list-meta">
                    <span className="opp-salary">💰 {opp.payment}</span>
                    <span>📍 {opp.location || 'Remote'}</span>
                    <span>⏱ {opp.duration}</span>
                  </div>

                  {/* Apply button logic */}
                  {!auth.user ? (
                    <Link to="/register" className="btn-apply">Sign in to Apply</Link>
                  ) : auth.user.role === 'provider' ? (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Provider Account</span>
                  ) : applied ? (
                    <span style={{
                      fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize',
                      color: statusColor[appStatus] || '#64748b',
                      background: '#f8fafc', padding: '0.4rem 0.85rem',
                      borderRadius: '9999px', border: '1px solid #e5e7eb'
                    }}>
                      {appStatus === 'applied' ? '📨 Applied' : appStatus}
                    </span>
                  ) : (
                    <button
                      className="btn-apply"
                      onClick={function () { setApplyModal(opp); }}
                    >
                      Apply Now →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// =====================================================
// FOOTER
// =====================================================
function Footer() {
  var auth = useAuth();

  if (auth && auth.user && auth.user.role === 'provider' && window.location.pathname === '/profile') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">
              <span style={{ color: '#2b8b76' }}>S2E</span> Skill2Earn
            </h3>
            <p className="footer-desc">Helping students turn skills into careers.</p>
          </div>
          <div>
            <h4 className="footer-heading">Platform</h4>
            <Link to="/learning" className="footer-link">Courses</Link>
            <Link to="/opportunities" className="footer-link">Opportunities</Link>
          </div>
          <div>
            <h4 className="footer-heading">Account</h4>
            <Link to="/login" className="footer-link">Log in</Link>
            <Link to="/register" className="footer-link">Sign up</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SKILL2EARN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// =====================================================
// APP
// =====================================================
export default function App() {
  return (
    <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, backgroundColor: '#fcfbf9' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}