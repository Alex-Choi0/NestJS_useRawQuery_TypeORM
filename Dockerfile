FROM node:16

WORKDIR /nestjs/

COPY package.json /nestjs/
COPY package-lock.json /nestjs/

RUN npm install

COPY . /nestjs/

RUN npm run build

EXPOSE 3000

CMD ["node","dist/main"]