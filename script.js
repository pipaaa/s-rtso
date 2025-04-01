// Variable para el contador de intentos de login
let loginAttempts = 0;

// Función para manejar el login
function login(event) {
    // Evitar la recarga automática de la página
    event.preventDefault();

    // Obtener los valores de los campos de entrada
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Definir las credenciales correctas
    const validCredentials = [
        { username: "not4dmin", password: "false4" },
        { username: "Txiki", password: "baltza2025" }
    ];

    // Verificar si las credenciales son correctas
    const user = validCredentials.find(user => user.username === username && user.password === password);

    if (user) {
        // Si las credenciales son correctas, redirigir a main.html
        window.location.href = "main.html";
    } else {
        // Si las credenciales son incorrectas, incrementar el contador de intentos
        loginAttempts++;

        // Si se han superado los 5 intentos, bloquear por 1 hora
        if (loginAttempts >= 5) {
            // Bloquear acceso durante 1 hora
            const lockTime = new Date().getTime() + 3600000; // 1 hora en milisegundos
            localStorage.setItem("lockTime", lockTime);
            alert("Demasiados intentos fallidos. Inténtalo de nuevo en 1 hora.");
        } else {
            // Mostrar mensaje de error
            document.getElementById("error-message").innerText = "Usuario o contraseña incorrectos.";
        }
    }
}

// Verificar si hay un bloqueo activo al cargar la página
window.onload = function() {
    const lockTime = localStorage.getItem("lockTime");
    if (lockTime && new Date().getTime() < lockTime) {
        // Si el bloqueo está activo, mostrar un mensaje de error
        document.getElementById("error-message").innerText = "Estás bloqueado por demasiados intentos fallidos. Inténtalo de nuevo más tarde.";
        // Deshabilitar los campos de entrada
        document.getElementById("username").disabled = true;
        document.getElementById("password").disabled = true;
        document.querySelector("button").disabled = true;
    } else {
        // Si el bloqueo ha pasado, permitir el login
        localStorage.removeItem("lockTime");
    }
};
