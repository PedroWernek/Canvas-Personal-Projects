import "./style.css";
import { renderHomePage } from "./pages/home.js";
import { experimentsArray } from "./data/experimentsLocations.js";
import { buildSidebar } from "./components/Sidebar.js";

// 1. O Vite encontra todos os módulos e cria um objeto de "carregadores".
const experimentModules = import.meta.glob("/src/experiments/**/*.js");

const app = document.getElementById("app");
let currentCleanup = null;

async function renderExperimentPage(path) {
  if (currentCleanup) {
    currentCleanup();
  }

  const experiment = experimentsArray[path];

  if (!experiment) {
    app.innerHTML = `<h1>404 - Not Found</h1><a href="/">Voltar para a Home</a>`;
    return;
  }

  // 2. Usamos o caminho do arquivo (ex: "/src/experiments/gravity/gravity.js")
  // para encontrar o carregador correto no objeto que o Vite criou.
  const modulePath = experiment.path;
  const moduleLoader = experimentModules[modulePath];

  if (!moduleLoader) {
    console.error(`Módulo não encontrado para o caminho: ${modulePath}`);
    app.innerHTML = `<h1>Erro ao carregar módulo</h1>`;
    return;
  }

  app.innerHTML = buildSidebar(path);
  const canvasContainer = app.querySelector("#canvas-container");

  if (canvasContainer) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);

    try {
      // 3. Executamos a função do carregador para importar o módulo.
      const module = await moduleLoader();
      if (module.run) {
        currentCleanup = module.run(canvas, context);
      }
      document.title = experiment.title;
    } catch (e) {
      console.error(`Falha ao carregar o módulo: ${modulePath}`, e);
    }
  }
}

function handleLocation() {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html") {
    renderHomePage(app);
  } else {
    renderExperimentPage(path);
  }
}

const navigate = (path) => {
  window.history.pushState({}, "", path);
  handleLocation();
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    navigate(link.pathname);
  }
});

window.addEventListener("popstate", handleLocation);
handleLocation();
