# reactdit-api

API for [reactdit](../../../reactdit) built with ExpressJS+postgres. 

This app is simple and small, intended as a microservice backend for the presentational layer.

The same disclaimer as reactdit stands: this is just a personal project intended for learning purposes and it's neither production ready, nor intended to actually compete with reddit. 

## Tech Stack

- Node+Express
- postgres DB
- Docker
- Gulp (for linting, and for nodemon reloading)

## How to run

```
node api.js
```

Or if you just want to develop (linting plus nodemon for reloading app when it detects changes): 

```
npm run dev
```

## To initialize the db

You can find the structure of the db inside *docker/docker-entrypoint-initdb.d/reactdit-db.sql*. As the name suggests, the db is hosted on a docker container. To initalize for the first time, run: 

``` 
npm run createdb
```

If you want to start the container again for whatever reason, you can run: 

```
npm run db
``` 

Check package.json for the details of these commands. 



