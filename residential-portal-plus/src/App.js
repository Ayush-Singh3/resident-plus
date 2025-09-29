import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Settings from './pages/Settings';

export default function App(){
  return (
    <div className="app-shell">
      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <main className="screen page">
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
