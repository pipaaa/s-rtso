
const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  welcomeMessage.innerText = `Bienvenido ${user} a Play View!`;

  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((users["Guadola"].expires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Le quedan ${demoDaysLeft} días de membresía.`;
  }
}

function closePopup() {
  popup.style.display = "none";
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
