const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

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

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  document.body.classList.add("blurred");

  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>`;

  if (users[user]) {
    const expires = users[user].expires;
    if (expires === null) {
      subscriptionInfo.innerText = "Tienes acceso ilimitado.";
    } else {
      const diasRestantes = Math.max(0, Math.ceil((expires - Date.now()) / (1000 * 60 * 60 * 24)));
      subscriptionInfo.innerText = `Le quedan ${diasRestantes} días de membresía.`;
    }
  }

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
