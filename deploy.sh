#!/bin/sh
pg_ctl -D ./db-data init
pg_ctl -D ./db-data start
cd ./frontend 
npm run build
cd ..
cd ./backend
node endpoints.js