const productsDiv = document.getElementById("products");

/* Mahsulotlarni ol */
let products = JSON.parse(localStorage.getItem("products")) || [];
render(products);

/* Render (ADMIN UCHUN) */
function render(list) {
  productsDiv.innerHTML = "";
  list.forEach((p, i) => {
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.thumbnail}">
        <div>
          <b>${p.title}</b>
          <p>$${p.price}</p>
          <button onclick="editProduct(${i})">✏️</button>
          <button onclick="deleteProduct(${i})">🗑</button>
        </div>
      </div>
    `;
  });
}

/* ADD / EDIT */
function saveProduct() {
  const id = document.getElementById("id").value;

  const product = {
    id: id ? Number(id) : Date.now(),
    title: title.value,
    description: description.value,
    price: Number(price.value),
    discountPercentage: Number(discount.value),
    rating: Number(rating.value),
    stock: Number(stock.value),
    brand: brand.value,
    category: category.value,
    thumbnail: thumbnail.value,
    images: images.value.split(",").map((i) => i.trim()),
  };

  if (id) {
    const index = products.findIndex((p) => p.id == id);
    products[index] = product;
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));
  render(products);
  clearForm();
}

/* DELETE */
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  render(products);
}

/* EDIT */
function editProduct(index) {
  const p = products[index];
  id.value = p.id;
  title.value = p.title;
  description.value = p.description;
  price.value = p.price;
  discount.value = p.discountPercentage;
  rating.value = p.rating;
  stock.value = p.stock;
  brand.value = p.brand;
  category.value = p.category;
  thumbnail.value = p.thumbnail;
  images.value = p.images.join(", ");
}

/* FORM TOZALASH */
function clearForm() {
  [
    id,
    title,
    description,
    price,
    discount,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  ].forEach((el) => (el.value = ""));
}
