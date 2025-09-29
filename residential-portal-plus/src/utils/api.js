// lightweight mock API client that talks to the local mock JSON files under /mock
const API_ROOT = '/mock';

async function fetchJson(url, opts){
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error('HTTP '+res.status);
  return res.json();
}

export default {
  get: (path) => fetchJson(API_ROOT + path),
  post: (path, body) => fetchJson(API_ROOT + path, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
};
