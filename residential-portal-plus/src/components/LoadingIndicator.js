import React from 'react';
import { useGlobalLoading } from '../context/LoadingContext';

export default function LoadingIndicator() {
  const { isLoading } = useGlobalLoading();

  return (
    <div className={`loading-bar${isLoading ? ' is-visible' : ''}`} aria-hidden={!isLoading}>
      <div className="loading-bar__progress" />
    </div>
  );
}
