import "./style.css";
import { renderHomePage } from "./pages/home.js";
import { renderExperimentPage } from "./pages/experiment.js";
// Vite encontra todos os módulos de experimentos

const app = document.getElementById("app");

// Renderiza a página do experimento

// Decide qual página renderizar
function handleLocation() {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html") {
    renderHomePage(app);
  } else {
    renderExperimentPage(path);
  }
}

// Navegação SPA simples
function navigate(path) {
  window.history.pushState({}, "", path);
  handleLocation();
}

// Intercepta cliques em links internos
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    navigate(link.pathname);
  }
});

// Atualiza página ao voltar/avançar no histórico
window.addEventListener("popstate", handleLocation);

// Inicializa
handleLocation();
