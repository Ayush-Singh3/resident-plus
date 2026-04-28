import React, { useCallback, useState } from 'react';
import ErrorNotice from '../components/ErrorNotice';
import PageHeader from '../components/PageHeader';
import useApiQuery from '../hooks/useApiQuery';
import { deleteProperty, getProperties } from '../services/propertyService';

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
  const fetchProperties = useCallback(() => getProperties(), []);
  const { data: list, setData: setList, error, refetch } = useApiQuery(fetchProperties, []);
  const [actionError, setActionError] = useState('');

  const del = async (id) => {
    setActionError('');

    try {
      await deleteProperty(id);
      setList((currentList) => currentList.filter((property) => property.id !== id));
    } catch (deleteError) {
      setActionError(deleteError.message || 'Unable to delete this property right now.');
    }
  };

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Manage addresses, units, and portfolio inventory with consistent request handling."
        action={<button type="button" className="btn" onClick={refetch}>Reload list</button>}
      />
      <ErrorNotice message={actionError || error} compact />
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
