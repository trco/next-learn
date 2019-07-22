#
# Load Dependencies
#
FROM node:10-alpine as compiler

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY components ./src/components
COPY pages ./src/pages

RUN npm install && npm run build

#
# Application
#
FROM keymetrics/pm2:10-alpine

WORKDIR /app

RUN apk add git

COPY pm2.config.js .
COPY --from=compiler /app .

EXPOSE 8080
CMD ["pm2-runtime", "--raw", "start", "pm2.config.js"]
