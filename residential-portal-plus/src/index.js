import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import { AuthFeedbackProvider } from './context/AuthFeedbackContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthFeedbackProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthFeedbackProvider>
  </React.StrictMode>
);
