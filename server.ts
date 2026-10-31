import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Google Gen AI client on the server
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint 1: Single-shot Content Generation
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter prompt diperlukan.' });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        error: 'API key Gemini belum dikonfigurasi di server. Silakan hubungkan API key di Settings > Secrets.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: systemInstruction
        ? { systemInstruction }
        : undefined,
    });

    return res.json({ text: response.text || '' });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return res.status(500).json({
      error: error.message || 'Gagal menghasilkan konten dari server Gemini.',
    });
  }
});

// API Endpoint 2: Streaming Generation via Server-Sent Events (SSE)
app.post('/api/gemini/stream', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Parameter prompt diperlukan.' });
    }

    const ai = getGenAIClient();
    if (!ai) {
      return res.status(503).json({
        error: 'API key Gemini belum dikonfigurasi di server. Silakan hubungkan API key di Settings > Secrets.',
      });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: systemInstruction
        ? { systemInstruction }
        : undefined,
    });

    for await (const chunk of streamResponse) {
      const text = chunk.text || '';
      res.write(`data: ${JSON.stringify({ text })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Error streaming content:', error);
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message || 'Gagal streaming konten dari server Gemini.',
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
});

// Setup Vite in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
