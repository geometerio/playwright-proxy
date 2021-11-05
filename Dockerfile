FROM mcr.microsoft.com/playwright:focal

LABEL description "Geometer Playwright server proxy"
LABEL version     "0.1.16"
LABEL maintainer  "atg@geometer.io"

WORKDIR /usr/local/geo-playwright

COPY    ["package.json", "package-lock.json", "pkg", "./"]
# TODO: double-check whether we need to skip the browser installs.
RUN     npm install --production

EXPOSE  8080
CMD     ["npm", "start"]
