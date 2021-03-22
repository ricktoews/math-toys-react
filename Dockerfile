FROM node:latest as build

RUN mkdir /usr/src/app

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json

RUN npm install

COPY . /usr/src/app

#CMD [ "npm", "start" ]
RUN npm run build


FROM nginx:1.19.8-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY --from=build /usr/src/app/nginx-config/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/nginx-config/ssl /etc/nginx/ssl
