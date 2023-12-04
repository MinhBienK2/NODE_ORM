FROM node:16
LABEL maintainer="Minh Bien <phamminhbien333@gmailcom>"

WORKDIR /app/node_orm

RUN mkdir -p /node_modules && chown node:node -R /node_modules /app
RUN npm install -g pm2

USER node

COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . ./

EXPOSE 3000