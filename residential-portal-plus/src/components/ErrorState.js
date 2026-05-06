import React from 'react';

export default function ErrorState({ title = 'Unable to load this content', message, onRetry }) {
  return (
    <div className="state-card state-card--error" role="alert">
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      {onRetry ? (
        <button className="btn" onClick={onRetry}>
          Try Again
        </button>
      ) : null}
    </div>
  );
}
