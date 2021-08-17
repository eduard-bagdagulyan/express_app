FROM node:lts

WORKDIR /express_app

COPY . . 

RUN npm install

CMD npm run dev