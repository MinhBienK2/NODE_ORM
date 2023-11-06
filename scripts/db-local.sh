#!/bin/sh

# Synchronize with remote master

cd ../docker

docker compose -f redis-compose.yaml up &
docker compose -f mysql-compose.yaml up