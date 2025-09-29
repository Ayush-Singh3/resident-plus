import React from 'react';

export default function Settings(){
  return (
    <div>
      <h2>Settings</h2>
      <div className="card" style={{marginTop:8}}>
        <div className="small">Application settings and preferences</div>
        <div style={{marginTop:8}}>
          <label className="small">API Base: <input className="input" defaultValue="/mock" style={{marginLeft:8}} /></label>
        </div>
      </div>
    </div>
  );
}
