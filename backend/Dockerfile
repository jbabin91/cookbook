FROM node:latest

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json /usr/app

COPY .env /usr/app

RUN npm install

EXPOSE 3001

CMD [ "npm", "run", "dev" ]