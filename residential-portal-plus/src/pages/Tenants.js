import React from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { useTenants } from '../hooks/useTenants';

export default function Tenants(){
  const { data: tenants, error, isLoading, execute } = useTenants();

  return (
    <div>
      <h2>Tenants</h2>
      <ErrorState error={error} onRetry={execute} />
      <div className="card" style={{marginTop:8}}>
        {isLoading ? <div className="small">Loading tenants...</div> : null}
        {!isLoading && !error && tenants.length === 0 ? (
          <EmptyState title="No tenants found" message="Tenant records will appear here once they are available." />
        ) : null}
        {!error && tenants.length > 0 ? (
          <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Unit</th><th>Phone</th></tr></thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.unit}</td><td>{t.phone}</td></tr>
            ))}
          </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
