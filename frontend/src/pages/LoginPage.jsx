import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
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

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(function (response) {
        return response.json().then(function (result) {
          return { ok: response.ok, result: result };
        });
      })
      .then(function (obj) {
        if (!obj.ok) {
          setError(obj.result.message || 'Login failed');
          setIsLoading(false);
          return;
        }

        var userData = obj.result.data;

        if (!userData || !userData._id) {
          setError('No user data received');
          setIsLoading(false);
          return;
        }

        auth.login({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          points: userData.points || 0,
          skills: userData.skills || [],
          bio: userData.bio || '',
          location: userData.location || '',
          profileImage: userData.profileImage || '',
          completedCourses: userData.completedCourses || [],
          completedProjects: userData.completedProjects || 0
        });

        navigate('/profile');
      })
      .catch(function () {
        setError('Cannot connect to server. Is your backend running?');
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