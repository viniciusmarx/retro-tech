const API_BASE = "https://691116f97686c0e9c20c7716.mockapi.io/api";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`);
    if (!response.ok) throw new Error("Erro ao buscar dados da API");
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

const getParamsFromUrl = (param) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
};

const showErrorMessage = (message) => {
  const main = document.querySelector("main");
  if (!main) return;

  main.innerHTML = `
    <section class="vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h2 class="text-danger mb-3">Erro ao carregar</h2>
      <p class="text-muted fs-5 mb-4">${message}</p>
    </section>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const cartOffcanvas = document.getElementById("cartOffcanvas");

  if (cartOffcanvas)
    cartOffcanvas.addEventListener("show.bs.offcanvas", () => {
      renderCartItems();
    });
});
