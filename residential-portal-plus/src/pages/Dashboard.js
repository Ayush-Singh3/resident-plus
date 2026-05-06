import React from 'react';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import useDashboardStats from '../hooks/useDashboardStats';

export default function Dashboard(){
  const { data: stats, error, isLoading, retry } = useDashboardStats();

  if (error) {
    return <ErrorState message={error.message} onRetry={() => retry().catch(() => {})} />;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid cols-3">
        <div className="card"> <div className="small">Properties</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.properties||0}</div></div>
        <div className="card"> <div className="small">Tenants</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tenants||0}</div></div>
        <div className="card"> <div className="small">Open Tickets</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tickets||0}</div></div>
      </div>

      <h3 style={{marginTop:12}}>Recent Activity</h3>
      <div className="card" style={{marginTop:8}}>
        {isLoading && !stats ? (
          <div className="small">Loading dashboard metrics...</div>
        ) : stats?.recent?.length ? (
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(stats.recent, null, 2)}</pre>
        ) : (
          <EmptyState
            title="No recent activity"
            message="Recent lease, payment, and maintenance updates will appear here."
          />
        )}
      </div>
    </div>
  );
}
