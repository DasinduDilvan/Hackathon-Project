import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('authUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const pts = JSON.parse(localStorage.getItem('userPoints') || '[]');
    return pts.reduce((sum, p) => sum + (p.points || 0), 0);
  });

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
  localStorage.removeItem('s2e_user');        
  localStorage.removeItem('onboardingDone');   
  localStorage.removeItem('completedCourses'); 
  localStorage.removeItem('userPoints');       
  setUser(null);
}

  function addPoints(pts, courseTitle) {
    setTotalPoints((prev) => {
      const newTotal = prev + pts;
      return newTotal;
    });

    // Update user object with new points
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        points: (prev.points || 0) + pts
      };
    });

    console.log(
      `✅ +${pts} points awarded for completing: ${courseTitle}`
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, addPoints, totalPoints }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}