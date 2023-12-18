FROM node:20-alpine
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /app
COPY ./package* ./
RUN npm ci && \
  npm cache clean --force
COPY ./src ./src
# Start the app
CMD ["node", "src/index.js"]