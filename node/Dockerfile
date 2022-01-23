FROM node:14-alpine3.13

WORKDIR /home/node/app

COPY . .

RUN npm install

ENTRYPOINT [ "node", "index.js" ]