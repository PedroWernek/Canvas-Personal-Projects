import "./style.css";
import { renderHomePage } from "./pages/home";
import { experiments } from "./data/experimentsLocations.js";
import { buildSidebar } from "./components/Sidebar.js";

const app = document.getElementById("app");
let currentCleanup = null;

// Função para renderizar o layout do experimento
async function renderExperimentPage(path) {
  // Limpa o experimento anterior, se houver
  if (currentCleanup) {
    currentCleanup();
  }

  const experiment = experiments[path];

  /*
   * Se o experimento for nulo ou não existir
   * @return <not found>
   */
  if (!experiment) {
    app.innerHTML = `<h1>404 - Not Found</h1><a href="#">Voltar para a Home</a>`;
    document.title = "Not Found";
    return;
  }

  // Cria o layout com a barra lateral e o contêiner do canvas
  app.innerHTML = buildSidebar();

  // Carrega o experimento na área principal
  const canvasContainer = document.getElementById("canvas-container");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvasContainer.appendChild(canvas);

  const module = await import(experiment.path);
  if (module.run) {
    currentCleanup = module.run(canvas, context);
  }
  document.title = experiment.title;
}

// Roteador principal
function handleLocation() {
  const path = window.location.hash.replace("#", "");

  if (path === "" || path === "/") {
    renderHomePage(app);
  } else {
    renderExperimentPage(path);
  }
}

// Ouve as mudanças na URL
window.addEventListener("hashchange", handleLocation);
window.addEventListener("popstate", handleLocation); // Lida com o botão de voltar do navegador

// Carrega a rota inicial
handleLocation();
