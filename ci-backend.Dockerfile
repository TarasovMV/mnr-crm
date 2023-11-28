FROM node:18.2.0-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV DB_URL default

COPY . .
CMD node dist/apps/backend/main.js DB_URL=${DB_URL}
