import React from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useTenants from '../hooks/useTenants';

export default function Tenants(){
  const { tenants, error, isLoading, retry } = useTenants();

  if (error) {
    return <ErrorState message={error.message} onRetry={() => retry().catch(() => {})} />;
  }

  return (
    <div>
      <h2>Tenants</h2>
      <div className="card" style={{marginTop:8}}>
        {isLoading && !tenants.length ? (
          <div className="small">Loading tenants...</div>
        ) : !tenants.length ? (
          <EmptyState
            title="No tenants found"
            message="Tenant details will appear here after records are created."
          />
        ) : (
          <table className="table"><thead><tr><th>ID</th><th>Name</th><th>Unit</th><th>Phone</th></tr></thead>
          <tbody>
            {tenants.map(t=> (
              <tr key={t.id}><td>{t.id}</td><td>{t.name}</td><td>{t.unit}</td><td>{t.phone}</td></tr>
            ))}
          </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
