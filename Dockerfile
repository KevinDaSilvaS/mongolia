FROM node:alpine

EXPOSE 3170

COPY ./ .

RUN npm i --prod

WORKDIR /src/

CMD node index.js