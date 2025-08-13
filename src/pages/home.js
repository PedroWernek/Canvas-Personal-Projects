import { experiments } from "../data/experimentsLocations";

export function renderHomePage(app) {
  app.innerHTML = `
    <div class="home-container">
      <h1>Selecione um Projeto</h1>
      <div class="grid-container">
        ${Object.keys(experiments)
          .map(
            (key) => `
          <a href="#${key}" class="project-card">
            <h2>${experiments[key].title}</h2>
            <p>${experiments[key].description}</p>
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
  document.title = "Home";
}
