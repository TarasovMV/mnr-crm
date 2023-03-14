---
sidebar_position: 1
---

# Инструкция по деполю

## Общая информация

- Установить гит
- Клонировать репозиторий (лучше сразу сделать его форк)
- Перевести проект на другой Docker hub

### Настройка сервера (unix система):
- Установить nginx
- Установить docker
- Настроить nginx - ssl, домен, proxy
- Установить базу данных MongoDB и установить дамп последней версии БД
- Перенести медиа файлы (фотографии) в директорию, путь которой учитывать при запуске контейнера с api

### Вариант с использованием github actions:
- Убрать из пайплайнов сборку документации (если не требуется)
- Настроить секреты
- Сделать комит в ветку master для запуска пайплайнов (или перенастроить по кнопке)

### Ручная сборка (1 вариант):
- Установить NodeJS LTS версию
- Выполнить команду npm install —legacy-peer-deps
- Выполнить команду `npx nx build client`
- Выполнить команду `npx nx build backend`
- Выполнить сборку докер образов `(ci-backend, ci-client)`
- Перенести докер образы на сервер (можно использовать любой Docker repository)
- Выполнить запуск докер образов

### Ручная сборка (2 вариант):
- Выполнить сборку докер образов `(backend, client)`
- Перенести докер образы на сервер (можно использовать любой Docker repository)
- Выполнить запуск докер образов

## Команды и переменные

### Команды

- Запуск backend контейнера - `docker run -d --env-file="${PATH_TO_ENV}" --network="host" -v ${PATH_TO_IMAGES_ON_PC}:/usr/src/app/dist/apps/backend/chat-images --name ${CONTAINER_NAME} --rm ${TAG_NAME}`
- Запуск frontend контейнера - `docker run -p${EXTERNAL_PORT}:4200 ${TAG_NAME}`
- Сборка образа - `docker build --platform linux/amd64 -t ${TAG_NAME} -f ${DOCKERFILE_NAME} .`

### Переменные
- Создать на сервере .env файл и добавить туда переменную DB_URL - `DB_URL="mongodb://dbReadWrite:${PASS}@${URL}/${DB_NAME}"`
- GitHub Actions
  - DOCKERHUB_TOKEN
  - DOCKERHUB_HOST
  - SSH_HOST
  - SSH_PRIVATE_KEY

### Конфигурации

- nginx-client.conf - настройка nginx внутри docker контейнера клиентского приложения
- при настройке nginx на сервере учитывать
  - порт backend приложения - 3333
  - порт client приложения - 4200
  - client и backend расположены на 1 домене (в противном случае нужно перенастроить внутренний `nginx-client.conf` и перенаправить запросы с `/api` на другой хост, так же нужно учесть CORS)
  - backend расположен на /api
- для работы приложения в режиме PWA необходим SSL

### Полезные ссылки

- [GitHub project](https://github.com/TarasovMV/mnr-crm)
- [Project URL](https://mnr-crm.ru)
