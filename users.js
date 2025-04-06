
const users = {
  "Guadola": {
    password: "baltza2025",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días desde ahora
  },
  "not4dmin": {
    password: "4false",
    expires: null // acceso ilimitado
  },
  "bug": {
    password: "bug",
    expires: null // acceso ilimitado
  }
};

let attempts = 0;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (attempts >= 5) {
    alert("Demasiados intentos fallidos. Intenta en 1 hora.");
    return;
  }

  if (users[username] && users[username].password === password) {
    const expires = users[username].expires;
    if (expires && Date.now() > expires) {
      alert("Tu membresía ha expirado.");
      return;
    }
    sessionStorage.setItem("user", username);
    window.location.href = "content.html";
  } else {
    attempts++;
    alert("Usuario o contraseña incorrectos.");
  }
}
