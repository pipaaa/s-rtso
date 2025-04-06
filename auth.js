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
  
  // Si el usuario es de tipo demo, la expiración será definida (puedes ajustarlo según sea necesario)
  if (user === "Guadola") {
    // Por ejemplo, Guadola tiene 7 días de demo
    return currentDate + (7 * 24 * 60 * 60 * 1000); // 7 días en milisegundos
  }
  
  // Para otros usuarios con membresía de 1 mes
  return currentDate + (30 * 24 * 60 * 60 * 1000); // 30 días en milisegundos
}

const userExpires = getUserExpiration(user);

if (popup && welcomeMessage && subscriptionInfo) {
  popup.style.display = "block";
  
  // Activar el difuminado de fondo
  popupBackdrop.classList.add("active");
  document.body.style.pointerEvents = "none"; 

  // Mostrar mensaje de bienvenida con el nombre del usuario en negrita
  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${user}</strong>!`;

  // Información de la membresía basada en la expiración
  if (user === "admin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else {
    // Calculamos los días restantes de la membresía
    const demoDaysLeft = Math.max(0, Math.ceil((userExpires - Date.now()) / (1000 * 60 * 60 * 24)));
    
    if (userExpires === Infinity) {
      subscriptionInfo.innerText = "Tienes acceso ilimitado.";
    } else if (demoDaysLeft > 0) {
      subscriptionInfo.innerText = `Te quedan ${demoDaysLeft} días de membresía.`;
    } else {
      subscriptionInfo.innerText = "Tu membresía ha expirado.";
    }
  }

  // Cerrar el popup automáticamente después de 4 segundos si no se cierra manualmente
  setTimeout(() => {
    popup.style.display = "none";
    popupBackdrop.classList.remove("active"); // Desactivar el difuminado cuando se cierre el popup
    document.body.style.pointerEvents = 'auto'; // Permitir interacción con los botones
  }, 4000);
}

// Función para cerrar el popup manualmente
function closePopup() {
  popup.style.display = "none";
  popupBackdrop.classList.remove("active"); // Desactivar el difuminado
  document.body.style.pointerEvents = 'auto'; // Permitir interacción con botones

}

// Función para cerrar sesión
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
