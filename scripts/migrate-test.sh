#!/bin/sh

# run migrate
NODE_ENV=test npx sequelize-cli db:migrate && 

# run seed
NODE_ENV=test npx sequelize-cli db:seed:all
