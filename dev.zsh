#!/bin/zsh


# プロジェクトルートディレクトリの確認
if [[ ! -f "package.json" && ! -d "client" && ! -d "server" ]]; then
    echo "エラー: プロジェクトルートディレクトリで実行してください"
    exit 1
fi

pkill -f "npm run dev" 2>/dev/null || true
pkill -f "node server.mjs" 2>/dev/null || true


cd client
if ! npm install; then
    echo "❌ Clientの依存関係インストールに失敗しました"
    exit 1
fi


cd ../server
if ! npm install; then
    echo "❌ Serverの依存関係インストールに失敗しました"
    exit 1
fi


cd ..


cd server
npm run dev &
SERVER_PID=$!
cd ..

# サーバーの起動を少し待つ
sleep 3


cd client


# 終了時の処理を設定
trap 'echo "\nサーバーを停止中..."; kill $SERVER_PID 2>/dev/null; exit 0' INT

# Clientを起動（これがメインプロセス）
npm run dev
