FROM node:20.10-alpine
LABEL authors="Leonardo Lima"
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . /app
# RUN npm run dev
EXPOSE 3000
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]

