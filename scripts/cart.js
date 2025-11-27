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
      return;
    }

    if (e.target.classList.contains("btn-qty-plus")) {
      const itemDiv = e.target.closest(".cart-item");
      const id = itemDiv.getAttribute("data-id");
      updateItemQuantity(id, +1);
      return;
    }

    if (e.target.classList.contains("btn-qty-minus")) {
      const itemDiv = e.target.closest(".cart-item");
      const id = itemDiv.getAttribute("data-id");
      updateItemQuantity(id, -1);
      return;
    }
  });
});

const getCart = async () => await fetchData("cart");
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

const updateCartCount = async () => {
  const cartCountElement = document.querySelector(".cart-count");
  if (!cartCountElement) return;

  const cart = await getCart();

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

const removeItem = async (itemId) => {
  await apiRequest(`cart/${itemId}`, "DELETE");
  renderCartItems();
  updateCartCount();
};

const renderCartItems = async () => {
  const container = document.getElementById("cart-items-container");
  if (!container) return;

  const cart = await getCart();

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Seu carrinho está vazio.</p>`;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item d-flex align-items-center mb-3 border-bottom pb-2" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" width="80" height="80" class="rounded me-3 object-fit-cover" />

      <div class="flex-grow-1">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="mb-0">${item.name}</h6>
          <button class="btn border-none remove-item-btn">
            <i class="bi bi-trash"></i>
          </button>
        </div>
        <div class="d-flex align-items-center gap-4 mt-1">
          <span class="fw-bold mb-0">R$ ${item.price},00</span>
          <div class="input-group input-group-sm" style="width: 120px;">
            <button class="btn btn-outline-secondary btn-qty-minus" type="button">−</button>
            <span class="input-group-text bg-white">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-qty-plus" type="button">+</button>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
};

const updateItemQuantity = async (itemId, value) => {
  let cart = await getCart();
  const item = cart.find((i) => i.id == itemId);

  if (!item) return;

  const newQty = item.quantity + value;

  if (newQty < 1) {
    await apiRequest(`cart/${itemId}`, "DELETE");
  } else {
    await apiRequest(`cart/${itemId}`, "PUT", {
      ...item,
      quantity: newQty,
    });
  }

  renderCartItems();
  updateCartCount();
};
