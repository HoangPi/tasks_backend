FROM node:20
WORKDIR /code
COPY ./package*.json .
RUN npm install
COPY . .
CMD [ "npm", "run", "start:dev" ]