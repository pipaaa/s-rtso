window.onload = () => {
  const username = localStorage.getItem('username');
  const subStatus = document.getElementById('subscriptionStatus');

  if (username === 'Guadola') {
    const start = new Date(localStorage.getItem('loginTime') || Date.now());
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const remaining = 7 - diff;
    subStatus.textContent = `Te quedan ${remaining > 0 ? remaining : 0} días de membresía.`;
  } else if (username === 'not4dmin') {
    subStatus.textContent = 'Tienes acceso ilimitado como administrador.';
  } else {
    subStatus.textContent = 'No tienes una suscripción activa.';
  }
};
