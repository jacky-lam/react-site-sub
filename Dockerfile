# base image
FROM node:15.6.0

# ENV NPM_VERSION 7.0.8
# ENV YARN_VERSION 1.22.4

# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir /app
WORKDIR /app
RUN apt-get update && apt-get clean

# COPY package*.json ./
COPY package.json ./
COPY yarn.lock ./

# Installing dependencies
RUN yarn install
# RUN npm install -g npm@${NPM_VERSION}

# Copying source files
COPY . .


# ---------- Dev mode (hot reload) ----------
# Yarn: run dev mode
CMD [ "yarn", "run", "dev"]

# NPM: run dev mode
# CMD [ "npm", "run", "dev"]

# ---------- Prod mode ----------
# TODO