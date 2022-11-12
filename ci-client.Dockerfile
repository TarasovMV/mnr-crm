FROM nginx:1.17.1-alpine
COPY nginx-client.conf /etc/nginx/nginx.conf
COPY /dist/apps/client /usr/share/nginx/html
