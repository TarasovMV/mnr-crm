# Base image
FROM node:18

# Create app directory
WORKDIR /usr/bin

# A wildcard is used to ensure both package.json AND package-lock.json are copied
#COPY package*.json ./
#COPY decorate-angular-cli.js ./

COPY . .

# Install app dependencies
RUN npm i --force
#CMD ["npm run i --force"]

# Bundle app source
#COPY . .

# Creates a "dist" folder with the production build
RUN nx build backend

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
