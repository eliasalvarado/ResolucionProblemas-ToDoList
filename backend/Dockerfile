FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY prisma ./prisma/

COPY generated ./generated/

RUN npx prisma generate

COPY . .

CMD ["sh", "-c", "npx prisma generate && npm run dev"]
