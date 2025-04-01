// Variable para el contador de intentos de login
let loginAttempts = 0;

// Función para manejar el login
function login() {
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
        // Almacenamos el nombre de usuario para mostrar en la página de bienvenida
        localStorage.setItem("username", username);
        
        // Comprobar la fecha de la membresía
        let membershipExpiry = localStorage.getItem("membershipExpiry");
        if (!membershipExpiry) {
            // Si no existe la fecha, establecer la fecha de expiración (10 días a partir de hoy)
            membershipExpiry = new Date();
            membershipExpiry.setDate(membershipExpiry.getDate() + 10); // 10 días
            localStorage.setItem("membershipExpiry", membershipExpiry);
        }

        // Redirigir a main.html
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

// Función para mostrar el mensaje de bienvenida y la información de la membresía en main.html
function displayWelcomeMessage() {
    const username = localStorage.getItem("username");
    const membershipExpiry = new Date(localStorage.getItem("membershipExpiry"));
    const today = new Date();
    const daysRemaining = Math.ceil((membershipExpiry - today) / (1000 * 3600 * 24));

    if (username) {
        document.getElementById("welcome-message").innerText = `Bienvenido a Play View, ${username}!`;
        document.getElementById("membership-info").innerText = `Días restantes de servicio: ${daysRemaining} días (demo)`;

        // Si la membresía ha expirado
        if (daysRemaining <= 0) {
            document.getElementById("membership-info").innerText = "Tu membresía ha expirado. Por favor, renueva tu membresía.";
            document.getElementById("renew-membership-btn").style.display = "inline-block";
        } else {
            // Si aún queda tiempo en la membresía
            document.getElementById("renew-membership-btn").style.display = "none";
        }
    }
}

// Función para redirigir al usuario a la página de renovación de membresía
function renewMembership() {
    window.location.href = "https://play-view.netlify.app/membresia.html";
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("membershipExpiry");
    window.location.href = "index.html";
}
