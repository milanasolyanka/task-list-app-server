# server
FROM node:18-alpine 
# AS server-builder

WORKDIR /var/www/app

COPY package*.json ./

RUN apk add --no-cache make gcc g++ python3

RUN npm install -g node-gyp
RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "start"]


# websocket
# FROM node:latest AS websocket-builder

# WORKDIR  /usr/src/app/server

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["node", "./src/chat.js"]
