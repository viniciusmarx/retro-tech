document.addEventListener("DOMContentLoaded", async () => {
  try {
    const categoryId = getParamsFromUrl("category");
    if (!categoryId) return;

    const [categories, products] = await Promise.all([
      fetchData("categories"),
      fetchData("products"),
    ]);

    const category = categories.find((c) => c.id == categoryId);
    if (!category) return;

    updatePageHeader(category);
    renderProducts(products.filter((p) => p.category == categoryId));
    updateCartCount();
  } catch (err) {
    console.error("An error occurred on fetch data:", err);
    showErrorMessage(
      "Não foi possível carregar os produtos. Tente novamente mais tarde."
    );
  } finally {
    hideLoader();
  }
});

const updatePageHeader = (category) => {
  document.title = `RetroTech - ${category.title}`;
  const [firstWord, secondWord = ""] = category.title.split(" ");

  document.querySelector(
    ".title"
  ).innerHTML = `${firstWord} <span class="text-primary text-outline">${secondWord}</span>`;

  document.querySelector(".lead").textContent = category.sectionText;
};

const renderProducts = (products) => {
  const container = document.querySelector(".row.g-4");

  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
};

const createProductCard = (product) => {
  const card = document.createElement("div");
  card.className = "col-md-3 col-sm-6";
  card.innerHTML = `
    <div class="card retro-card h-100">
      <img src="${product.image}" class="card-img-top" alt="${product.name}" />
      <div class="card-body">
        <h5 class="card-title text-primary text-uppercase">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="fw-bold mb-3">R$ ${product.price},00</p>
        <a href="product.html?id=${product.id}" class="text-accent text-decoration-none">
          Ver detalhes <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
  return card;
};

const hideLoader = () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  loader.style.visibility = "hidden";
};
