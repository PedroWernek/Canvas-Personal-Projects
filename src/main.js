import "./style.css";
import { buildNavbar } from "./components/Navbar";

const routes = {
  "/gravity": {
    path: "./experiments/gravity/gravity.js",
    title: "Gravity",
  },
};

const app = document.getElementById("app");
let currentCleanUp = null;

async function handleLocation() {
  const path = window.location.hash.replace("#", "") || "/gravity";
  const route = routes[path];

  if (route) {
    if (currentCleanUp) {
      currentCleanUp();
    }
    app.innerHTML = buildNavbar;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    app.appendChild(canvas);

    const module = await import(route.path);
    if (module.run) {
      currentCleanUp = module.run(canvas, context);
    }
    document.title = route.title;
  } else {
    app.innerHTML = "<h1>404 - Not Found</h1>";
    document.title = "Not Found";
  }
}

window.addEventListener("hashchange", handleLocation);
handleLocation();
