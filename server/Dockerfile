FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN yarn 

COPY . .


EXPOSE 1337

CMD ["yarn", "dev"]