import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Settings from './pages/Settings';
import ErrorNotice from './components/ErrorNotice';
import GlobalSpinner from './components/GlobalSpinner';
import useGlobalApiStatus from './hooks/useGlobalApiStatus';

export default function App(){
  const { isLoading, error, clearError } = useGlobalApiStatus();

  return (
    <div className="app-shell">
      <GlobalSpinner active={isLoading} />
      <nav className="nav">
        <div>
          <div className="eyebrow">Resident Plus</div>
          <h1>Operations Hub</h1>
          <p className="small nav-copy">Centralized leasing, property, and resident activity.</p>
        </div>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/properties">Properties</NavLink>
        <NavLink to="/tenants">Tenants</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
      <main className="screen page">
        <ErrorNotice message={error?.message} onDismiss={clearError} />
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
