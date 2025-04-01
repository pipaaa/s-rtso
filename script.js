const users = {
    "not4dmin": "false4",
    "Txiki": "baltza2025"
};

let attempts = localStorage.getItem("loginAttempts") || 0;
let lockedUntil = localStorage.getItem("lockedUntil");

if (lockedUntil && new Date().getTime() < lockedUntil) {
    document.body.innerHTML = "<h2 style='color:white;text-align:center;'>Bloqueado. Intenta más tarde.</h2>";
} 

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    if (!username || !password) {
        errorMessage.innerText = "Por favor, completa todos los campos.";
        return;
    }

    if (users[username] && users[username] === password) {
        localStorage.removeItem("loginAttempts");
        localStorage.removeItem("lockedUntil");
        window.location.href = "main.html";
    } else {
        attempts++;
        localStorage.setItem("loginAttempts", attempts);

        if (attempts >= 5) {
            let lockTime = new Date().getTime() + 60 * 60 * 1000;
            localStorage.setItem("lockedUntil", lockTime);
            document.body.innerHTML = "<h2 style='color:white;text-align:center;'>Demasiados intentos fallidos. Intenta más tarde.</h2>";
        } else {
            errorMessage.innerText = `Credenciales incorrectas. Intentos restantes: ${5 - attempts}`;
        }
    }
}

// Bloquear Inspeccionar
document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});
document.addEventListener("contextmenu", (event) => event.preventDefault());
