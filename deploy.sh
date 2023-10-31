#!/bin/sh
pg_ctl -D ./db-data start
cd ./vue-project 
npm run build