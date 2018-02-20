FROM node:9.5.0-alpine
USER node
ENV NODE_ENV=production
ADD . /home/node/app
EXPOSE 8080
WORKDIR /home/node/app
ENTRYPOINT ["npm", "start"]
