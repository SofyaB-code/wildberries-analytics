async function loadData() {
  const res = await fetch("/api/stocks");
  const data = await res.json();

  const table = document.getElementById("data-table");
  const labels = [];
  const values = [];

  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.nmId}</td>
      <td>${item.subject}</td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
    `;
    table.appendChild(row);
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
