#STAGE 1
FROM node AS build

ENV DB_URL default

WORKDIR /usr/src/app
COPY package*.json ./
COPY decorate-angular-cli.js ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build backend && npm prune --production --legacy-peer-deps

#STAGE 2
FROM node:alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=build /usr/src/app .
CMD node dist/apps/backend/main.js DB_URL=${DB_URL}
