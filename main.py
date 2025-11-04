from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import requests, threading, time, sqlite3, os

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# 🔑 вставь сюда свой WB API ключ
API_TOKEN = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjUwOTA0djEiLCJ0eXAiOiJKV1QifQ.eyJhY2MiOjEsImVudCI6MSwiZXhwIjoxNzc4MDQzMjg3LCJpZCI6IjAxOWE0ZmNhLWUyYzEtN2MzYi1iMGJlLWNmNDFkOTgzMzA2YiIsImlpZCI6MjAxNTQ2MTksIm9pZCI6MjgyNzg0LCJzIjoxNjEyNiwic2lkIjoiNzZlZmM0NjktYTgxNS00NGEyLWIzMjEtNzMzNzI5ZjY0NjBlIiwidCI6ZmFsc2UsInVpZCI6MjAxNTQ2MTl9.8OIgbWiq044kkUgCWmvIaY9eg9j2qHxXSbsXwRWeQcUCnh4RcMSxVEkK7E08WI8XL4WPMkwC3bgoc_s1B03TSA"

DB_PATH = "database/db.sqlite3"
os.makedirs("database", exist_ok=True)

def update_data():
    while True:
        try:
            headers = {"Authorization": API_TOKEN}
            url = "https://statistics-api.wildberries.ru/api/v1/supplier/stocks"
            r = requests.get(url, headers=headers)
            data = r.json()
            with sqlite3.connect(DB_PATH) as db:
                db.execute(
                    "CREATE TABLE IF NOT EXISTS stocks (nmId INTEGER, subject TEXT, quantity INTEGER, price REAL)"
                )
                db.execute("DELETE FROM stocks")
                for i in data:
                    db.execute(
                        "INSERT INTO stocks VALUES (?,?,?,?)",
                        (i.get("nmId"), i.get("subject"), i.get("quantity"), i.get("price")),
                    )
                db.commit()
            print("✅ Данные обновлены")
        except Exception as e:
            print("Ошибка:", e)
        time.sleep(86400)  # обновление раз в сутки

threading.Thread(target=update_data, daemon=True).start()

@app.get("/", response_class=HTMLResponse)
def dashboard(request: Request):
    with sqlite3.connect(DB_PATH) as db:
        cur = db.execute("SELECT * FROM stocks LIMIT 100")
        data = [
            dict(nmId=row[0], subject=row[1], quantity=row[2], price=row[3])
            for row in cur.fetchall()
        ]
    return templates.TemplateResponse("dashboard.html", {"request": request, "data": data})
