#!/bin/sh
pg_createcluster 12 main -- --username=cooluser
pg_ctlcluster 12 main start
cd ./frontend 
npm run build
cd ..
cd ./backend
npm install
node endpoints.js
