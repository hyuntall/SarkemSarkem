FROM node:16

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

ENV WDS_SOCKET_PORT 0

EXPOSE 3000

CMD ["npm", "start"]