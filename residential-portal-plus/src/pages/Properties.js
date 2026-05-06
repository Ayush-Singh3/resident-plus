import React from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { useProperties } from '../hooks/useProperties';

function PropertyRow({ p, onDelete, disabled }){
  return (
    <tr>
      <td>{p.id}</td>
      <td>{p.address}</td>
      <td>{p.city}</td>
      <td>{p.units}</td>
      <td><button onClick={()=>onDelete(p.id)} className="btn btn-danger" disabled={disabled}>Delete</button></td>
    </tr>
  )
}

export default function Properties(){
  const { data, error, isLoading, isDeleting, reload, clearError, removeProperty } = useProperties();

  const del = async (id) => {
    await removeProperty(id);
  };

  return (
    <div>
      <h2>Properties</h2>
      <ErrorState error={error} onRetry={reload} onDismiss={clearError} />
      <div className="card" style={{marginTop:8}}>
        {isLoading ? <div className="small">Loading properties...</div> : null}
        {!isLoading && !error && data.length === 0 ? (
          <EmptyState title="No properties found" message="Properties will appear here once they are available." />
        ) : null}
        {!error && data.length > 0 ? (
          <table className="table"><thead><tr><th>ID</th><th>Address</th><th>City</th><th>Units</th><th></th></tr></thead>
          <tbody>
            {data.map((p) => <PropertyRow key={p.id} p={p} onDelete={del} disabled={isDeleting} />)}
          </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
