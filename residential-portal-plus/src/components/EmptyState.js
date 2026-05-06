import React from 'react';

export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-title">{title}</div>
      <div className="small">{message}</div>
    </div>
  );
}
