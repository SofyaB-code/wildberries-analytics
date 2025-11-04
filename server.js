const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// 🔑 вставь сюда свой API-токен
const API_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc4MDQzMjg3LCJpZCI6IjAxOWE0ZmNhLWUyYzEtN2MzYi1iMGJlLWNmNDFkOTgzMzA2YiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjoxNjEyNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.8OIgbWiq044kkUgCWmvIaY9eg9j2qHxXSbsXwRWeQcUCnh4RcMSxVEkK7E08WI8XL4WPMkwC3bgoc_s1B03TSA";

app.get("/api/stocks", async (req, res) => {
  try {
    const r = await fetch("https://statistics-api.wildberries.ru/api/v1/supplier/stocks", {
      headers: { Authorization: API_TOKEN },
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("Ошибка WB API:", text);
      return res.status(r.status).send(text);
    }

    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("Ошибка сервера:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`✅ Сервер запущен на порту ${PORT}`));
