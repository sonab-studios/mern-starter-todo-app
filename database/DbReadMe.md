# MongoDB Service
author: Jayson Nabor

## Pre-requisite
Install docker at https://www.docker.com/

## Environment Variables
Create .env file with the following variables.  

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=test

## Steps
Run the mongodb service locally, using the following commands.

```bash
docker-compose build
docker-compose up -d
```
