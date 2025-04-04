let attempts = 0;
const MAX_ATTEMPTS = 5;

function login() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const lockout = localStorage.getItem("lockedUntil");
if (lockout && Date.now() < parseInt(lockout)) {
document.getElementById("error-message").innerText = "Demasiados intentos fallidos. Inténtalo en 1 hora.";
return;
}

if (users[username] && users[username].password === password) {
localStorage.setItem("user", username);
localStorage.setItem("loginTime", Date.now());
window.location.href = "content.html";
} else {
attempts++;
if (attempts >= MAX_ATTEMPTS) {
localStorage.setItem("lockedUntil", Date.now() + 3600000);
document.getElementById("error-message").innerText = "Demasiados intentos fallidos. Inténtalo en 1 hora.";
} else {
document.getElementById("error-message").innerText = "Usuario o contraseña incorrectos.";
}
}
}

function logout() {
localStorage.removeItem("user");
localStorage.removeItem("loginTime");
window.location.href = "index.html";
}

function closePopup() {
document.getElementById("welcome-popup").style.display = "none";
}

function checkAccess() {
const username = localStorage.getItem("user");
const path = window.location.pathname;
const isPrivatePage = path.includes("content.html") || path.includes("suscripcion.html");

if (!username && isPrivatePage) {
window.location.href = "index.html";
return;
}

if (username && users[username]) {
const user = users[username];

if (path.includes("content.html")) {
const popupText = document.getElementById("welcome-text");
let daysLeft = "∞";

if (user.type === "demo") {
const createdAt = parseInt(user.createdAt);
const msLeft = 7 * 24 * 60 * 60 * 1000 - (Date.now() - createdAt);
if (msLeft <= 0) {
logout();
return;
}
daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
}

popupText.innerText = `¡Bienvenido ${username} a Play View!\nLe quedan ${daysLeft} días de membresía.`;
}

if (path.includes("suscripcion.html")) {
const subText = document.getElementById("subscription-info");
let text = user.type === "admin" ? "Membresía: Ilimitada (Admin)" : "Versión DEMO";

if (user.type === "demo") {
const createdAt = parseInt(user.createdAt);
const msLeft = 7 * 24 * 60 * 60 * 1000 - (Date.now() - createdAt);
const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
text += ` - Te quedan ${daysLeft} días.`;
}

subText.innerText = text;
}
}
}

window.onload = checkAccess;

document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = function(e) {
if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
return false;
}
};
