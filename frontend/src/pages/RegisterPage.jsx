import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
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

    fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password, role: role })
    })
      .then(function (response) {
        return response.json().then(function (result) {
          return { ok: response.ok, result: result };
        });
      })
      .then(function (obj) {
        if (!obj.ok) {
          setError(obj.result.message || 'Registration failed');
          setIsLoading(false);
          return;
        }

        var userData = obj.result.data;

        if (!userData || !userData._id) {
          setError('Registered but no user data. Try logging in.');
          setIsLoading(false);
          return;
        }

        auth.login({
          id: userData._id,
          name: userData.name || name,
          email: userData.email || email,
          role: userData.role || role,
          points: userData.points || 0,
          skills: userData.skills || [],
          completedCourses: userData.completedCourses || []
        });

        navigate('/profile');
      })
      .catch(function () {
        setError('Cannot connect to server.');
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
            <input type="text" value={name} onChange={function (e) { setName(e.target.value); }}
              placeholder="Jane Doe" required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={function (e) { setEmail(e.target.value); }}
              placeholder="you@example.com" required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={function (e) { setPassword(e.target.value); }}
              placeholder="At least 8 characters" required minLength={8} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <div className="role-buttons">
              <button type="button" onClick={function () { setRole('student'); }}
                className={role === 'student' ? 'role-btn role-active' : 'role-btn'}>
                🎓 Student
              </button>
              <button type="button" onClick={function () { setRole('provider'); }}
                className={role === 'provider' ? 'role-btn role-active' : 'role-btn'}>
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