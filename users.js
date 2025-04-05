function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const validUsers = {
    "not4dmin": "clave1",
    "Guadola": "clave2"
  };

  if (validUsers[username] === password) {
    sessionStorage.setItem("user", username);
    window.location.href = "content.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}