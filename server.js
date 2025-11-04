const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// демо-данные вместо настоящего API
const demoData = [
  { nmId: 1001, subject: "Футболка мужская", quantity: 134, price: 990 },
  { nmId: 1002, subject: "Платье летнее", quantity: 52, price: 2590 },
  { nmId: 1003, subject: "Кроссовки женские", quantity: 89, price: 5490 },
  { nmId: 1004, subject: "Джинсы", quantity: 210, price: 3790 },
  { nmId: 1005, subject: "Рюкзак городской", quantity: 47, price: 2990 }
];

app.get("/api/stocks", (req, res) => res.json(demoData));

app.listen(PORT, () => console.log(` Demo-server running on ${PORT}`));
