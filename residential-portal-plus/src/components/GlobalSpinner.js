import React from 'react';

export default function GlobalSpinner({ active }) {
  if (!active) {
    return null;
  }

  return (
    <div className="loading-overlay" aria-live="polite" aria-busy="true">
      <div className="spinner-panel">
        <div className="spinner" />
        <div className="small">Loading the latest data...</div>
      </div>
    </div>
  );
}
