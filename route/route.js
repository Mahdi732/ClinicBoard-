import { homePage } from "../pages/home.js";
import { loginPage } from "../pages/login.js";
import { patientPage } from "../pages/patient.js";

const urlRoutes = {
  '/': { template: homePage },
  '/login': { template: loginPage },
  '/patient': { template: patientPage }
};

function urlLocationHandler() {
  let location = window.location.pathname || '/';
  const route = urlRoutes[location] || urlRoutes['/'];
  const html = route.template(); 
  document.getElementById("root").innerHTML = html;
}

document.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("nav-link")) return;

  e.preventDefault();
  handelRoute(e);
});

function handelRoute(event) {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  urlLocationHandler();
}

window.addEventListener('popstate', urlLocationHandler);
window.addEventListener('load', urlLocationHandler);
