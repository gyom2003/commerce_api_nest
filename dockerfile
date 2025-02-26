FROM node:14-alpine
USER node
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN ["npm", "run", "start"]