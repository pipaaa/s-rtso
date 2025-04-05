
const user = sessionStorage.getItem("user");
const subscriptionStatus = document.getElementById("subscriptionStatus");

if (!user || !subscriptionStatus) {
  window.location.href = "index.html";
}

if (user === "not4dmin") {
  subscriptionStatus.innerText = "Tienes acceso ilimitado.";
} else if (user === "Guadola") {
  const demoDaysLeft = Math.max(0, Math.ceil((Date.now() + 7 * 24 * 60 * 60 * 1000 - Date.now()) / (1000 * 60 * 60 * 24)));
  subscriptionStatus.innerText = `Le quedan ${demoDaysLeft} días de membresía.`;
}
