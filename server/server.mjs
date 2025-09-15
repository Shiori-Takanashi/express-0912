import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
// import fetch from 'node-fetch'; ← 不要

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

if (NODE_ENV === 'development') {
    app.use(cors()); // 開発中はCORS許可
} else {
    const staticPath = path.join(__dirname, '..', 'client', 'dist');
    app.use(express.static(staticPath));

    // すべてのリクエストを index.html にフォールバック
    app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}


app.get('/api', (req, res) => {
    res.json({ message: 'Get Response OK.' });
});

app.post('/api', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Text Is Null.' });
    }
    res.json({ message: `Text is ${text}.` });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} [${NODE_ENV}]`);
});
