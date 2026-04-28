import React, { useCallback } from 'react';
import ErrorNotice from '../components/ErrorNotice';
import PageHeader from '../components/PageHeader';
import useApiQuery from '../hooks/useApiQuery';
import { getDashboardStats } from '../services/dashboardService';

export default function Dashboard(){
  const fetchStats = useCallback(() => getDashboardStats(), []);
  const { data: stats, error, refetch } = useApiQuery(fetchStats, null);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Track portfolio health, resident activity, and open issues from a single view."
        action={<button type="button" className="btn" onClick={refetch}>Refresh</button>}
      />
      <ErrorNotice message={error} compact />
      <div className="grid cols-3">
        <div className="card"> <div className="small">Properties</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.properties||0}</div></div>
        <div className="card"> <div className="small">Tenants</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tenants||0}</div></div>
        <div className="card"> <div className="small">Open Tickets</div> <div style={{fontSize:20,fontWeight:800}}>{stats?.tickets||0}</div></div>
      </div>

      <h3 style={{marginTop:12}}>Recent Activity</h3>
      <div className="card" style={{marginTop:8}}>
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(stats?.recent || [], null, 2)}</pre>
      </div>
    </div>
  );
}
