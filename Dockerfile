FROM ghcr.io/puppeteer/puppeteer:19.7.2

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the unpacked Chrome extension into the container
COPY Chrome-Extension-Base-Template-master /usr/src/app/Chrome-Extension-Base-Template-master

# Set up Puppeteer to use the unpacked extension
ENV PUPPETEER_EXTENSIONS=/usr/src/app/Chrome-Extension-Base-Template-master
# Copy the rest of the application code
COPY . .

CMD [ "node", "index.js" ]