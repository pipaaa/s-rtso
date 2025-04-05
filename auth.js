const users = {
  Guadola: { password: 'baltza2025', role: 'demo', startDate: new Date() },
  not4dmin: { password: '4false', role: 'admin' }
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const user = users[username];

  if (user && user.password === password) {
    localStorage.setItem('username', username);
    localStorage.setItem('loginTime', Date.now());
    window.location.href = 'content.html';
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
}
