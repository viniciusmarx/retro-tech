document.addEventListener("DOMContentLoaded", async () => {
  try {
    const categories = await fetchLocalJSON("../data/categories.json");
    renderCategoryCards(categories);
  } catch (err) {
    console.error("An error occurred on fetch data:", err);
    showErrorMessage(
      "Não foi possível carregar as categorias. Tente novamente mais tarde."
    );
  }
});

const renderCategoryCards = (categories) => {
  const container = document.querySelector(".row.g-4");

  categories.forEach((category) => {
    const card = createCategory(category);
    container.appendChild(card);
  });
};

const createCategory = (category) => {
  const card = document.createElement("div");
  card.className = "col-md-4 col-sm-6";
  card.innerHTML = `
      <div class="card retro-card h-100">
        <img src="${category.image}" class="card-img-top" alt="${category.title}" />
        <div class="card-body">
          <h5 class="card-title text-primary mb-4 text-uppercase">${category.title}</h5>
          <p class="card-text">${category.description}</p>
          <a href="category.html?category=${category.id}" class="text-decoration-none text-accent">
            Ver produtos <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  return card;
};
