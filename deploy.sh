#!/bin/sh
pg_ctl -D ./db-data init
pg_ctl -D ./db-data start
cd ./frontend
npm install
npm run build
cd ..
cd ./backend
npm install
node endpoints.js
