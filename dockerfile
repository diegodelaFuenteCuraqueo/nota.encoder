FROM node:17

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

RUN apt install ffmpeg -y
RUN npm install -g nodemon
RUN npm install

COPY . .

ENV PORT=9090

EXPOSE 9090

CMD ["npm", "start"]

