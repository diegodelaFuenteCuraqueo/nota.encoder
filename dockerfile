FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk upgrade
RUN apk add nodejs npm
RUN apk add ffmpeg
RUN npm install -g nodemon
RUN npm install
RUN npm prune --production

COPY . .

ENV PORT=9090

EXPOSE 9090

CMD ["npm", "start"]

