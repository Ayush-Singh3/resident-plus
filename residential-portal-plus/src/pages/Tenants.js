import React, { useCallback } from 'react';
import ErrorNotice from '../components/ErrorNotice';
import PageHeader from '../components/PageHeader';
import useApiQuery from '../hooks/useApiQuery';
import { getTenants } from '../services/tenantService';

export default function Tenants(){
  const fetchTenants = useCallback(() => getTenants(), []);
  const { data: tenants, error, refetch } = useApiQuery(fetchTenants, []);

  return (
    <div>
      <PageHeader
        title="Tenants"
        description="Resident records now use the same shared API lifecycle and error handling as the rest of the app."
        action={<button type="button" className="btn" onClick={refetch}>Refresh</button>}
      />
      <ErrorNotice message={error} compact />
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
