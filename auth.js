// Función para cerrar sesión
function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

// Mostrar mensaje de bienvenida
window.onload = function () {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const popup = document.getElementById("popup");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const subscriptionInfo = document.getElementById("subscriptionInfo");
  const mainContent = document.getElementById("main-content");

  // Establecer mensaje
  welcomeMessage.textContent = `Bienvenido, ${user}!`;

  // Calcular días restantes
  const subEnd = localStorage.getItem("subscriptionEnd");
  if (subEnd) {
    const endDate = new Date(subEnd);
    const today = new Date();
    const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    subscriptionInfo.textContent =
      diff >= 0
        ? `Tu suscripción expira en ${diff} día(s).`
        : "Tu suscripción ha expirado.";
  }

  // Mostrar popup
  popup.style.display = "block";
  popup.style.animation = "fadeIn 0.5s forwards";
  mainContent.classList.add("blurred");

  // Ocultar automáticamente el popup tras 4 segundos
  setTimeout(() => {
    popup.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
      popup.style.display = "none";
      mainContent.classList.remove("blurred");
    }, 500);
  }, 4000);
};

// Cerrar el popup manualmente
function closePopup() {
  const popup = document.getElementById("popup");
  const mainContent = document.getElementById("main-content");
  popup.style.animation = "fadeOut 0.5s forwards";
  setTimeout(() => {
    popup.style.display = "none";
    mainContent.classList.remove("blurred");
  }, 500);
}
