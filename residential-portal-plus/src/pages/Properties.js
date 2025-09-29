import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function PropertyRow({p, onDelete}){
  return (
    <tr>
      <td>{p.id}</td>
      <td>{p.address}</td>
      <td>{p.city}</td>
      <td>{p.units}</td>
      <td><button onClick={()=>onDelete(p.id)} className="btn" style={{background:'#ef4444'}}>Delete</button></td>
    </tr>
  )
}

export default function Properties(){
  const [list, setList] = useState([]);
  useEffect(()=>{ let mounted=true; api.get('/properties').then(r=>{ if(mounted) setList(r); }); return ()=> mounted=false }, []);
  const del = async (id)=>{ await api.post('/properties/delete',{id}); setList(l=>l.filter(x=>x.id!==id)); };
  return (
    <div>
      <h2>Properties</h2>
      <div className="card" style={{marginTop:8}}>
        <table className="table"><thead><tr><th>ID</th><th>Address</th><th>City</th><th>Units</th><th></th></tr></thead>
        <tbody>
          {list.map(p=> <PropertyRow key={p.id} p={p} onDelete={del} />)}
        </tbody>
        </table>
      </div>
    </div>
  );
}
