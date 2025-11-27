const API_BASE = "https://691116f97686c0e9c20c7716.mockapi.io/api";

const apiRequest = async (endpoint, method = "GET", body = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE}/${endpoint}`, options);

    if (!response.ok) throw new Error("Erro ao buscar dados da API");

    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const fetchData = (endpoint) => apiRequest(endpoint);

const fetchLocalJSON = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Erro ao carregar o JSON local");
    return await res.json();
  } catch (err) {
    console.error(err);
    throw e;
  }
};

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
