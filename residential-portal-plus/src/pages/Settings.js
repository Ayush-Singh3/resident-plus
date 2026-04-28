import React, { useState } from 'react';
import ErrorNotice from '../components/ErrorNotice';
import PageHeader from '../components/PageHeader';
import { DEFAULT_API_BASE, getApiBase, setApiBase } from '../services/api/config';

export default function Settings(){
  const [formValues, setFormValues] = useState({
    apiBase: getApiBase(),
    supportEmail: 'operations@residentplus.com',
  });
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
    setSavedMessage('');
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formValues.apiBase.trim()) {
      nextErrors.apiBase = 'API base is required.';
    }

    if (!formValues.supportEmail.trim()) {
      nextErrors.supportEmail = 'Support email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.supportEmail)) {
      nextErrors.supportEmail = 'Enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const savedBase = setApiBase(formValues.apiBase);
    setFormValues((currentValues) => ({ ...currentValues, apiBase: savedBase || DEFAULT_API_BASE }));
    setSavedMessage('Settings saved. New API requests will use the updated base path.');
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Validate configuration locally before requests are sent, and keep API behavior predictable."
      />
      <div className="card" style={{marginTop:8}}>
        <div className="small">Application settings and preferences</div>
        <form className="settings-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="small">API Base</span>
            <input
              className={`input${errors.apiBase ? ' input-error' : ''}`}
              name="apiBase"
              value={formValues.apiBase}
              onChange={handleChange}
              placeholder="/mock"
            />
            <span className="small">Use a relative path such as `/mock` for the bundled mock data.</span>
            <ErrorNotice message={errors.apiBase} compact />
          </label>

          <label className="field">
            <span className="small">Support Email</span>
            <input
              className={`input${errors.supportEmail ? ' input-error' : ''}`}
              name="supportEmail"
              type="email"
              value={formValues.supportEmail}
              onChange={handleChange}
              placeholder="ops@residentplus.com"
            />
            <span className="small">Required for outbound notifications and admin workflows.</span>
            <ErrorNotice message={errors.supportEmail} compact />
          </label>

          <div className="toolbar">
            <button type="submit" className="btn">Save settings</button>
            {savedMessage ? <span className="small success-copy">{savedMessage}</span> : null}
          </div>
        </form>
      </div>
    </div>
  );
}
