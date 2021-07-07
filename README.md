# User-Service

## Setup PostgresSQL Docker

docker pull postgres

## 1. Create a folder in a known location for you

mkdir ${HOME}/postgres-data/

## 2. run the postgres image

docker run -d --name dev-postgres -e POSTGRES_PASSWORD=User2021!Crowd -v ${HOME}/postgres-data/:/var/lib/postgresql/data -p 5432:5432 postgres

## 3. check that the container is running

docker ps

## 4. Docker exec

docker exec -it dev-postgres bash

Now you are in the container's bash console. Connect to the database

> > > psql -h localhost -U postgres
