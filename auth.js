document.addEventListener("DOMContentLoaded", () => {
  // Obtener el nombre de usuario desde el almacenamiento o del servidor
  const username = "NombreUsuario";  // Aquí debes poner la lógica para obtener el nombre de usuario

  const popup = document.querySelector(".popup");
  const closeButton = document.querySelector(".popup .close");
  const welcomeMessage = document.querySelector("#welcomeMessage");
  const subscriptionInfo = document.querySelector("#subscriptionInfo");
  const body = document.querySelector("body");

  // Asegurarnos de que el popup tiene el mensaje correcto
  welcomeMessage.innerHTML = `Bienvenid@ a PlayView <strong>${username}</strong>`;
  subscriptionInfo.innerHTML = "Días restantes: 30";  // Aquí puedes cambiar la lógica según tus necesidades

  // Mostrar el popup
  popup.style.display = "block";

  // Difuminar el fondo
  body.classList.add("blur");

  // Añadir la clase para difuminar el fondo con animación
  setTimeout(() => {
    body.classList.add("blurred");
  }, 100);

  // Cerrar el popup después de 4 segundos
  setTimeout(() => {
    popup.style.display = "none";
    body.classList.remove("blurred");
    body.classList.remove("blur");
  }, 4000);

  // Cerrar el popup manualmente al hacer clic en el botón de cerrar
  closeButton.addEventListener("click", () => {
    popup.style.display = "none";
    body.classList.remove("blurred");
    body.classList.remove("blur");
  });
});
