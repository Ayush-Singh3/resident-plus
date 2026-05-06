import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthFeedbackContext = createContext(null);

export function AuthFeedbackProvider({ children }) {
  const [authError, setAuthError] = useState(null);

  const value = useMemo(
    () => ({
      authError,
      setAuthError,
      clearAuthError: () => setAuthError(null)
    }),
    [authError]
  );

  return <AuthFeedbackContext.Provider value={value}>{children}</AuthFeedbackContext.Provider>;
}

export function useAuthFeedback() {
  const context = useContext(AuthFeedbackContext);

  if (!context) {
    throw new Error('useAuthFeedback must be used within AuthFeedbackProvider');
  }

  return context;
}
