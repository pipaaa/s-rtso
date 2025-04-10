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
  
  // Si el usuario es admin, no hay expiración
  if (user === "admin") {
    return Infinity; // Acceso ilimitado
  }

  // Usuario demo con expiración limitada
  if (user === "Guadola") {
    return 1744228800000; // Fecha fija: Miércoles 9 abril 2025 a las 21:00
  }

  // Usuarios con acceso ilimitado
  if (user === "not4dmin" || user === "bug") {
    return null;
  }

  // Usuarios PREMIUM añadidos manualmente
  if (user === "Lopez73") {
    return new Date("2025-05-10T00:00:00").getTime(); // Por ejemplo, 10 mayo 2025
  }
  if (user === "Irizar89") {
    return new Date("2025-06-01T00:00:00").getTime(); // 1 junio 2025
  }
  if (user === "Suli52") {
    return new Date("2025-07-15T00:00:00").getTime(); // 15 julio 2025
  }

  // Por defecto, usuarios normales tienen 1 mes
  return currentDate + (30 * 24 * 60 * 60 * 1000);
}

const userExpires = getUserExpiration(user);

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  popupBackdrop.classList.add("active");

  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>!`;

  if (user === "admin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else {
    const demoDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));

    if (userExpires === Infinity) {
      subscriptionInfo.innerText = "Tienes acceso ilimitado.";
    } else if (userExpires === null) {
      subscriptionInfo.innerText = "Tienes acceso ilimitado.";
    } else if (demoDaysLeft > 0) {
      // Mensaje especial si es uno de los usuarios PREMIUM
      if (["Lopez73", "Irizar89", "Suli52"].includes(user)) {
        subscriptionInfo.innerText = `👑 Eres usuario PREMIUM. Te quedan ${demoDaysLeft} días de membresía.`;
      } else {
        subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
      }
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
