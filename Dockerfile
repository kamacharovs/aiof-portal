FROM node:latest

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

ENV LISTEN_PORT=80
EXPOSE 80
COPY . ./
CMD ["npm", "start"]