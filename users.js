const usuarios = {
"Guadola": { password: "baltza2025", expira: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
"not4dmin": { password: "4false", expira: null }
};

let intentos = parseInt(localStorage.getItem("intentos")) || 0;
let bloqueadoHasta = localStorage.getItem("bloqueadoHasta");

if (bloqueadoHasta && new Date() < new Date(bloqueadoHasta)) {
alert("Has sido bloqueado por 1 hora. Intenta más tarde.");
document.querySelector("button").disabled = true;
}

function login() {
const user = document.getElementById("username").value.trim();
const pass = document.getElementById("password").value.trim();

if (usuarios[user] && usuarios[user].password === pass) {
localStorage.setItem("userData", JSON.stringify({
username: user,
expira: usuarios[user].expira
}));
localStorage.removeItem("intentos");
window.location.href = "content.html";
} else {
intentos++;
localStorage.setItem("intentos", intentos);
if (intentos >= 5) {
const bloqueado = new Date(Date.now() + 60 * 60 * 1000);
localStorage.setItem("bloqueadoHasta", bloqueado);
alert("Has sido bloqueado por 1 hora.");
document.querySelector("button").disabled = true;
} else {
alert("Usuario o contraseña incorrectos.");
}
}
}
