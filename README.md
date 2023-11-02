# COSC 3380 Project

## Prerequisites
- Node V21+
- Nginx

`npm install` in the `frontend` and `backend` folders

## Starting the project
Must be on a unix system

Start using
```
./deploy.sh
```

Nginx has to exist and point to `./frontend/dist/index.html`

Stop DB and wipe it using
```
./stop.sh
```