import React, { useState } from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useProperties from '../hooks/useProperties';

function PropertyRow({ p, onDelete, isDeleting }){
  return (
    <tr>
      <td>{p.id}</td>
      <td>{p.address}</td>
      <td>{p.city}</td>
      <td>{p.units}</td>
      <td>
        <button
          onClick={() => onDelete(p.id)}
          className="btn"
          style={{ background:'#ef4444' }}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  )
}

export default function Properties(){
  const { properties, error, isLoading, retry, removeProperty } = useProperties();
  const [deletingId, setDeletingId] = useState(null);
  const [actionError, setActionError] = useState('');

  const del = async (id) => {
    setDeletingId(id);
    setActionError('');

    try {
      await removeProperty(id);
    } catch (requestError) {
      if (requestError?.shouldDisplay !== false) {
        setActionError(requestError.message);
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return <ErrorState message={error.message} onRetry={() => retry().catch(() => {})} />;
  }

  return (
    <div>
      <h2>Properties</h2>
      {actionError ? <div className="card error-banner">{actionError}</div> : null}
      <div className="card" style={{marginTop:8}}>
        {isLoading && !properties.length ? (
          <div className="small">Loading properties...</div>
        ) : !properties.length ? (
          <EmptyState
            title="No properties found"
            message="Property records will appear here after they are added."
          />
        ) : (
          <table className="table"><thead><tr><th>ID</th><th>Address</th><th>City</th><th>Units</th><th></th></tr></thead>
          <tbody>
            {properties.map((p) => (
              <PropertyRow
                key={p.id}
                p={p}
                onDelete={del}
                isDeleting={deletingId === p.id}
              />
            ))}
          </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
