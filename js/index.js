const productsDiv = document.getElementById("products");

/* Agar localStorage bo‘sh bo‘lsa → dummy dan yukla */
if (!localStorage.getItem("products")) {
  fetch("https://dummyjson.com/products?limit=8")
    .then((r) => r.json())
    .then((d) => {
      localStorage.setItem("products", JSON.stringify(d.products));
      render(d.products);
    });
} else {
  render(JSON.parse(localStorage.getItem("products")));
}

/* Render (USER UCHUN) */
function render(products) {
  productsDiv.innerHTML = "";
  products.forEach((p) => {
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.thumbnail}">
        <h4>${p.title}</h4>
        <p>$${p.price}</p>
      </div>
    `;
  });
}
