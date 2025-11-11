document.addEventListener("DOMContentLoaded", async () => {
  try {
    const categoryId = getCategoryIdFromUrl();
    if (!categoryId) return;

    const [categories, products] = await loadData();

    const category = findCategory(categories, categoryId);
    if (!category) return;

    updatePageHeader(category);

    const filteredProducts = filterProductsByCategory(products, categoryId);

    renderProducts(filteredProducts);
  } catch (err) {
    console.error("An error occurred on fetch data:", err);
    showErrorMessage(
      "Não foi possível carregar os produtos. Tente novamente mais tarde."
    );
  } finally {
    hideLoader();
  }
});

const getCategoryIdFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
};

const loadData = () =>
  Promise.all([fetchData("categories"), fetchData("products")]);

const findCategory = (categories, categoryId) =>
  categories.find((c) => c.id == categoryId);

const updatePageHeader = (category) => {
  document.title = `RetroTech - ${category.title}`;

  const [firstWord, secondWord = ""] = category.title.split(" ");

  document.querySelector(
    ".title"
  ).innerHTML = `${firstWord} <span class="text-primary text-outline">${secondWord}</span>`;

  document.querySelector(".lead").textContent = category.description;
};

const filterProductsByCategory = (products, categoryId) =>
  products.filter((p) => p.category == categoryId);

const renderProducts = (products) => {
  const container = document.querySelector(".row.g-4");
  container.innerHTML = "";

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

const showErrorMessage = (message) => {
  const body = document.body;
  const nav = document.querySelector("nav");

  let next = nav.nextElementSibling;
  while (next) {
    const toRemove = next;
    next = next.nextElementSibling;
    body.removeChild(toRemove);
  }

  const errorSection = document.createElement("section");
  errorSection.className =
    "vh-100 d-flex flex-column justify-content-center align-items-center text-center";
  errorSection.innerHTML = `
    <div>
      <h2 class="text-danger mb-3">⚠️ Erro ao carregar</h2>
      <p class="text-muted fs-5 mb-4">${message}</p>
    </div>
  `;

  body.appendChild(errorSection);
};
