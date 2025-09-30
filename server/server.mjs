import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// --- 共通処理 ---
app.use(express.json());

app.get('/env', (req, res) => {
    res.json({ env: NODE_ENV })
});

// 共通の API（どちらの環境でも必要ならここに書く）
app.get('/api', (req, res) => {
    res.json({ message: `OK` });
});

app.post('/api', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'None' });
    }
    res.json({ message: `${text}` });
});

// --- 環境別処理 ---
if (NODE_ENV === 'development') {
    // 開発環境 → フロントと API が別オリジンなので CORS を許可
    app.use(cors());
}

if (NODE_ENV === 'production') {
    // 本番環境 → dist 配信 & React Router 対応
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));

    app.use((req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

// --- サーバー起動（共通） ---
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
});
