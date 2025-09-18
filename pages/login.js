export function getLogin () {
    return `function getLogin () {
    return '<div class="login-container">
    <h2>Clinic App</h2>
    <p class="subtitle">Please login to continue</p>

    <form>
      <input type="password" placeholder="Enter password" required>
      <button type="submit">Login</button>
    </form>

    <p class="msg">First time? Your password will be saved.</p>
  </div>'
  }`;
}