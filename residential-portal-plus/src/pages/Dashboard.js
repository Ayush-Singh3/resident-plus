import React, { useEffect, useState } from 'react';
import api from '../utils/api';

export default function Dashboard(){
  const [stats, setStats] = useState(null);
  useEffect(()=>{ let mounted=true; api.get('/stats').then(r=>{ if(mounted) setStats(r); }).catch(()=>{}); return ()=> mounted=false }, []);
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
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(stats?.recent || [], null, 2)}</pre>
      </div>
    </div>
  );
}
