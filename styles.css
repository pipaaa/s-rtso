const users = {
    "not4dmin": "false4",
    "Txiki": "baltza2025"
};

const blockedUsers = {};
const demoExpiration = new Date("2025-04-11").getTime();

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    if (!username || !password) {
        showError("Usuario y contraseña requeridos");
        return;
    }
    
    if (blockedUsers[username] && Date.now() < blockedUsers[username]) {
        showError("Usuario bloqueado temporalmente");
        return;
    }
    
    if (users[username] === password) {
        sessionStorage.setItem("user", username);
        window.location.href = "main.html";  // Asegurándonos de que redirige correctamente.
    } else {
        trackFailedAttempts(username);
    }
}

function trackFailedAttempts(username) {
    if (!blockedUsers[username]) blockedUsers[username] = 0;
    blockedUsers[username]++;
    
    if (blockedUsers[username] >= 5) {
        blockedUsers[username] = Date.now() + 3600000;
        showError("Cuenta bloqueada por 1 hora");
    } else {
        showError("Credenciales incorrectas");
    }
}

function showError(msg) {
    document.getElementById("error-message").textContent = msg;
}

function logout() {
    sessionStorage.removeItem("user");
    window.location.href = "index.html";  // Redirige a la página de inicio de sesión
}

function showMembership() {
    alert("Días restantes de servicio: " + getRemainingDays() + " días");
}

function getRemainingDays() {
    let now = Date.now();
    let remaining = Math.ceil((demoExpiration - now) / (1000 * 60 * 60 * 24));
    return remaining > 0 ? remaining : 0;
}

function closeMessage() {
    document.getElementById("welcome-message").style.display = "none";
}

function reloadVideo() {
    document.getElementById("video-frame").src += '';  // Recarga solo el segundo iframe
}

document.addEventListener("DOMContentLoaded", function() {
    let user = sessionStorage.getItem("user");
    if (!user) {
        window.location.href = "index.html";  // Verifica si no hay usuario y redirige a login
    } else {
        document.getElementById("welcome-text").textContent = "Bienvenido a Play View, " + user + "!";
        document.getElementById("membership-status").textContent = "Días restantes de servicio - " + getRemainingDays() + " días (demo)";
    }

    if (getRemainingDays() <= 0) {
        alert("Tu membresía ha expirado. Redirigiendo...");
        logout();
    }
});
