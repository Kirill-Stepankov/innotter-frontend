FROM node:18.13.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]