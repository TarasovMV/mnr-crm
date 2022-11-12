#STAGE 1
FROM node AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
COPY decorate-angular-cli.js ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build:client

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx-client.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/apps/client /usr/share/nginx/html
