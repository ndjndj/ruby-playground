FROM node:19.4.0 
WORKDIR /home/node/app

COPY **package.json ./
RUN npm install
COPY ./ ./

USER node 

CMD ["npm", "install"]