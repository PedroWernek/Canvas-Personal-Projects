import { experimentsArray } from "../data/experimentsLocations.js";
import { buildSidebar } from "../components/Sidebar.js";
const experimentModules = import.meta.glob("/src/experiments/**/*.js");

export async function renderExperimentPage(path) {
  let currentCleanup = null;

  if (currentCleanup) currentCleanup = null;

  // Busca o experimento pelo caminho
  const experiment =
    experimentsArray[path] ||
    Object.values(experimentsArray).find((exp) => exp.path === path);

  if (!experiment) {
    app.innerHTML = `<h1>404 - Not Found</h1><a href="/">Voltar</a>`;
    return;
  }

  // Carrega o módulo do experimento
  const moduleLoader = experimentModules[experiment.path];
  if (!moduleLoader) {
    app.innerHTML = `<h1>Erro ao carregar módulo</h1>`;
    return;
  }

  // Monta a sidebar e o canvas
  app.innerHTML = buildSidebar(path);
  const canvasContainer = app.querySelector("#canvas-container");
  if (canvasContainer) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvasContainer.appendChild(canvas);

    // Importa e executa o experimento
    const module = await moduleLoader();
    if (module.run) currentCleanup = module.run(canvas, context);
    document.title = experiment.title;
  }
}
