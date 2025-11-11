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

function goToCategory(categoryId) {
  window.location.href = `category.html?category=${categoryId}`;
}

function goToProduct(productId) {
  window.location.href = `produto.html?id=${productId}`;
}
