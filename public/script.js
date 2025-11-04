async function loadData() {
  const res = await fetch("/api/stocks");
  const data = await res.json();
  const table = document.getElementById("data-table");
  table.innerHTML = "<tr><th>Артикул</th><th>Товар</th><th>Остаток</th><th>Цена</th></tr>";

  const labels = [];
  const values = [];

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.nmId}</td>
        <td>${item.subject}</td>
        <td>${item.quantity}</td>
        <td>${item.price} ₽</td>
      </tr>`;
    labels.push(item.subject);
    values.push(item.quantity);
  });

  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{ label: "Остатки", data: values, backgroundColor: "#7e57c2" }]
    }
  });
}
loadData();
