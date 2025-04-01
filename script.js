// Función para manejar el login
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const validCredentials = [
        { username: "not4dmin", password: "false4" },
        { username: "Txiki", password: "baltza2025" }
    ];

    const user = validCredentials.find(user => user.username === username && user.password === password);

    if (user) {
        // Almacenamos el nombre de usuario y la fecha de expiración de la membresía
        localStorage.setItem("username", username);
        let membershipExpiry = localStorage.getItem("membershipExpiry");
        if (!membershipExpiry) {
            membershipExpiry = new Date();
            membershipExpiry.setDate(membershipExpiry.getDate() + 10); // 10 días
            localStorage.setItem("membershipExpiry", membershipExpiry);
        }

        // Redirigir a main.html
        window.location.href = "main.html";
    } else {
        loginAttempts++;
        if (loginAttempts >= 5) {
            const lockTime = new Date().getTime() + 3600000; // Bloqueo por 1 hora
            localStorage.setItem("lockTime", lockTime);
            alert("Demasiados intentos fallidos. Inténtalo de nuevo en 1 hora.");
        } else {
            document.getElementById("error-message").innerText = "Usuario o contraseña incorrectos.";
        }
    }
}

// Función para mostrar el mensaje de bienvenida y la información de la membresía en main.html
function displayWelcomeMessage() {
    const username = localStorage.getItem("username");
    const membershipExpiry = new Date(localStorage.getItem("membershipExpiry"));
    const today = new Date();
    const daysRemaining = Math.ceil((membershipExpiry - today) / (1000 * 3600 * 24));

    if (username) {
        document.getElementById("welcome-message").innerText = `Bienvenido a Play View, ${username}!`;
        document.getElementById("membership-info").innerText = `Días restantes de servicio: ${daysRemaining} días (demo)`;

        if (daysRemaining <= 0) {
            document.getElementById("membership-info").innerText = "Tu membresía ha expirado. Por favor, renueva tu membresía.";
            document.getElementById("renew-membership-btn").style.display = "inline-block";
        } else {
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
