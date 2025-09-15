import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

// --- 開発環境 ---
if (NODE_ENV === 'development') {
    app.use(cors()); // CORS許可

    app.get('/api', (req, res) => {
        res.json({ message: 'Get Response OK. [development]' });
    });

    app.post('/api', (req, res) => {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text Is Null.' });
        }
        res.json({ message: `Text is ${text}. [development]` });
    });
}

// --- 本番環境 ---
if (NODE_ENV === 'production') {
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));

    app.get('/api', (req, res) => {
        res.json({ message: 'Get Response OK. [production]' });
    });

    app.post('/api', (req, res) => {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text Is Null.' });
        }
        res.json({ message: `Text is ${text}. [production]` });
    });

    // React Router のために「その他のリクエストは index.html へフォールバック」
    app.use((req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

// 共通: サーバー起動
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
});
