const fs = require('fs');
const path = require('path');
const http = require('http');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),'utf8'));

const server = http.createServer((req,res)=>{
  const url = req.url.split('?')[0];
  res.setHeader('Content-Type','application/json');
  if (url === '/mock/stats') return res.end(JSON.stringify(DATA.stats));
  if (url === '/mock/properties') return res.end(JSON.stringify(DATA.properties));
  if (url === '/mock/tenants') return res.end(JSON.stringify(DATA.tenants));
  if (url === '/mock/properties/delete' && req.method==='POST'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{ const o=JSON.parse(body); // pretend to delete
      // no-op: respond ok
      res.end(JSON.stringify({ok:true}));
    }); return;
  }
  res.statusCode=404; res.end(JSON.stringify({error:'not found'}));
});
server.listen(4002, ()=>console.log('mock server running on http://localhost:4002'));
