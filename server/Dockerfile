FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install --production=false

COPY . .
EXPOSE 3000

CMD ["npm", "start"]

