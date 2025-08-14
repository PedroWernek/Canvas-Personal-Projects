import { experimentsArray } from "../data/experimentsLocations.js";

export function renderHomePage(app) {
  app.innerHTML = `
    <div class="home-container">
      <h1>Selecione um Projeto</h1>
      <div class="grid-container">
        ${Object.keys(experimentsArray)
          .map(
            (key) => `
          <a href="${key}" class="project-card">
            <h2>${experimentsArray[key].title}</h2>
            <p>${experimentsArray[key].description}</p>
          </a>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
  document.title = "Home | Canvas Projects";
}
