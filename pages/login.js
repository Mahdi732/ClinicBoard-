export const loginPage = () => {
  let user = localStorage.getItem("authData") ? JSON.parse(atob(localStorage.getItem("authData"))) : null;

  if (user) {
    return   `
  <div class="auth-container">
    <header class="auth-header">
      <h1>🔐 Authentification & Sécurité</h1>
      <p>Veuillez entrer vos informations pour accéder à l’application.</p>
    </header>

    <main class="auth-main">
      <section class="auth-box">
        <h2>Connexion</h2>
        <form id="login-form">

          <label for="password">Mot de passe</label>
          <input type="password" id="password" placeholder="Votre mot de passe" />

          <button type="submit" id="login-button">Se connecter</button>
        </form>

        <div class="info-box">
          <p>⚠️ Tentatives échouées: <span id="fail-count">0</span></p>
          <p id="lock-message" class="hidden">🔒 Compte verrouillé temporairement après trop de tentatives.</p>
        </div>
      </section>
    </main>
  </div>
`; 
  } else {
    return `
    <div class="auth-container">
      <h1>🔐 Créer un mot de passe</h1>
      <form id="setup-form">
        <label for="new-password">Nouveau mot de passe</label>
        <input type="password" id="new-password" placeholder="Entrez le mot de passe" />
        <button type="submit">Enregistrer</button>
      </form>
    </div>`;
  }
}

function setUpPassword () {
  const formSetPassword = document.getElementById('setup-form')
  if (!formSetPassword) return
  formSetPassword.addEventListener('submit', (e) => {
    e.preventDefault()
    let newPassword = document.getElementById('new-password').value.trim()
    if (!newPassword) {
      alert('please enter valid password ')
      return
    }
    let data = {
      password : newPassword,
      lockPasswordInput : 5
    }
    localStorage.setItem('clinicApp:data', JSON.stringify(data))
  })
}

function login () {
  const formLogin = document.getElementById('login-form') 
  if (!loginForm) return
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    let loginPassword = document.getElementById('password').value.trim()
    if (!loginPassword) {
      alert('please enter valid password')
      return
    }
    let data = JSON.parse(localStorage.getItem('clinicApp:data'))

    if (data.lockPasswordInput == 0) {
      lockInputs()
    }

    if (loginPassword == data.password) {
      data.lockPasswordInput = 5
    }else {
      data.lockPasswordInput -= 1
      document.getElementById('fail-count').textContent = data.lockPasswordInput
    }
  })
}

function lockInputs () {
  document.getElementById('password').disabled = true
  document.getElementById('login-button').disabled = true
  document.getElementById('lock-message').classList.remove("hidden")
}