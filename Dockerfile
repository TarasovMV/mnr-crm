# Base image
FROM node

ENV DB_URL default
#ARG DB_URL_ARG

# Create app directory
WORKDIR /usr/bin

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY decorate-angular-cli.js ./

# Install app dependencies
RUN npm ci --legacy-peer-deps

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build backend

# Start the server using the production build
CMD node dist/apps/backend/main.js DB_URL=${DB_URL}
