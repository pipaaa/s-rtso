const users = {
  "Guadola": {
    password: "baltza2025",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 días desde ahora
  },
  "not4dmin": {
    password: "4false",
    expires: null
  }
};

const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

window.onload = () => {
  const popup = document.getElementById("popup");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const subscriptionInfo = document.getElementById("subscriptionInfo");

  if (popup && welcomeMessage && subscriptionInfo) {
    popup.style.display = "block";
    document.body.classList.add("blur-background");

    // Mostrar mensaje de bienvenida
    welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>`;

    // Calcular días de membresía
    const userData = users[user];
    if (userData && userData.expires) {
      const now = Date.now();
      const timeDiff = userData.expires - now;
      const daysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
      subscriptionInfo.innerText = `Te quedan ${daysLeft} día${daysLeft !== 1 ? 's' : ''} de membresía.`;
    } else {
      subscriptionInfo.innerText = "Tienes acceso ilimitado.";
    }

    // Cierre automático
    setTimeout(() => {
      closePopup();
    }, 4000);
  }
};

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
  document.body.classList.remove("blur-background");
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
