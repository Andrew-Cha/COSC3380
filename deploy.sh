#!/bin/sh
pg_ctl -D ./db-data start
cd ./frontend 
npm run build