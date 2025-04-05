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

// Redirige si no hay usuario
const currentUser = sessionStorage.getItem("user");
if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  // Muestra el popup
  popup.style.display = "block";
  welcomeMessage.innerHTML = `Bienvenid@ <strong>${currentUser}</strong> a PlayView!`;

  if (currentUser === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (currentUser === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
  }
}

// Cerrar popup después de 4 segundos o manualmente
setTimeout(() => {
  closePopup();
}, 4000);

function closePopup() {
  popup.style.display = "none";
}

// Función de cierre de sesión
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
