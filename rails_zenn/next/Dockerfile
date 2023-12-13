FROM node:19.4.0 
RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node 
COPY --chown=node:node package.json package-lock.json* ./

RUN npm install 

COPY --chown=node:node . .