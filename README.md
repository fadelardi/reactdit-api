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

## To initialize the db

``` 
npm run createdb
```

Or if you just want to develop (linting plus nodemon for reloading app when it detects changes): 

```
npm run dev
```
