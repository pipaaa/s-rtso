const users = {
  "Guadola": {
    password: "baltza2025",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 días desde ahora
  },
  "not4dmin": {
    password: "4false",
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
    window.location.href = "content.html"; // Redirige a content.html
  } else {
    attempts++;
    alert("Usuario o contraseña incorrectos.");
  }
}

// Este código se ejecutará cuando accedemos a la página content.html
const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html"; // Si no hay usuario, redirige a login
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  // Mostrar popup
  popup.style.display = "block";
  document.body.classList.add("blur"); // Añadir difuminado al fondo
  welcomeMessage.innerHTML = `Bienvenido <strong>${user}</strong> a PlayView!`;

  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
  }

  // Cerrar el popup después de 4 segundos
  setTimeout(() => {
    closePopup();
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
  document.body.classList.remove("blur"); // Quitar difuminado del fondo
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html"; // Redirige al login
}
