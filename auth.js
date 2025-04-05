const user = sessionStorage.getItem("user");
if (!user) {
  window.location.href = "index.html";
}

window.onload = function () {
  const popup = document.getElementById("popup");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const subscriptionInfo = document.getElementById("subscriptionInfo");

  welcomeMessage.innerHTML = `Bienvenid@ a Play View, <strong>${user}</strong>`;
  popup.style.display = "block";
  popup.style.animation = "fadeIn 1s ease";

  document.getElementById("main-content").classList.add("blurred");

  if (user === "not4dmin") {
    subscriptionInfo.innerText = "Tienes acceso ilimitado.";
  } else if (user === "Guadola") {
    const demoDaysLeft = Math.max(
      0,
      Math.ceil((Date.now() + 7 * 24 * 60 * 60 * 1000 - Date.now()) / (1000 * 60 * 60 * 24))
    );
    subscriptionInfo.innerText = `Le quedan ${demoDaysLeft} días de membresía.`;
  }

  setTimeout(() => {
    closePopup();
  }, 4000);
};

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.animation = "fadeOut 0.5s ease";
  setTimeout(() => {
    popup.style.display = "none";
  }, 500);

  document.getElementById("main-content").classList.remove("blurred");
}

function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
