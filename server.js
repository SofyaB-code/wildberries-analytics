import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Разрешаем отдавать статические файлы
app.use(express.static("public"));

// 🔑 ВСТАВЬ СЮДА СВОЙ WB API КЛЮЧ
const API_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc4MDQzMjg3LCJpZCI6IjAxOWE0ZmNhLWUyYzEtN2MzYi1iMGJlLWNmNDFkOTgzMzA2YiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjoxNjEyNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.8OIgbWiq044kkUgCWmvIaY9eg9j2qHxXSbsXwRWeQcUCnh4RcMSxVEkK7E08WI8XL4WPMkwC3bgoc_s1B03TSA";

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
