import { API_ROOT, AUTH_TOKEN_KEY } from './http';

const SETTINGS_KEY = 'resident-plus-settings';

const DEFAULT_SETTINGS = {
  apiBase: API_ROOT,
  contactEmail: '',
  authToken: ''
};

export function getSettings() {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    return DEFAULT_SETTINGS;
  }

  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(values) {
  const nextSettings = { ...DEFAULT_SETTINGS, ...values };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));

  if (nextSettings.authToken) {
    localStorage.setItem(AUTH_TOKEN_KEY, nextSettings.authToken);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }

  return nextSettings;
}
