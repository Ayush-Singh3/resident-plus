import React, { useMemo, useState } from 'react';
import { getSettings, saveSettings } from '../services/settingsService';

function validate(values) {
  const errors = {};

  if (!values.apiBase.trim()) {
    errors.apiBase = 'API base is required.';
  }

  if (!values.contactEmail.trim()) {
    errors.contactEmail = 'Notification email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.contactEmail)) {
    errors.contactEmail = 'Enter a valid email address.';
  }

  return errors;
}

export default function Settings(){
  const initialSettings = useMemo(() => getSettings(), []);
  const [values, setValues] = useState(initialSettings);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      saveSettings(values);
      setStatus('Settings saved successfully.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className="card" style={{marginTop:8}}>
        <div className="small">Application settings and preferences</div>
        <form style={{marginTop:12}} onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="small" htmlFor="apiBase">API Base</label>
            <input id="apiBase" name="apiBase" className="input" value={values.apiBase} onChange={handleChange} disabled={isSaving} />
            {errors.apiBase ? <div className="field-error">{errors.apiBase}</div> : null}
          </div>
          <div className="form-field">
            <label className="small" htmlFor="contactEmail">Notification Email</label>
            <input id="contactEmail" name="contactEmail" type="email" className="input" value={values.contactEmail} onChange={handleChange} disabled={isSaving} />
            {errors.contactEmail ? <div className="field-error">{errors.contactEmail}</div> : null}
          </div>
          <div className="form-field">
            <label className="small" htmlFor="authToken">Auth Token</label>
            <input id="authToken" name="authToken" className="input" value={values.authToken} onChange={handleChange} disabled={isSaving} />
          </div>
          <div className="toolbar" style={{marginTop:12}}>
            <button className="btn" type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save settings'}
            </button>
            {status ? <div className="small">{status}</div> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
