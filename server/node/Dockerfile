FROM node:9.5.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN mkdir -p /etc/letsencrypt \
 && npm install
COPY . .
EXPOSE 443
ENTRYPOINT ["npm", "start"]
