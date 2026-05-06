import React from 'react';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useDashboardStats } from '../hooks/useDashboardStats';

export default function Dashboard(){
  const { data: stats, error, isLoading, execute } = useDashboardStats();

  return (
    <div>
      <h2>Dashboard</h2>
      <ErrorState error={error} onRetry={execute} />
      <div className="grid cols-3">
        <div className="card"> <div className="small">Properties</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.properties||0}</div></div>
        <div className="card"> <div className="small">Tenants</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tenants||0}</div></div>
        <div className="card"> <div className="small">Open Tickets</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tickets||0}</div></div>
      </div>

      <h3 style={{marginTop:12}}>Recent Activity</h3>
      <div className="card" style={{marginTop:8}}>
        {isLoading ? <div className="small">Loading dashboard data...</div> : null}
        {!isLoading && !error && (!stats?.recent || stats.recent.length === 0) ? (
          <EmptyState title="No recent activity" message="New tenant and maintenance activity will appear here." />
        ) : null}
        {!error && stats?.recent?.length ? (
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(stats.recent, null, 2)}</pre>
        ) : null}
      </div>
    </div>
  );
}
