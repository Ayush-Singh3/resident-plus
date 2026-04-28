import React from 'react';

export default function ErrorNotice({ message, onDismiss, compact = false }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`error-notice${compact ? ' compact' : ''}`} role="alert">
      <div>
        <div className="error-title">Something needs attention</div>
        <div className="error-message">{message}</div>
      </div>
      {onDismiss ? (
        <button type="button" className="ghost-btn" onClick={onDismiss}>
          Dismiss
        </button>
      ) : null}
    </div>
  );
}
