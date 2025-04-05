const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  document.body.classList.add("blur-background");

  // Mensaje de bienvenida con nombre en negrita
  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>`;

  // Mostrar días restantes de membresía
  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (users[user] && users[user].expires) {
    const daysLeft = Math.max(0, Math.ceil((users[user].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Te quedan ${daysLeft} día${daysLeft !== 1 ? 's' : ''} de membresía.`;
  }

  // Cierre automático del popup después de 4 segundos
  setTimeout(() => {
    closePopup();
  }, 4000);
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
  document.body.classList.remove("blur-background");
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
