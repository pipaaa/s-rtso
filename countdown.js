const partidos = [
  // FORMATO: [fecha (UTC), local, visitante, 'RSO' o 'ATH']
  ["2025-04-06T14:00:00", "LPA", "RSO", "RSO"],
  ["2025-04-06T21:00:00", "VIL", "ATH", "ATH"],
  ["2025-04-12T14:00:00", "RSO", "MLL", "RSO"],
  ["2025-04-13T21:00:00", "ATH", "RAY", "ATH"],
  ["2025-04-20T16:15:00", "VIL", "RSO", "RSO"],
  ["2025-04-20T21:00:00", "RMA", "ATH", "ATH"],
  ["2025-04-26T19:00:00", "ATH", "LPA", "ATH"],
  ["2025-04-27T21:30:00", "ALA", "RSO", "RSO"],
  ["2025-05-04", "ATH", "RSO", "ATH"],
  ["2025-05-11", "ATH", "ALA", "ATH"],
  ["2025-05-11", "ATM", "RSO", "RSO"],
  ["2025-05-14", "GET", "ATH", "ATH"],
  ["2025-05-14", "RSO", "CEL", "RSO"],
  ["2025-05-18", "RSO", "GIR", "RSO"],
  ["2025-05-18", "VAL", "ATH", "ATH"],
  ["2025-05-25", "ATH", "FCB", "ATH"],
  ["2025-05-25", "RMA", "RSO", "RSO"],
  ["2025-04-10T21:00:00", "RAN", "ATH", "ATH"],
  ["2025-04-17T21:00:00", "ATH", "RAN", "ATH"],
  ["2025-05-01T21:00:00", "ATH", "XXX", "ATH"],
  ["2025-05-08T21:00:00", "XXX", "ATH", "ATH"]
];

function crearContador(idPrefix, equipo) {
  const ahora = new Date();
  const siguiente = partidos.find(p => p[3] === equipo && new Date(p[0]) > ahora);
  if (!siguiente) return;

  const [fechaStr, local, visitante, tipo] = siguiente;
  const fechaPartido = new Date(fechaStr);
  const esEnCasa = local === tipo;
  const ubicacion = esEnCasa ? "En casa" : "Fuera de casa";
  const localLogo = `logo${local}.png`;
  const visitanteLogo = `logo${visitante}.png`;

  document.getElementById(`logoLocal${tipo}`).src = `./${localLogo}`;
  document.getElementById(`logoVisitante${tipo}`).src = `./${visitanteLogo}`;
  document.getElementById(`equipos${tipo}`).textContent = `${local} - ${visitante}`;
  document.getElementById(`ubicacion${tipo}`).textContent = ubicacion;

  const timerEl = document.getElementById(`timer${tipo}`);

  function actualizarContador() {
    const ahora = new Date();
    const diff = fechaPartido - ahora;

    if (diff <= 0 && diff > -105 * 60000) {
      timerEl.textContent = "EN DIRECTO!";
    } else if (fechaStr.length === 10 && ahora.toISOString().slice(0, 10) === fechaStr) {
      timerEl.textContent = "HOY!";
    } else if (diff <= -105 * 60000) {
      location.reload(); // refrescar para mostrar el siguiente partido
    } else {
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diff / (1000 * 60)) % 60);
      const segundos = Math.floor((diff / 1000) % 60);
      timerEl.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    }
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);
}

crearContador("countdownRSO", "RSO");
crearContador("countdownATH", "ATH");
