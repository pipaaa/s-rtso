// Verifica si hay sesión iniciada
const user = sessionStorage.getItem("user");

if (!user) {
  window.location.href = "index.html"; // Redirige si no hay usuario
}

// Cierra la sesión
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "index.html";
}
