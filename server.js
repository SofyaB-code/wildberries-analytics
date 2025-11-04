import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем отдавать статические файлы
app.use(express.static("public"));

// 🔑 ВСТАВЬ СЮДА СВОЙ WB API КЛЮЧ
const API_TOKEN = "ВСТАВЬ_СВОЙ_API_КЛЮЧ_СЮДА";

// API маршрут для получения данных Wildberries
app.get("/api/stocks", async (req, res) => {
  try {
    const r = await fetch("https://statistics-api.wildberries.ru/api/v1/supplier/stocks", {
      headers: { Authorization: API_TOKEN },
    });
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));
