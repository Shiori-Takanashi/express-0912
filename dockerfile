# --- Step 1: React client build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY client/ ./client/
RUN cd client && npm install && npm run build

# --- Step 2: Express server + dist 配信 ---
FROM node:20-alpine
WORKDIR /app
COPY server/ ./server/
COPY --from=builder /app/client/dist ./client/dist
WORKDIR /app/server
RUN npm install
CMD ["node", "server.mjs"]
