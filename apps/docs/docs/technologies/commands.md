---
sidebar_position: 3
---

# Полезные команды

## Nginx config
Etc -> nginx -> nginx.conf

## Commands

### Apps

docker build --platform linux/amd64 -t antantaru/mnr-backend -f backend.Dockerfile .

**Back run:**
docker run --env-file="docker_vars.env" --network="host" antantaru/mnr-backend

**Docs run:**  
docker run -p3000:3000 antantaru/mnr-docs

**Client run:**  
docker run -p4200:4200 antantaru/mnr-client

### DB

Рестор выполнять в новый докер образ

docker exec -i 1b7818b614d6 sh -c 'mongodump -d mnr-crm -u dbReadWrite -p ${PASS} --archive' > db.dump
docker exec -i 1b7818b614d6 sh -c 'mongorestore --gzip --archive' < db.dump

docker network create -d bridge mnr-crm-net

### Варианты разворачивания базы данных

1) Без пароля, но без возможности подключиться извне
   - Создать bridge `docker network create -d bridge <name>`
   - Запустить базу данных с использованием сети `docker run --network=<name> mongo:4.4.6`
   - Проверить ip адрес внутренней сети `docker network inspect mnr-crm-net`
   - Полный пример запуска приложения `docker run -p3333:3333 --network=mnr-crm-net -e DB_URL="mongodb://172.18.0.2:27017/mnr-crm" antantaru/mnr-backend`

2) С паролем
   - Запустить контейнер с конфигурацией с пользователем
   - 

### NGINX

- sudo systemctl reload nginx
- sudo systemctl start nginx
- sudo systemctl status nginx

### CRON

- crontab -l
- crontab -e

### NX
nx print-affected --type=app --select=projects
