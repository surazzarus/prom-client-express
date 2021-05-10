FROM node:10.16.0-slim

# Installing nodemon globally to be able to restart on file change
RUN npm install nodemon -g

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

ENV PORT=4000
EXPOSE 4000

CMD [npm run start]
