document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const cartOffcanvas = document.getElementById("cartOffcanvas");

  if (cartOffcanvas)
    cartOffcanvas.addEventListener("show.bs.offcanvas", () => {
      renderCartItems();
    });
});

const updateCartCount = () => {
  const cartCountElement = document.querySelector(".cart-count");
  if (!cartCountElement) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.length;

  if (totalItems > 0) {
    cartCountElement.textContent = totalItems;
    cartCountElement.classList.remove("d-none");
  } else {
    cartCountElement.classList.add("d-none");
  }
};

const renderCartItems = () => {
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Seu carrinho está vazio.</p>`;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
      <div class="d-flex align-items-center mb-3 border-bottom pb-2">
        <img src="${item.image}" alt="${item.name}" width="60" height="60" class="rounded me-3" />
        <div class="flex-grow-1">
          <h6 class="mb-0">${item.name}</h6>
          <small class="text-muted">${item.description}</small>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <span class="fw-bold">R$ ${item.price},00</span>
            <span class="badge bg-secondary">x${item.quantity}</span>
          </div>
        </div>
      </div>
    `
    )
    .join("");
};
