# --- Step 1: React client build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY client/ ./client/
WORKDIR /app/client
RUN npm install && npm run build

# --- Step 2: Express server + dist 配信 ---
FROM node:20-alpine
WORKDIR /app

# サーバーコードをコピー
COPY server/ ./server/

# React のビルド成果物をコピー
COPY --from=builder /app/client/dist ./client/dist

# サーバーディレクトリに移動して依存関係をインストール（本番用）
WORKDIR /app/server
RUN npm install --omit=dev

# Cloud Run が利用するポートを明示
EXPOSE 5000

# アプリ起動
CMD ["node", "server.mjs"]
