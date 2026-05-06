import React from 'react';

export default function InlineFieldError({ message }) {
  if (!message) {
    return null;
  }

  return <div className="field-error">{message}</div>;
}
