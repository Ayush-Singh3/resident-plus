import React from 'react';

export default function ErrorState({ error, onRetry, onDismiss }) {
  if (!error || error.type === 'cancelled') {
    return null;
  }

  return (
    <div className="error-state" role="alert" aria-live="polite">
      <div>
        <div className="error-title">{error.title}</div>
        <div className="small error-message">{error.message}</div>
      </div>
      <div className="error-actions">
        {onRetry && error.retryable ? (
          <button className="btn" onClick={onRetry}>
            Try again
          </button>
        ) : null}
        {onDismiss ? (
          <button className="btn btn-secondary" onClick={onDismiss}>
            Dismiss
          </button>
        ) : null}
      </div>
    </div>
  );
}
