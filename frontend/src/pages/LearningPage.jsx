import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COURSES_DATA } from '../data/coursesData';
import CourseViewer from './CourseViewer';

const CATEGORIES = [
  { key: 'all', label: 'All', icon: '📚' },
  { key: 'programming', label: 'Programming', icon: '💻' },
  { key: 'design', label: 'Design', icon: '🎨' },
  { key: 'data', label: 'Data & AI', icon: '📊' },
  { key: 'marketing', label: 'Marketing', icon: '📈' },
  { key: 'writing', label: 'Writing', icon: '✍️' },
  { key: 'media', label: 'Media', icon: '🎬' }
];

export default function LearningPage() {
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [levelFilter, setLevelFilter] = useState('All');
  const [activeCourse, setActiveCourse] = useState(null);

  // Get completed courses from localStorage
  const completedCourses = JSON.parse(
    localStorage.getItem('completedCourses') || '[]'
  );

  const filtered = COURSES_DATA.filter((c) => {
    const title = (c.title || '').toLowerCase();
    const desc = (c.desc || '').toLowerCase();
    const skillsText = (c.skills || []).join(' ').toLowerCase();
    const s = search.toLowerCase();

    const matchSearch =
      !search ||
      title.includes(s) ||
      desc.includes(s) ||
      skillsText.includes(s);

    const matchCat =
      category === 'all' || c.category === category;

    const matchLevel =
      levelFilter === 'All' ||
      (c.level || '').toLowerCase() === levelFilter.toLowerCase();

    return matchSearch && matchCat && matchLevel;
  });

  function clearFilters() {
    setSearch('');
    setCategory('all');
    setLevelFilter('All');
  }

  // If a course is active, show the viewer
  if (activeCourse) {
    return (
      <CourseViewer
        course={activeCourse}
        onBack={() => setActiveCourse(null)}
      />
    );
  }

  return (
    <div className="learn-page">

      {/* ── Header ── */}
      <div className="learn-header">
        <div>
          <span className="section-label">LEARNING HUB</span>
          <h1 className="learn-title">Learn what the world needs.</h1>
          <p className="learn-subtitle">
            Build skills through structured courses.
          </p>
        </div>
        <div className="learn-stats">
          <div className="learn-stat">
            <strong>{COURSES_DATA.length}</strong>
            <span>Courses</span>
          </div>
          <div className="learn-stat">
            <strong>{CATEGORIES.length - 1}</strong>
            <span>Categories</span>
          </div>
          {user && (
            <div className="learn-stat">
              <strong>{completedCourses.length}</strong>
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="learn-search">
        <span className="search-emoji">🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses, skills, or topics..."
          className="search-field"
        />
        {search && (
          <button onClick={() => setSearch('')} className="search-clear-btn">
            ✕
          </button>
        )}
      </div>

      {/* ── Categories ── */}
      <div className="category-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={category === cat.key ? 'cat-btn cat-active' : 'cat-btn'}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* ── Level Filter ── */}
      <div className="filter-bar">
        <span className="filter-label-text">Level:</span>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lv) => (
          <button
            key={lv}
            onClick={() => setLevelFilter(lv)}
            className={levelFilter === lv ? 'filter-chip filter-active' : 'filter-chip'}
          >
            {lv}
          </button>
        ))}
      </div>

      {/* ── Results Count ── */}
      <div className="results-row">
        <p className="results-text">{filtered.length} courses found</p>
        {(search || category !== 'all' || levelFilter !== 'All') && (
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear filters
          </button>
        )}
      </div>

      {/* ── Grid or Empty ── */}
      {filtered.length === 0 ? (
        <div className="empty-box">
          <span>📚</span>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="btn-outline"
            style={{ marginTop: '1rem' }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map((c) => {
            const isCompleted = completedCourses.includes(c.id);

            let levelClass = 'diff-beginner';
            const levelText = c.level || 'Beginner';
            if (levelText.toLowerCase() === 'intermediate')
              levelClass = 'diff-intermediate';
            if (levelText.toLowerCase() === 'advanced')
              levelClass = 'diff-advanced';

            return (
              <div
                className={`course-card ${isCompleted ? 'course-card-completed' : ''}`}
                key={c.id}
              >
                {/* Completed Badge */}
                {isCompleted && (
                  <div className="completed-ribbon">✅ Completed</div>
                )}

                {/* Top row */}
                <div className="course-card-top">
                  <span className="course-icon">{c.icon}</span>
                  <div className="course-card-badges">
                    <span className={`diff-badge ${levelClass}`}>
                      {levelText}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="course-card-title">{c.title}</h3>

                {/* Description */}
                <p className="course-card-desc">{c.desc}</p>

                {/* Skills */}
                {c.skills && c.skills.length > 0 && (
                  <div className="course-card-skills">
                    {c.skills.slice(0, 3).map((skill) => (
                      <span className="course-tag" key={skill}>{skill}</span>
                    ))}
                    {c.skills.length > 3 && (
                      <span className="skills-more">
                        +{c.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Meta */}
                <div className="course-card-meta">
                  {c.lessons && <span>📖 {c.lessons} lessons</span>}
                  {c.duration && <span>⏱ {c.duration}</span>}
                  {c.rating && <span>⭐ {c.rating}</span>}
                  {c.students && (
                    <span>👥 {c.students.toLocaleString()}</span>
                  )}
                  {c.points && (
                    <span className="points-badge">🏆 {c.points} pts</span>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`course-start-btn ${isCompleted ? 'course-start-btn-done' : ''}`}
                  onClick={() => {
                    if (!user) {
                      alert('Please sign in to start a course!');
                      return;
                    }
                    setActiveCourse(c);
                  }}
                >
                  {isCompleted
                    ? '✅ Review Course'
                    : user
                    ? 'Start Course →'
                    : '🔒 Sign in to Start'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}