const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html";
}

const popup = document.getElementById("popup");
const welcomeMessage = document.getElementById("welcomeMessage");
const subscriptionInfo = document.getElementById("subscriptionInfo");
const popupBackdrop = document.getElementById("popupBackdrop");

// Función para obtener la fecha de expiración basada en el tipo de usuario
function getUserExpiration(user) {
  const currentDate = Date.now();

  // Usuarios con acceso ilimitado
  if (user === "admin" || user === "not4dmin" || user === "bug") {
    return Infinity;
  }

  // Usuario demo con expiración limitada
  if (user === "Guadola") {
    return 1744228800000; // 9 abril 2025 a las 21:00
  }

  // Usuarios PREMIUM manuales con fechas fijas
  const premiumUsers = {
    "Lopez73": new Date("2025-05-10T00:00:00").getTime(),
    "Irizar89": new Date("2025-06-01T00:00:00").getTime(),
    "Suli52": new Date("2025-07-15T00:00:00").getTime()
  };

  if (premiumUsers[user]) {
    return premiumUsers[user];
  }

  // Por defecto, usuarios normales tienen 1 mes
  return currentDate + (30 * 24 * 60 * 60 * 1000);
}

const userExpires = getUserExpiration(user);

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  popupBackdrop.classList.add("active");

  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>!`;

  // Mensaje para usuarios PREMIUM
  if (["Lopez73", "Irizar89", "Suli52"].includes(user)) {
    const premiumDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));
    if (premiumDaysLeft > 0) {
      subscriptionInfo.innerText = `👑 Eres usuario PREMIUM. Te quedan ${premiumDaysLeft} días de acceso.`;
    } else {
      subscriptionInfo.innerText = "👑 Tu membresía PREMIUM ha expirado.";
    }
  }
  // Mensaje para usuarios con acceso ilimitado (admin, not4dmin, bug)
  else if (userExpires === Infinity) {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  }
  // Mensaje para usuarios demo
  else if (user === "Guadola") {
    const demoDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));
    subscriptionInfo.innerText = `Estás en modo demo. Te quedan ${demoDaysLeft} días de prueba.`;
  }
  // Mensaje para usuarios normales
  else {
    const normalDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));
    if (normalDaysLeft > 0) {
      subscriptionInfo.innerText = `Te quedan ${normalDaysLeft} días de membresía.`;
    } else {
      subscriptionInfo.innerText = "Tu membresía ha expirado.";
    }
  }

  setTimeout(() => {
    popup.style.display = "none";
    popupBackdrop.classList.remove("active");
    popupBackdrop.style.display = "none";
  }, 4000);
}

// Función para cerrar el popup manualmente
function closePopup() {
  popup.style.display = "none";
  popupBackdrop.classList.remove("active");
  popupBackdrop.style.display = "none";
}

// Función para cerrar sesión
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
