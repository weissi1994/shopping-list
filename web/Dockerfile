FROM node:latest
ADD . /nodeapp
WORKDIR /nodeapp
CMD node index.js

RUN npm install
RUN npm run build
