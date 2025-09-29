# Residential Portal Plus (sample-taggingai)

This copy of Residential Portal Plus lives under `/home/aysingh/sample-taggingai/residential-portal-plus`.

How to run (dev):

```bash
cd /home/aysingh/sample-taggingai/residential-portal-plus
npm install
npm start
```

Optional: run mock server (serves dynamic responses on port 4002):

```bash
npm run mock-server
# or
node mock-server/server.js
```

The dev server serves `public/mock/*` so API calls to `/mock/*` succeed without a backend. Use this folder for testing the tagging tool across multiple files and patterns.
