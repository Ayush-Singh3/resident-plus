import React from 'react';
import { useGlobalLoading } from '../hooks/useGlobalLoading';

export default function GlobalLoadingIndicator() {
  const { isLoading } = useGlobalLoading();

  return (
    <div className={`top-loader${isLoading ? ' is-active' : ''}`} aria-hidden={!isLoading}>
      <div className="top-loader-bar" />
    </div>
  );
}
