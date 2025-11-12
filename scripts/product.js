document.addEventListener("DOMContentLoaded", async () => {
  try {
    const productId = getParamsFromUrl("id");
    if (!productId) return;

    const product = await fetchData(`products/${productId}`);

    renderProduct(product);
    setupAddToCartButton(product);
    updateCartCount();
  } catch (err) {
    console.error("An error occurred on fetch data:", err);
    showErrorMessage(
      "Não foi possível carregar os produtos. Tente novamente mais tarde."
    );
  }
});

const renderProduct = (product) => {
  const container = document.querySelector("main.container");

  container.innerHTML = `
    <div class="row align-items-center mt-5 g-5">
      <div class="col-md-6">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="img-fluid rounded shadow-sm"
        />
      </div>

      <div class="col-md-6">
        <h1 class="title mb-3">
          ${product.name.split(" ")[0]} 
          <span class="text-primary text-outline">
            ${product.name.split(" ")[1] || ""}
          </span>
        </h1>

        <p class="mb-4 fs-5">
          ${product.description}
        </p>

        <h5 class="fw-bold mb-3">Especificações Técnicas:</h5>
        <ul class="mb-4">
          ${product.specifications.map((spec) => `<li>${spec}</li>`).join("")}
        </ul>

        <p class="fw-bold fs-4 mb-4">R$ ${product.price},00</p>

        <button class="retro-btn" id="add-to-cart-btn">
          ADICIONAR AO CARRINHO
        </button>
      </div>
    </div>
  `;
};

const setupAddToCartButton = (product) => {
  const btn = document.querySelector("#add-to-cart-btn");
  if (!btn) return;
  btn.addEventListener("click", () => addToCart(product));
};

const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id == product.id);

  if (existingItem) existingItem.quantity++;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};
