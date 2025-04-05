const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");
const body = document.querySelector("body");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  popup.classList.add("popup-visible");
  body.classList.add("blur-background");

  // Mensaje con nombre en negrita
  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>`;

  // Info de suscripción
  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Le quedan ${demoDaysLeft} días de membresía.`;
  }

  // Cierre automático del popup a los 4 segundos
  setTimeout(() => {
    closePopup();
  }, 4000);
}

function closePopup() {
  popup.classList.remove("popup-visible");
  body.classList.remove("blur-background");
  popup.style.display = "none";
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
