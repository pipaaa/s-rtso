const users = {
  "Guadola": {
    password: "baltza2025",
    expires: 1744228800000 // Miércoles 9 abril 2025 a las 21:00
  },
  "not4dmin": {
    password: "4false",
    expires: null
  },
  "bug": {
    password: "bug",
    expires: null
  },
  "Lopez73": {
    password: "7383al",
    expires: 1767225600000 // PREMIUM - Jueves 1 enero 2026 a las 00:00
  },
  "Imanol": {
    password: "mungi4",
    expires: 1767225600000 // PREMIUM - Jueves 1 enero 2026 a las 00:00
  },
  "Suli52": {
    password: "9990ms",
    expires: 1767225600000 // PREMIUM - Jueves 1 enero 2026 a las 00:00
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
