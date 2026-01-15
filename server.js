import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 ОБЯЗАТЕЛЬНО
app.use(cors());
app.use(express.json());

// 🔹 Главная страница (проверка, что сервер жив)
app.get("/", (req, res) => {
  res.send("Salim AI server is running 🚀");
});

// 🔹 API для чата
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "Сообщение пустое" });
    }

    // ⛔ ПОКА БЕЗ НАСТОЯЩЕГО AI (заглушка)
    // чтобы всё заработало без API ключа
    const reply = `Ты написал: "${userMessage}". Сервер работает ✅`;

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Ошибка сервера ❌" });
  }
});

// 🔹 Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
