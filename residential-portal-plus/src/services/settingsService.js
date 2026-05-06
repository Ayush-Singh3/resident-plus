const SETTINGS_STORAGE_KEY = 'resident-plus-settings';

const defaultSettings = {
  managerName: '',
  notificationEmail: '',
  apiBase: '/mock',
};

export function loadSettings() {
  const rawSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!rawSettings) {
    return defaultSettings;
  }

  try {
    return { ...defaultSettings, ...JSON.parse(rawSettings) };
  } catch (_error) {
    return defaultSettings;
  }
}

export function saveSettings(values) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(values));
      resolve(values);
    }, 400);
  });
}

export { defaultSettings };
