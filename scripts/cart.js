document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const cartOffcanvas = document.getElementById("cartOffcanvas");

  if (cartOffcanvas)
    cartOffcanvas.addEventListener("show.bs.offcanvas", () => {
      renderCartItems();
    });

  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("remove-item-btn") ||
      e.target.closest(".remove-item-btn")
    ) {
      const itemDiv = e.target.closest(".cart-item");
      if (!itemDiv) return;

      const productId = itemDiv.getAttribute("data-id");
      removeItem(productId);
    }
  });
});

const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const updateCartCount = () => {
  const cartCountElement = document.querySelector(".cart-count");
  if (!cartCountElement) return;

  const cart = getCart();
  const totalItems = cart.length;

  if (totalItems > 0) {
    cartCountElement.textContent = totalItems;
    cartCountElement.classList.remove("d-none");
  } else {
    cartCountElement.classList.add("d-none");
  }
};

const updateCartInStorage = (cart) => {
  setCart(cart);
  updateCartCount();
};

const removeItem = (id) => {
  let cart = getCart();

  cart = cart.filter((p) => p.id != id);

  updateCartInStorage(cart);
  renderCartItems();
};

const renderCartItems = () => {
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Seu carrinho está vazio.</p>`;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item d-flex align-items-center mb-3 border-bottom pb-2" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" width="80" height="80" class="rounded me-3" />

      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">${item.name}</h6>
          <button class="btn border-none remove-item-btn">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <span class="fw-bold">R$ ${item.price},00</span>
        <p>Quantidade: ${item.quantity}</p>
      </div>
    </div>
  `
    )
    .join("");
};
