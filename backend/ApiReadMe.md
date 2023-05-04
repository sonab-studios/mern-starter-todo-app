# Backend Service

## Pre-requisite

Node.js latest LTS (v18.16.0)
Run MongDB service: see DbReadMe.md in database folder

## Steps

-   Install dependencies: `npm install`
-   Run on local: `npm run start:dev`
-   To run tests: `npm run test`

## Environment Variables

Create a \*.env file with the following example.
e.g.
AUTH_SECRET_KEY=secret
DB_CONNECTION_URL=127.0.0.1:27017
DB_NAME=test
DB_USER=root
DB_PASSWORD=password
PORT=8080

## Authentication

-   POST /users/login [email, password] - includes token in response
-   POST /users/logout - removes user token
-   Header: Authorization: Bearer <token>

## API Methods

###### URL Params

*lid: list id
*iid: item id

### Create

-   POST /list --- params: { name }
-   POST /list/:lid/items --- params: { title, details }

### Update

-   PATCH lists/:lid --- params: { name }
-   PATCH lists/:lid/items/:iid --- params: { title, details }

### Delete

-   DELETE lists/:lid
-   DELETE lists/:lid/items/:iid

### Read

-   GET /lists/
-   GET /lists/:lid