FROM arm64v8/node:lts-alpine3.18

ARG TOKEN
ARG CLIENTID
ARG DATABASE_URL
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_PORT

ENV TOKEN=$TOKEN
ENV CLIENTID=$CLIENTID
ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_PORT=$DATABASE_PORT

ENV TZ=Asia/Seoul

WORKDIR /usr/app
COPY ./ ./
RUN npm install

CMD ["node", "main.js"]
