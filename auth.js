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
/* Fondo difuminado */
body {
  background-image: url('football-488714.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

body.blur {
  filter: blur(5px);
}

/* Estilos del popup */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: none;
  animation: popupAnimation 0.5s ease-in-out;
}

.popup .close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

@keyframes popupAnimation {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Estilos de texto dentro del popup */
#welcomeMessage {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

#subscriptionInfo {
  font-size: 1.2em;
}

/* Botones */
.header-buttons button {
  background-color: #1e2a47;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.header-buttons button:hover {
  background-color: #005b96;
  transform: scale(1.05);
}

