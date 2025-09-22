import { homePage } from "../pages/home.js";
import { loginPage, login, setUpPassword } from "../pages/login.js";
import { patientPage, initPatientPage } from "../pages/patient.js";
import { appointmentPage, initAppointmentPage} from "../pages/appointments.js";
import {financePage, initFinancePage} from "../pages/finance.js";
import {dashboardPage} from "../pages/dashboard.js";

const urlRoutes = {
  '/': { template: homePage },
  '/login': { template: loginPage },
  '/patient': { template: patientPage },
  '/appointment' : { template : appointmentPage},
  '/finance' : {template : financePage},
  '/dashboard' : {template : dashboardPage}
};

function urlLocationHandler() {
  let location = window.location.pathname || '/';
  const route = urlRoutes[location] || urlRoutes['/'];
  const html = route.template(); 
  document.getElementById("root").innerHTML = html;

  if (location === "/login") {
    setUpPassword();
    login();
  }else if (location === "/patient") {
    initPatientPage();
  }else if (location === "/appointment") {
    initAppointmentPage()
  }else if (location === "/finance") {
    initFinancePage();
  }

  const data = JSON.parse(localStorage.getItem('clinicApp:data')) || {};
  if (data.isLoggedIn) {
    const loginNavLink = document.querySelector('nav .nav-link[href="/login"]');
    if (loginNavLink) {
      loginNavLink.textContent = "Dashboard";
      loginNavLink.href = "/dashboard";
    }
  }
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
