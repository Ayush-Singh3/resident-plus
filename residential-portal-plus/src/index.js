import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LoadingProvider } from './context/LoadingContext';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadingProvider>
  </React.StrictMode>
);
