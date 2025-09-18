import { loginPage } from "../pages/login.js"; 
import { patientPage } from "../pages/patient.js"; 
const routes = { 
  '/': () => '<h1>Home Page</h1>',
  '/login': loginPage,
  '/patient': patientPage, 
};

function handleRoute() {
  const content = routes[location.pathname]; 
  document.getElementById('root').innerHTML = content ? content() : '<h1>Page Not Found</h1>'; 
} 
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
  e.preventDefault(); 
  window.history.pushState({}, '', e.target.href); 
  handleRoute(); 
} 
}); 
window.addEventListener('load', handleRoute); 
window.addEventListener('popstate', handleRoute);