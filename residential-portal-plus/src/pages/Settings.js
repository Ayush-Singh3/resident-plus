import React, { useState } from 'react';
import InlineFieldError from '../components/InlineFieldError';
import { loadSettings, saveSettings } from '../services/settingsService';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSettings(values) {
  const nextErrors = {};

  if (!values.managerName.trim()) {
    nextErrors.managerName = 'Manager name is required.';
  }

  if (!values.notificationEmail.trim()) {
    nextErrors.notificationEmail = 'Notification email is required.';
  } else if (!emailPattern.test(values.notificationEmail.trim())) {
    nextErrors.notificationEmail = 'Enter a valid email address.';
  }

  if (!values.apiBase.trim()) {
    nextErrors.apiBase = 'API base is required.';
  }

  return nextErrors;
}

export default function Settings(){
  const [formValues, setFormValues] = useState(() => loadSettings());
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    setStatusMessage('');
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateSettings(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatusMessage('Please correct the highlighted fields before saving.');
      return;
    }

    setIsSaving(true);
    setStatusMessage('');

    try {
      await saveSettings({
        managerName: formValues.managerName.trim(),
        notificationEmail: formValues.notificationEmail.trim(),
        apiBase: formValues.apiBase.trim(),
      });
      setStatusMessage('Settings saved successfully.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className="card" style={{marginTop:8}}>
        <div className="small">Application settings and preferences</div>
        <form className="settings-form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span className="small">Manager Name</span>
            <input
              className="input"
              name="managerName"
              value={formValues.managerName}
              onChange={onChange}
              disabled={isSaving}
            />
            <InlineFieldError message={errors.managerName} />
          </label>

          <label className="field">
            <span className="small">Notification Email</span>
            <input
              className="input"
              name="notificationEmail"
              type="email"
              value={formValues.notificationEmail}
              onChange={onChange}
              disabled={isSaving}
            />
            <InlineFieldError message={errors.notificationEmail} />
          </label>

          <label className="field">
            <span className="small">API Base</span>
            <input
              className="input"
              name="apiBase"
              value={formValues.apiBase}
              onChange={onChange}
              disabled={isSaving}
            />
            <InlineFieldError message={errors.apiBase} />
          </label>

          <div className="toolbar">
            <button className="btn" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
            {statusMessage ? <div className="small">{statusMessage}</div> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
