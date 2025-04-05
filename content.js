window.onload = () => {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('welcomeMessage').textContent = `Bienvenido ${username} a Play View!`;

  if (username === 'Guadola') {
    const start = new Date(localStorage.getItem('loginTime') || Date.now());
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const remaining = 7 - diff;
    document.getElementById('membershipMessage').textContent = `Le quedan ${remaining > 0 ? remaining : 0} días de membresía.`;
  } else {
    document.getElementById('membershipMessage').textContent = 'Acceso ilimitado (Admin).';
  }
};

function closePopup() {
  document.getElementById('welcomePopup').style.display = 'none';
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

function goToSubscription() {
  window.location.href = 'subscription.html';
}
