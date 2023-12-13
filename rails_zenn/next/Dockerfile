FROM node:19.4.0 
WORKDIR /home/node/app

COPY **package.json ./
RUN npm install

USER node 

CMD ["npm", "install"]