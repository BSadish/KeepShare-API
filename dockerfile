FROM node:18-alpine

#Creating a app directory
WORKDIR /app

#Install app dependencies
COPY  package.json ./

#Run npm install
RUN npm install


#Bundle app source
COPY . .

EXPOSE 8000

CMD ["npm", "start"]