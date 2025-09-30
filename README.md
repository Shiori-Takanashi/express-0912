# Express-0912(ver01) プロジェクト説明書

## アーキテクチャ概要
これはReactフロントエンド（`client/`）とExpress.jsバックエンド（`server/`）を持つフルスタックアプリケーションです。両方ともESモジュール（`"type": "module"`）とモダンなJavaScript機能を使用しています。

### クライアント・サーバー通信
- フロントエンドはVite開発サーバーでバックエンドAPIへのプロキシ設定で動作
- すべてのAPI呼び出しは`/api`エンドポイントを使用 - Viteが`http://localhost:5000`にプロキシ
- 本番環境：Expressが`client/dist`からビルドされたReactアプリを配信

[text](../server/node_modules)### 環境対応デプロイメント
サーバー（`server/server.mjs`）は`NODE_ENV`に基づいて動作を切り替えます：
- **開発環境**: CORS有効、APIのみモード
- **本番環境**: 静的Reactビルド + APIルート配信

```javascript
if (NODE_ENV === 'development') {
    app.use(cors()); // 開発中はCORS許可
} else {
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));
}
```

## 主要ファイル構成
- `server/server.mjs` - ESモジュールを使用したメインExpressサーバー
- `client/src/App.jsx` - API統合例を含むReactアプリ
- `client/vite.config.js` - `/api`用の開発プロキシ設定
- `client/eslint.config.js` - モダンなフラットESLint設定

## 開発ワークフロー

### アプリケーションの起動：
```bash
# ターミナル1 - バックエンド
cd server && npm run dev

# ターミナル2 - フロントエンド
cd client && npm run dev
```

### APIパターン
すべてのAPIルートは`/api`でプレフィックスされます。現在のエンドポイント：
- `GET /api` - 挨拶メッセージを返す
- `POST /api` - リクエストボディのテキストをエコーバック

### フロントエンドAPI統合
fetchコールでは相対`/api`パスを使用 - 開発時はViteがプロキシ処理：
```javascript
const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
})
```

## プロジェクト固有の規約

### 日本語コメント
サーバーコードには国際化コンテキストのための日本語コメントが含まれています。

### ESLintルール
大文字定数を許可するカスタムルール: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]`

### モダンな依存関係
- React 19.1.1と最新のフック
- Express 5.1.0とESモジュール
- Vite 7.xビルドツール

## ビルド＆デプロイ
- クライアントビルド: `npm run build` (`client/dist`に出力)
- 本番サーバーは`../client/dist`のビルドされたReactアプリを期待
- 本番環境では単一プロセスで静的ファイルとAPIの両方を配信
# Express-0912(ver01) プロジェクト説明書

## アーキテクチャ概要
これはReactフロントエンド（`client/`）とExpress.jsバックエンド（`server/`）を持つフルスタックアプリケーションです。両方ともESモジュール（`"type": "module"`）とモダンなJavaScript機能を使用しています。

### クライアント・サーバー通信
- フロントエンドはVite開発サーバーでバックエンドAPIへのプロキシ設定で動作
- すべてのAPI呼び出しは`/api`エンドポイントを使用 - Viteが`http://localhost:5000`にプロキシ
- 本番環境：Expressが`client/dist`からビルドされたReactアプリを配信

[text](../server/node_modules)### 環境対応デプロイメント
サーバー（`server/server.mjs`）は`NODE_ENV`に基づいて動作を切り替えます：
- **開発環境**: CORS有効、APIのみモード
- **本番環境**: 静的Reactビルド + APIルート配信

```javascript
if (NODE_ENV === 'development') {
    app.use(cors()); // 開発中はCORS許可
} else {
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));
}
```

## 主要ファイル構成
- `server/server.mjs` - ESモジュールを使用したメインExpressサーバー
- `client/src/App.jsx` - API統合例を含むReactアプリ
- `client/vite.config.js` - `/api`用の開発プロキシ設定
- `client/eslint.config.js` - モダンなフラットESLint設定

## 開発ワークフロー

### アプリケーションの起動：
```bash
# ターミナル1 - バックエンド
cd server && npm run dev

# ターミナル2 - フロントエンド
cd client && npm run dev
```

### APIパターン
すべてのAPIルートは`/api`でプレフィックスされます。現在のエンドポイント：
- `GET /api` - 挨拶メッセージを返す
- `POST /api` - リクエストボディのテキストをエコーバック

### フロントエンドAPI統合
fetchコールでは相対`/api`パスを使用 - 開発時はViteがプロキシ処理：
```javascript
const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: message })
})
```

## プロジェクト固有の規約

### 日本語コメント
サーバーコードには国際化コンテキストのための日本語コメントが含まれています。

### ESLintルール
大文字定数を許可するカスタムルール: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]`

### モダンな依存関係
- React 19.1.1と最新のフック
- Express 5.1.0とESモジュール
- Vite 7.xビルドツール

## ビルド＆デプロイ
- クライアントビルド: `npm run build` (`client/dist`に出力)
- 本番サーバーは`../client/dist`のビルドされたReactアプリを期待
- 本番環境では単一プロセスで静的ファイルとAPIの両方を配信
