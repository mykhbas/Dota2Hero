FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./prisma prisma
COPY . .

RUN npm install -g prisma
RUN apk add --no-cache postgresql-client
RUN npx prisma generate

EXPOSE 3000 
CMD [ "sh", "-c", "npx prisma db push && npm run dev" ]
