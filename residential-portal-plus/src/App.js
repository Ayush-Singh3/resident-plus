import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Settings from './pages/Settings';
import GlobalLoadingIndicator from './components/GlobalLoadingIndicator';
import ErrorState from './components/ErrorState';
import { useAuthFeedback } from './context/AuthFeedbackContext';
import { setAuthExpiredHandler } from './services/http';

export default function App(){
  const { authError, clearAuthError, setAuthError } = useAuthFeedback();

  useEffect(() => {
    setAuthExpiredHandler(setAuthError);

    return () => {
      setAuthExpiredHandler(null);
    };
  }, [setAuthError]);

  return (
    <div className="app-shell">
      <GlobalLoadingIndicator />
      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <main className="screen page">
        <ErrorState error={authError} onDismiss={clearAuthError} />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/properties/*" element={<Properties/>} />
          <Route path="/tenants/*" element={<Tenants/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </main>
    </div>
  );
}
