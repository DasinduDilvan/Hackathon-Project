import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import myLogo from '../../public/logo.svg'

const STEPS = [
  {
    id: 1,
    icon: '👋',
    title: 'Welcome to Skill2Earn!',
    subtitle: 'Your journey to new skills starts here.',
    description:
      'Skill2Earn is a learning platform designed to help you grow professionally. ' +
      'Complete courses, earn points, and build a portfolio that gets you hired.',
    visual: 'welcome',
    tips: [
      { icon: '📚', text: 'Access 12+ structured courses across 6 categories' },
      { icon: '🏆', text: 'Earn points for every course you complete' },
      { icon: '💼', text: 'Build a profile that showcases your skills' },
      { icon: '🎯', text: 'Track your learning progress in real time' }
    ]
  },
  {
    id: 2,
    icon: '🗺️',
    title: 'Explore the Platform',
    subtitle: 'Here is everything you can do on Skill2Earn.',
    description:
      'Navigate through different sections of the platform to make the most ' +
      'of your learning experience.',
    visual: 'navigation',
    features: [
      {
        icon: '🏠',
        name: 'Home',
        desc: 'Your dashboard with progress overview and quick access to courses.',
        color: '#dbeafe',
        textColor: '#1e40af'
      },
      {
        icon: '📚',
        name: 'Learning Hub',
        desc: 'Browse and start courses. Filter by category, level, or search by skill.',
        color: '#d1fae5',
        textColor: '#065f46'
      },
      {
        icon: '💼',
        name: 'Jobs',
        desc: 'Find job opportunities that match the skills you are building.',
        color: '#fef3c7',
        textColor: '#92400e'
      },
      {
        icon: '👤',
        name: 'Profile',
        desc: 'View your points, completed courses, badges, and skill portfolio.',
        color: '#ede9fe',
        textColor: '#5b21b6'
      },
      {
        icon: '📊',
        name: 'Progress',
        desc: 'Track your learning streak, weekly goals, and achievements.',
        color: '#fee2e2',
        textColor: '#991b1b'
      },
      {
        icon: '⚙️',
        name: 'Settings',
        desc: 'Customize your profile, notification preferences, and account.',
        color: '#f3f4f6',
        textColor: '#374151'
      }
    ]
  },
  {
    id: 3,
    icon: '🎓',
    title: 'How Learning Works',
    subtitle: 'Simple steps to complete a course and earn points.',
    description:
      'Every course is structured to give you the best learning experience ' +
      'through video lessons and interactive quizzes.',
    visual: 'learning',
    steps: [
      {
        step: '01',
        icon: '🔍',
        title: 'Pick a Course',
        desc: 'Browse the Learning Hub and choose a course that matches your goals.',
        color: '#2b8b76'
      },
      {
        step: '02',
        icon: '▶️',
        title: 'Watch Lessons',
        desc: 'Go through video lessons at your own pace. Mark each lesson as complete.',
        color: '#3b82f6'
      },
      {
        step: '03',
        icon: '📝',
        title: 'Take the Quiz',
        desc: 'Test your knowledge with a quiz. Score 70% or more to pass.',
        color: '#f59e0b'
      },
      {
        step: '04',
        icon: '🏆',
        title: 'Earn Points',
        desc: 'Complete all lessons and pass the quiz to earn course points.',
        color: '#8b5cf6'
      }
    ]
  },
  {
    id: 4,
    icon: '🏆',
    title: 'Points & Rewards',
    subtitle: 'Get rewarded for every skill you learn.',
    description:
      'Skill2Earn has a points system that tracks your learning achievements ' +
      'and unlocks new levels and badges as you grow.',
    visual: 'points',
    pointsInfo: [
      {
        icon: '🌐',
        course: 'HTML Fundamentals',
        pts: 100,
        level: 'Beginner'
      },
      {
        icon: '🎨',
        course: 'CSS Fundamentals',
        pts: 120,
        level: 'Beginner'
      },
      {
        icon: '⚡',
        course: 'JavaScript Basics',
        pts: 150,
        level: 'Beginner'
      },
      {
        icon: '⚛️',
        course: 'React Fundamentals',
        pts: 200,
        level: 'Intermediate'
      }
    ],
    badges: [
      { icon: '🌱', name: 'Starter', desc: 'Complete your first course', pts: 0 },
      { icon: '⚡', name: 'Rising Star', desc: 'Earn 300+ points', pts: 300 },
      { icon: '🔥', name: 'On Fire', desc: 'Earn 600+ points', pts: 600 },
      { icon: '💎', name: 'Expert', desc: 'Earn 1000+ points', pts: 1000 }
    ]
  },
  {
    id: 5,
    icon: '🚀',
    title: "You're All Set!",
    subtitle: 'Start your first course and begin earning points.',
    description:
      'Everything is ready for you. Pick a course below based on your ' +
      'current skill level and start your learning journey today!',
    visual: 'start',
    recommendations: [
      {
        icon: '🌐',
        title: 'HTML Fundamentals',
        level: 'Beginner',
        pts: 100,
        desc: 'Perfect starting point for web development.',
        category: 'programming'
      },
      {
        icon: '🎨',
        title: 'UI/UX Design',
        level: 'Beginner',
        pts: 130,
        desc: 'Learn design principles and prototyping.',
        category: 'design'
      },
      {
        icon: '📊',
        title: 'Python for Data',
        level: 'Beginner',
        pts: 160,
        desc: 'Start your data science journey.',
        category: 'data'
      },
      {
        icon: '📈',
        title: 'Digital Marketing',
        level: 'Beginner',
        pts: 110,
        desc: 'Master SEO and social media marketing.',
        category: 'marketing'
      }
    ]
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [animating, setAnimating] = useState(false);

  const step = STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  function goTo(index) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(index);
      setAnimating(false);
    }, 200);
  }

  function handleNext() {
    if (isLast) {
      finishOnboarding();
    } else {
      goTo(currentStep + 1);
    }
  }

  function handleBack() {
    if (!isFirst) goTo(currentStep - 1);
  }

  function finishOnboarding() {
    localStorage.setItem('onboardingDone', 'true');
    navigate('/learn');
  }

  function skipOnboarding() {
    localStorage.setItem('onboardingDone', 'true');
    navigate('/register');
  }

  return (
    <div className="ob-page">

      {/* ── Top Bar ── */}
      <div className="ob-topbar">
        <div className="ob-logo">
            <span className="nav-logo-icon">S2E</span>
          <span className="ob-logo-text">Skill2Earn</span>
        </div>

        <div className="ob-topbar-center">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className={`ob-step-dot ${i === currentStep
                ? 'ob-step-dot-active'
                : i < currentStep
                ? 'ob-step-dot-done'
                : ''
                }`}
              title={s.title}
            >
              {i < currentStep ? '✓' : i + 1}
            </button>
          ))}
        </div>

        <button onClick={skipOnboarding} className="ob-skip-btn">
          Skip tour →
        </button>
      </div>

      {/* ── Progress Bar ── */}
      <div className="ob-progress-wrap">
        <div
          className="ob-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className={`ob-content ${animating ? 'ob-fade-out' : 'ob-fade-in'}`}>

        {/* ── STEP 1: Welcome ── */}
        {step.visual === 'welcome' && (
          <div className="ob-section">
            <div className="ob-hero">
              <div className="ob-hero-icon">{step.icon}</div>
              <span className="ob-label">WELCOME</span>
              <h1 className="ob-title">{step.title}</h1>
              <p className="ob-subtitle">{step.subtitle}</p>
              <p className="ob-desc">{step.description}</p>
            </div>

            <div className="ob-tips-grid">
              {step.tips.map((tip, i) => (
                <div className="ob-tip-card" key={i}>
                  <span className="ob-tip-icon">{tip.icon}</span>
                  <p className="ob-tip-text">{tip.text}</p>
                </div>
              ))}
            </div>

            {user && (
              <div className="ob-user-greeting">
                👋 Welcome, <strong>{user.name || user.email}!</strong>{' '}
                Your account is ready to go.
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Navigation ── */}
        {step.visual === 'navigation' && (
          <div className="ob-section">
            <div className="ob-hero ob-hero-sm">
              <div className="ob-hero-icon">{step.icon}</div>
              <span className="ob-label">PLATFORM TOUR</span>
              <h1 className="ob-title">{step.title}</h1>
              <p className="ob-desc">{step.description}</p>
            </div>

            <div className="ob-features-grid">
              {step.features.map((f, i) => (
                <div
                  className="ob-feature-card"
                  key={i}
                  style={{
                    borderTopColor: f.textColor,
                    borderTopWidth: '3px',
                    borderTopStyle: 'solid'
                  }}
                >
                  <div
                    className="ob-feature-icon-wrap"
                    style={{ background: f.color, color: f.textColor }}
                  >
                    {f.icon}
                  </div>
                  <h3
                    className="ob-feature-name"
                    style={{ color: f.textColor }}
                  >
                    {f.name}
                  </h3>
                  <p className="ob-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: How Learning Works ── */}
        {step.visual === 'learning' && (
          <div className="ob-section">
            <div className="ob-hero ob-hero-sm">
              <div className="ob-hero-icon">{step.icon}</div>
              <span className="ob-label">HOW IT WORKS</span>
              <h1 className="ob-title">{step.title}</h1>
              <p className="ob-desc">{step.description}</p>
            </div>

            <div className="ob-steps-flow">
              {step.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="ob-flow-step">
                    <div
                      className="ob-flow-step-num"
                      style={{ background: s.color }}
                    >
                      {s.step}
                    </div>
                    <div
                      className="ob-flow-icon"
                      style={{ background: s.color + '22' }}
                    >
                      {s.icon}
                    </div>
                    <h3
                      className="ob-flow-title"
                      style={{ color: s.color }}
                    >
                      {s.title}
                    </h3>
                    <p className="ob-flow-desc">{s.desc}</p>
                  </div>
                  {i < step.steps.length - 1 && (
                    <div className="ob-flow-arrow">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Quiz Info Box */}
            <div className="ob-info-box">
              <div className="ob-info-box-icon">💡</div>
              <div>
                <strong>Pro Tip:</strong> You can retry quizzes as many
                times as you need. A score of 70% or higher is required
                to complete a lesson and earn your course points.
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Points & Rewards ── */}
        {step.visual === 'points' && (
          <div className="ob-section">
            <div className="ob-hero ob-hero-sm">
              <div className="ob-hero-icon">{step.icon}</div>
              <span className="ob-label">POINTS & REWARDS</span>
              <h1 className="ob-title">{step.title}</h1>
              <p className="ob-desc">{step.description}</p>
            </div>

            <div className="ob-points-layout">

              {/* Points Table */}
              <div className="ob-points-table-wrap">
                <h3 className="ob-sub-heading">Sample Course Points</h3>
                <div className="ob-points-table">
                  {step.pointsInfo.map((p, i) => (
                    <div className="ob-points-row" key={i}>
                      <span className="ob-points-course-icon">
                        {p.icon}
                      </span>
                      <div className="ob-points-course-info">
                        <span className="ob-points-course-name">
                          {p.course}
                        </span>
                        <span className="ob-points-level">{p.level}</span>
                      </div>
                      <span className="ob-points-value">
                        🏆 {p.pts} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="ob-badges-wrap">
                <h3 className="ob-sub-heading">Badges You Can Earn</h3>
                <div className="ob-badges-list">
                  {step.badges.map((b, i) => (
                    <div className="ob-badge-item" key={i}>
                      <span className="ob-badge-icon">{b.icon}</span>
                      <div className="ob-badge-info">
                        <span className="ob-badge-name">{b.name}</span>
                        <span className="ob-badge-desc">{b.desc}</span>
                      </div>
                      <span className="ob-badge-pts">
                        {b.pts === 0 ? 'First course' : `${b.pts}+ pts`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── STEP 5: Get Started ── */}
        {step.visual === 'start' && (
          <div className="ob-section">
            <div className="ob-hero ob-hero-sm">
              <div className="ob-hero-icon">{step.icon}</div>
              <span className="ob-label">LET'S GO!</span>
              <h1 className="ob-title">{step.title}</h1>
              <p className="ob-desc">{step.description}</p>
            </div>

            <h3 className="ob-sub-heading" style={{ marginBottom: '1rem' }}>
              Recommended for Beginners
            </h3>

            <div className="ob-reco-grid">
              {step.recommendations.map((r, i) => (
                <button
                  key={i}
                  className={`ob-reco-card ${selectedCourse === i
                    ? 'ob-reco-card-selected'
                    : ''
                    }`}
                  onClick={() => setSelectedCourse(i)}
                >
                  <span className="ob-reco-icon">{r.icon}</span>
                  <div className="ob-reco-info">
                    <span className="ob-reco-title">{r.title}</span>
                    <span className="ob-reco-desc">{r.desc}</span>
                    <div className="ob-reco-meta">
                      <span className="ob-reco-level">{r.level}</span>
                      <span className="ob-reco-pts">🏆 {r.pts} pts</span>
                    </div>
                  </div>
                  {selectedCourse === i && (
                    <span className="ob-reco-check">✓</span>
                  )}
                </button>
              ))}
            </div>

            <div className="ob-final-cta">
              <button
                className="ob-start-btn"
                onClick={finishOnboarding}
              >
                {selectedCourse !== null
                  ? `Start ${step.recommendations[selectedCourse].title} →`
                  : 'Go to Learning Hub →'}
              </button>
              <p className="ob-final-note">
                🔒 Your progress is saved automatically.
                Come back anytime to continue learning.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* ── Bottom Navigation ── */}
      <div className="ob-bottom-nav">
        <button
          onClick={handleBack}
          className="ob-nav-btn ob-nav-back"
          disabled={isFirst}
        >
          ← Back
        </button>

        <div className="ob-step-counter">
          Step {currentStep + 1} of {STEPS.length}
        </div>

        <button
          onClick={handleNext}
          className="ob-nav-btn ob-nav-next"
        >
          {isLast ? '🚀 Start Learning' : 'Next →'}
        </button>
      </div>
    </div>
  );
}