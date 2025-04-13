const partidos = [
  { equipo: 'real', local: 'Las Palmas', visitante: 'Real Sociedad', fecha: '2025-04-06T14:00:00' },
  { equipo: 'athletic', local: 'Villarreal', visitante: 'Athletic', fecha: '2025-04-06T21:00:00' },
  { equipo: 'real', local: 'Real Sociedad', visitante: 'Mallorca', fecha: '2025-04-12T13:48:00' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Rayo Vallecano', fecha: '2025-04-13T21:00:00' },
  { equipo: 'real', local: 'Villarreal', visitante: 'Real Sociedad', fecha: '2025-04-13T15:57:00' },
  { equipo: 'athletic', local: 'Real Madrid', visitante: 'Athletic', fecha: '2025-04-20T21:00:00' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Las Palmas', fecha: '2025-04-26T19:00:00' },
  { equipo: 'real', local: 'Alaves', visitante: 'Real Sociedad', fecha: '2025-04-27T21:30:00' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Real Sociedad', fecha: '2025-05-04' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Alaves', fecha: '2025-05-11' },
  { equipo: 'real', local: 'Atletico', visitante: 'Real Sociedad', fecha: '2025-05-11' },
  { equipo: 'athletic', local: 'Getafe', visitante: 'Athletic', fecha: '2025-05-14' },
  { equipo: 'real', local: 'Real Sociedad', visitante: 'Celta de Vigo', fecha: '2025-05-14' },
  { equipo: 'real', local: 'Real Sociedad', visitante: 'Girona', fecha: '2025-05-18' },
  { equipo: 'athletic', local: 'Valencia', visitante: 'Athletic', fecha: '2025-05-18' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Barcelona', fecha: '2025-05-25' },
  { equipo: 'real', local: 'Real Madrid', visitante: 'Real Sociedad', fecha: '2025-05-25' },
  { equipo: 'athletic', local: 'Rangers', visitante: 'Athletic', fecha: '2025-04-10T20:58:00' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'Rangers', fecha: '2025-04-17T21:00:00' },
  { equipo: 'athletic', local: 'Athletic', visitante: 'X', fecha: '2025-05-01T21:00:00' },
  { equipo: 'athletic', local: 'X', visitante: 'Athletic', fecha: '2025-05-08T21:00:00' }
];

function getNextMatch(equipo) {
  const now = new Date();
  return partidos
    .filter(p => p.equipo === equipo)
    .map(p => ({ ...p, fechaReal: new Date(p.fecha) }))
    .filter(p => {
      const end = new Date(p.fechaReal.getTime() + 105 * 60000);
      return end > now;
    })
    .sort((a, b) => a.fechaReal - b.fechaReal)[0];
}

function renderCountdown(containerId, match) {
  const container = document.getElementById(containerId);
  if (!match) {
    container.innerHTML = '<p>No hay partidos disponibles</p>';
    return;
  }

  const esLocal = (match.local === "Real Sociedad" || match.local === "Athletic");
  const equipo = match.equipo === 'real' ? 'Real Sociedad' : 'Athletic';
  const logoLocal = match.local.includes('Real Sociedad') ? 'logorso.png' : match.local.includes('Athletic') ? 'logoath.png' : `logo${match.local.slice(0, 3).toLowerCase()}.png`;
  const logoVisitante = match.visitante.includes('Real Sociedad') ? 'logorso.png' : match.visitante.includes('Athletic') ? 'logoath.png' : `logo${match.visitante.slice(0, 3).toLowerCase()}.png`;
  const venueText = esLocal ? 'En casa' : 'Fuera';

  container.innerHTML = `
    <div class="match-row">
      <div class="team"><img src="${logoLocal}" alt="${match.local}">${match.local}</div>
      <div class="vs">VS</div>
      <div class="team">${match.visitante}<img src="${logoVisitante}" alt="${match.visitante}"></div>
    </div>
    <div class="venue">${venueText}</div>
    <div class="timer" id="timer-${containerId}">--:--:--</div>
  `;

  updateCountdown(match.fechaReal, `timer-${containerId}`);
}

function updateCountdown(fecha, elementId) {
  const timerEl = document.getElementById(elementId);

  function tick() {
    const now = new Date();
    const diff = fecha - now;
    const end = new Date(fecha.getTime() + 105 * 60000);
    const isLive = now >= fecha && now < end;
    const isToday = now.toDateString() === fecha.toDateString();

    if (isLive) {
      timerEl.textContent = 'EN DIRECTO!';
    } else if (isToday && isNaN(fecha.getHours())) {
      timerEl.textContent = 'HOY!';
    } else if (diff > 0) {
      const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      timerEl.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
      location.reload(); // Pasado el partido, recarga para buscar el siguiente
    }
  }

  tick();
  setInterval(tick, 1000);
}

renderCountdown('real', getNextMatch('real'));
renderCountdown('athletic', getNextMatch('athletic'));
