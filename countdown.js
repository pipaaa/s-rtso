// Array de partidos con solo la información esencial
const partidos = [
  { equipoLocal: "Real Sociedad", equipoVisitante: "Las Palmas", fecha: new Date("April 7, 2025 14:00:00"), lugar: "Casa", logoLocal: "logoRSO.png", logoVisitante: "logoLPA.png" },
  { equipoLocal: "Villarreal", equipoVisitante: "Real Sociedad", fecha: new Date("April 18, 2025 16:15:00"), lugar: "Fuera", logoLocal: "logoVIL.png", logoVisitante: "logoRSO.png" },
  { equipoLocal: "Real Sociedad", equipoVisitante: "Mallorca", fecha: new Date("April 12, 2025 14:00:00"), lugar: "Casa", logoLocal: "logoRSO.png", logoVisitante: "logoMAL.png" },
  { equipoLocal: "Athletic", equipoVisitante: "Real Sociedad", fecha: new Date("May 4, 2025 21:00:00"), lugar: "Casa", logoLocal: "logoATH.png", logoVisitante: "logoRSO.png" },
  { equipoLocal: "Athletic", equipoVisitante: "Las Palmas", fecha: new Date("April 22, 2025 19:00:00"), lugar: "Casa", logoLocal: "logoATH.png", logoVisitante: "logoLPA.png" },
  { equipoLocal: "Villarreal", equipoVisitante: "Athletic", fecha: new Date("April 7, 2025 21:00:00"), lugar: "Fuera", logoLocal: "logoVIL.png", logoVisitante: "logoATH.png" },
  // Agregar más partidos aquí
];

// Función que obtiene el siguiente partido de la Real Sociedad o Athletic
function obtenerSiguientePartido(equipo) {
  const partidosFiltrados = partidos.filter(p => p.equipoLocal === equipo || p.equipoVisitante === equipo);
  // Filtrar los partidos que aún no han pasado
  const partidosFuturos = partidosFiltrados.filter(p => p.fecha > new Date());
  return partidosFuturos.length > 0 ? partidosFuturos[0] : null;
}

// Crear la cuenta atrás para el partido
function crearCuentaAtras(partido, idElemento) {
  const timerContainer = document.getElementById(idElemento);
  const juego = document.getElementById(idElemento + "Game");
  const contador = document.getElementById(idElemento + "Timer");

  // Crear los logos de los equipos
  const logoLocal = document.createElement("img");
  logoLocal.src = partido.logoLocal;
  logoLocal.classList.add("team-logo");

  const logoVisitante = document.createElement("img");
  logoVisitante.src = partido.logoVisitante;
  logoVisitante.classList.add("team-logo");

  // Mostrar los equipos y si es en casa o fuera
  juego.innerHTML = `
    <div>${partido.equipoLocal} - ${partido.equipoVisitante}</div>
    <div>${partido.lugar}</div>
  `;

  // Añadir los logos y el contenido de la cuenta atrás al contenedor
  timerContainer.appendChild(logoLocal);
  timerContainer.appendChild(juego);
  timerContainer.appendChild(logoVisitante);

  function actualizarCuentaAtras() {
    const ahora = new Date();
    const tiempoRestante = partido.fecha - ahora;

    if (tiempoRestante <= 0) {
      // Si ya ha pasado el tiempo, mostrar "EN DIRECTO!"
      contador.innerText = "EN DIRECTO!";
    } else if (partido.fecha.toDateString() === ahora.toDateString() && partido.fecha.getHours() === 0) {
      // Si el día es hoy pero el partido no tiene hora definida
      contador.innerText = "HOY!";
    } else {
      // Si aún no ha llegado el partido, mostrar cuenta atrás
      const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
      const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
      contador.innerText = `${horas}h ${minutos}m ${segundos}s`;
    }
  }

  setInterval(actualizarCuentaAtras, 1000);
}

// Inicialización: Crear los contadores para los próximos partidos de la Real Sociedad y el Athletic
window.onload = () => {
  const siguientePartidoReal = obtenerSiguientePartido("Real Sociedad");
  const siguientePartidoAthletic = obtenerSiguientePartido("Athletic");

  if (siguientePartidoReal) {
    crearCuentaAtras(siguientePartidoReal, "realSociedadCountdown");
  }

  if (siguientePartidoAthletic) {
    crearCuentaAtras(siguientePartidoAthletic, "athleticCountdown");
  }
};
