FROM mhart/alpine-node:base-8
WORKDIR /app
COPY /dist ./
EXPOSE 3000
CMD ["node", "index.js"]