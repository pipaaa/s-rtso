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

  // Información de la membresía basada en el usuario
  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    // Asegurarnos de que 'expires' es un número (timestamp)
    const userExpires = users["Guadola"]?.expires;
    if (userExpires) {
      // Calculamos los días restantes de la membresía
      const demoDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));
      subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
    } else {
      subscriptionInfo.innerText = "No se pudo calcular el tiempo de membresía.";
    }
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
