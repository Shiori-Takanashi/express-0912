#!/bin/zsh

echo "=== Express-0912 開発環境セットアップ & 起動 ==="

# プロジェクトルートディレクトリの確認
if [[ ! -f "package.json" && ! -d "client" && ! -d "server" ]]; then
    echo "エラー: プロジェクトルートディレクトリで実行してください"
    exit 1
fi

# 既存のプロセスを終了
echo "� 既存のプロセスをチェック中..."
pkill -f "npm run dev" 2>/dev/null || true
pkill -f "node server.mjs" 2>/dev/null || true

echo "�📦 依存関係のインストール中..."

# Clientの依存関係インストール
echo "🔧 Client依存関係をインストール中..."
cd client
if ! npm install; then
    echo "❌ Clientの依存関係インストールに失敗しました"
    exit 1
fi
echo "✅ Client依存関係インストール完了"

# Serverの依存関係インストール
echo "🔧 Server依存関係をインストール中..."
cd ../server
if ! npm install; then
    echo "❌ Serverの依存関係インストールに失敗しました"
    exit 1
fi
echo "✅ Server依存関係インストール完了"

cd ..

echo ""
echo "🚀 開発サーバーを起動中..."

# Serverをバックグラウンドで起動
echo "⚡ Backend server を起動中..."
cd server
npm run dev &
SERVER_PID=$!
cd ..

# サーバーの起動を少し待つ
sleep 3

# Clientを起動（フォアグラウンド）
echo "⚡ Frontend server を起動中..."
cd client

echo ""
echo "🌟 開発環境が起動しました！"
echo "🌐 アクセス先:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:5000"
echo ""
echo "⚠️  終了方法: Ctrl+C を押してください"
echo ""

# 終了時の処理を設定
trap 'echo "\n🛑 サーバーを停止中..."; kill $SERVER_PID 2>/dev/null; exit 0' INT

# Clientを起動（これがメインプロセス）
npm run dev
