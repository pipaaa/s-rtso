const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  document.body.classList.add("blurred");

  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>`;

  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Le quedan ${demoDaysLeft} días de membresía.`;
  }

  // Cierre automático a los 4 segundos
  setTimeout(() => {
    closePopup();
  }, 4000);
}

function closePopup() {
  popup.style.display = "none";
  document.body.classList.remove("blurred");
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
