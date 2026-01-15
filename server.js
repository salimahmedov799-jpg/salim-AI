import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

/* ====== ОБЯЗАТЕЛЬНО ====== */
app.use(cors({
  origin: "*"
}));
app.use(express.json());

/* ====== ПРОВЕРКА СЕРВЕРА ====== */
app.get("/", (req, res) => {
  res.send("Salim AI server is running 🚀");
});

/* ====== CHAT API ====== */
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Пустое сообщение 😅" });
    }

    // 🔹 Пока простой AI-ответ (чтобы всё стабильно работало)
    const reply = `Ты написал: "${userMessage}". Сервер работает правильно ✅`;

    res.json({ reply });

  } catch (error) {
    res.status(500).json({
      reply: "Ошибка сервера 😢"
    });
  }
});

/* ====== ЗАПУСК ====== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
