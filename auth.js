const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  
  // Mostrar mensaje de bienvenida con el nombre del usuario en negrita
  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>!`;

  // Definir el mensaje de membresía basado en el usuario
  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
  }

  // Cerrar el popup automáticamente después de 4 segundos si no se cierra manualmente
  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
