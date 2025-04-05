document.addEventListener('DOMContentLoaded', function () {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const currentUser = localStorage.getItem('currentUser');
  const subscriptionInfo = document.getElementById('subscription-info');

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const user = users.find(u => u.username === currentUser);

  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  // Calcular días restantes de suscripción
  const today = new Date();
  const expiryDate = new Date(user.subscriptionDate);
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    window.location.href = 'index.html';
    return;
  }

  if (subscriptionInfo) {
    subscriptionInfo.textContent = `Días restantes de suscripción: ${diffDays}`;
  }

  // Mostrar mensaje de bienvenida con popup
  const popup = document.createElement('div');
  popup.className = 'popup';

  popup.innerHTML = `
    <button class="close" onclick="this.parentElement.classList.add('fade-out'); setTimeout(() => { this.parentElement.remove(); document.body.classList.remove('blurred'); }, 500)">×</button>
    <h2>Bienvenid@ a PlayView <strong>${user.username}</strong></h2>
    <p>Te quedan <strong>${diffDays}</strong> día${diffDays !== 1 ? 's' : ''} de membresía</p>
  `;

  document.body.appendChild(popup);
  document.body.classList.add('blurred');

  // Auto cerrar popup
  setTimeout(() => {
    popup.classList.add('fade-out');
    setTimeout(() => {
      popup.remove();
      document.body.classList.remove('blurred');
    }, 500);
  }, 4000);
});
