import React from 'react';

export default function PageHeader({ title, description, action }) {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        {description ? <p className="small header-copy">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
