FROM node:9-alpine

WORKDIR /home/node/app

COPY . .

# Expose ports (for orchestrators and dynamic reverse proxies)
EXPOSE 3000

# Start the app
CMD yarn start
