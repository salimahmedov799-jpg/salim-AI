import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Проверка сервера
app.get("/", (req, res) => {
  res.send("Salim AI server is running ✅");
});

// =======================
// 💬 ЧАТ (НЕ ТРОГАЕМ)
// =======================
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Сообщение пустое ❌" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Ты умный и дружелюбный помощник Salim AI. Отвечай понятно.\n\nВопрос: ${userMessage}`
      })
    });

    const data = await response.json();

    const answer =
      data?.output?.[0]?.content?.[0]?.text || "Пустой ответ от AI 😕";

    res.json({ reply: answer });

  } catch (error) {
    console.error(error);
    res.json({ reply: "Ошибка сервера ❌" });
  }
});

// =======================
// 🖼️ ГЕНЕРАЦИЯ КАРТИНОК
// =======================
app.post("/api/image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Нет описания картинки" });
    }

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (!data.data || !data.data[0]?.url) {
      return res.status(500).json({ error: "Ошибка генерации изображения" });
    }

    res.json({
      image: data.data[0].url
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера при генерации изображения" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
