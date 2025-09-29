import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Tenants(){
  const [tenants, setTenants] = useState([]);
  useEffect(()=>{ let mounted=true; api.get('/tenants').then(r=>{ if(mounted) setTenants(r); }); return ()=> mounted=false }, []);
  return (
    <div>
      <h2>Tenants</h2>
      <div className="card" style={{marginTop:8}}>
        <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Unit</th><th>Phone</th></tr></thead>
        <tbody>
          {tenants.map(t=> (
            <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.unit}</td><td>{t.phone}</td></tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
