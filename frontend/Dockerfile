FROM node:20.9.0-alpine3.17

WORKDIR /app

# Permet le hot reload
RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

COPY package*.json ./

RUN npm i

COPY ./.env.local ./.env
COPY ./tsconfig.json ./tsconfig.json
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./next.config.mjs ./next.config.mjs
COPY ./tailwind.config.ts ./tailwind.config.ts
COPY ./postcss.config.mjs ./postcss.config.mjs
COPY ./public ./public
COPY ./src ./src

CMD npm run dev
