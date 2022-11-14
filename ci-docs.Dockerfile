#!/usr/bin/env bash

FROM nginx:1.17.1-alpine
COPY nginx-docs.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/apps/docs /usr/share/nginx/html
