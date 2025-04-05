const currentUser = localStorage.getItem("currentUser");  // Obtenemos el usuario desde localStorage
const users = JSON.parse(localStorage.getItem("users")) || {};  // Aseguramos que obtenemos la lista de usuarios correctamente

// Si no hay un usuario o el usuario no está en la lista, redirige a index.html
if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";  // Redirigimos a la página de login si no hay usuario
  return;
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  welcomeMessage.innerHTML = `Bienvenido <strong>${currentUser}</strong> a PlayView!`;  // Mostrar nombre en negrita

  // Mostrar los días restantes de membresía
  if (users[currentUser].expires === null) {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";  // Si el usuario tiene acceso ilimitado
  } else {
    const demoDaysLeft = Math.max(0, Math.ceil((users[currentUser].expires - Date.now()) / (1000 * 60 * 60 * 24)));  // Calcular días restantes
    subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
  }
}

// Cerrar el popup después de 4 segundos
setTimeout(() => {
  popup.style.display = "none";
}, 4000);

// Función para cerrar el popup manualmente
function closePopup() {
  popup.style.display = "none";
}
