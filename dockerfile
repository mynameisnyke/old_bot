FROM node:13-alpine
WORKDIR /urs/app
COPY package.json .
RUN npm install --quiet
RUN npm install nodemon -g
COPY . .
CMD [ "npm", "start" ]