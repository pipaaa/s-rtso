// Variables globales
const correctCredentials = [
    { username: 'not4dmin', password: 'false4' },
    { username: 'Txiki', password: 'baltza2025' }
];
let failedAttempts = 0;
let membershipDays = 10; // Número de días para la demo
const usernameDisplay = document.getElementById('username-display');
const membershipInfo = document.getElementById('membership-info');

// Función para verificar el login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Verificar credenciales
    const user = correctCredentials.find(cred => cred.username === username && cred.password === password);
    
    if (user) {
        // Si las credenciales son correctas
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', username);
        failedAttempts = 0; // Resetear intentos fallidos
        window.location.href = 'main.html'; // Redirigir a la página principal
    } else {
        // Si las credenciales son incorrectas
        failedAttempts++;
        if (failedAttempts >= 5) {
            errorMessage.textContent = 'Demasiados intentos fallidos. Por favor, espera una hora para intentar de nuevo.';
            setTimeout(() => {
                failedAttempts = 0;
                errorMessage.textContent = '';
            }, 3600000); // Bloqueo de 1 hora
        } else {
            errorMessage.textContent = 'Credenciales incorrectas. Intentos restantes: ' + (5 - failedAttempts);
        }
    }
}

// Comprobar si el usuario está logueado
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('loggedIn')) {
        window.location.href = 'index.html'; // Redirigir a la página de login si no está logueado
    } else {
        // Mostrar el nombre de usuario y los días restantes de membresía
        const username = localStorage.getItem('username');
        usernameDisplay.textContent = username;
        membershipInfo.textContent = `Días restantes de servicio: ${membershipDays} (demo)`;

        // Bloquear las credenciales después de 10 días (1 de abril de 2025)
        const currentDate = new Date();
        const expirationDate = new Date('2025-04-10'); // Fecha de expiración

        if (currentDate >= expirationDate) {
            localStorage.removeItem('loggedIn');
            alert('Tu membresía ha expirado. Por favor, renueva.');
            window.location.href = 'index.html'; // Redirigir a login si la membresía ha expirado
        }
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    window.location.href = 'index.html'; // Redirigir a la página de login
}

// Función para recargar el iframe 2
function reloadIframe() {
    const iframe2 = document.getElementById('iframe2');
    iframe2.src = iframe2.src;
}

// Función para mostrar información de la membresía
function showMembershipInfo() {
    alert(`Tu membresía es de prueba. Días restantes: ${membershipDays}`);
}

// Función para cerrar el mensaje de bienvenida
function closeMessage() {
    const message = document.getElementById('welcome-message');
    message.style.display = 'none';
}
