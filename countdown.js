const partidos = {
  real: [
    { local: "LPA", visitante: "RSO", fecha: "2025-04-06T14:00:00", lugar: "Fuera" },
    { local: "RSO", visitante: "MLL", fecha: "2025-04-12T14:00:00", lugar: "En casa" },
    { local: "VIL", visitante: "RSO", fecha: "2025-04-20T16:15:00", lugar: "Fuera" },
    { local: "ALA", visitante: "RSO", fecha: "2025-04-28", lugar: "Fuera" },
    { local: "ATH", visitante: "RSO", fecha: "2025-05-04", lugar: "Fuera" },
    { local: "ATM", visitante: "RSO", fecha: "2025-05-11", lugar: "Fuera" },
    { local: "RSO", visitante: "CEL", fecha: "2025-05-14", lugar: "En casa" },
    { local: "RSO", visitante: "GIR", fecha: "2025-05-18", lugar: "En casa" },
    { local: "RMA", visitante: "RSO", fecha: "2025-05-25", lugar: "Fuera" },
  ],
  athletic: [
    { local: "VIL", visitante: "ATH", fecha: "2025-04-06T21:00:00", lugar: "Fuera" },
    { local: "RAN", visitante: "ATH", fecha: "2025-04-10T21:00:00", lugar: "Fuera" },
    { local: "ATH", visitante: "RAN", fecha: "2025-04-17T21:00:00", lugar: "En casa" },
    { local: "ATH", visitante: "RAY", fecha: "2025-04-13T21:00:00", lugar: "En casa" },
    { local: "RMA", visitante: "ATH", fecha: "2025-04-20T21:00:00", lugar: "Fuera" },
    { local: "ATH", visitante: "LPA", fecha: "2025-04-26T19:00:00", lugar: "En casa" },
    { local: "ATH", visitante: "RSO", fecha: "2025-05-04", lugar: "En casa" },
    { local: "ATH", visitante: "ALA", fecha: "2025-05-11", lugar: "En casa" },
    { local: "GET", visitante: "ATH", fecha: "2025-05-14", lugar: "Fuera" },
    { local: "VAL", visitante: "ATH", fecha: "2025-05-18", lugar: "Fuera" },
    { local: "ATH", visitante: "BAR", fecha: "2025-05-25", lugar: "En casa" }
  ]
};

function actualizarContador(equipo, containerId) {
  const ahora = new Date();
  const lista = partidos[equipo];

  for (let i = 0; i < lista.length; i++) {
    const partido = lista[i];
    const fechaPartido = new Date(partido.fecha);

    const diff = fechaPartido - ahora;
    const hoy = new Date();
    const mismoDia = fechaPartido.toDateString() === hoy.toDateString();

    if (diff > -105 * 60 * 1000) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      const matchContainer = document.createElement("div");
      matchContainer.className = "match-container";

      const localLogo = document.createElement("img");
      localLogo.className = "match-logo";
      localLogo.src = `logo${partido.local}.png`;

      const visitanteLogo = document.createElement("img");
      visitanteLogo.className = "match-logo";
      visitanteLogo.src = `logo${partido.visitante}.png`;

      const info = document.createElement("div");
      info.className = "match-info";

      const vs = document.createElement("div");
      vs.className = "match-vs";
      vs.textContent = `${partido.local} vs ${partido.visitante}`;
      info.appendChild(vs);

      const location = document.createElement("div");
      location.className = "match-location";
      location.textContent = `Se juega: ${partido.lugar}`;
      info.appendChild(location);

      const contador = document.createElement("div");
      contador.className = "countdown";
      info.appendChild(contador);

      const logoPrimero = partido.lugar === "En casa" ? localLogo : visitanteLogo;
      const logoSegundo = partido.lugar === "En casa" ? visitanteLogo : localLogo;

      matchContainer.appendChild(logoPrimero);
      matchContainer.appendChild(info);
      matchContainer.appendChild(logoSegundo);
      container.appendChild(matchContainer);

      function actualizar() {
        const ahora = new Date();
        const diff = fechaPartido - ahora;

        if (diff <= -105 * 60 * 1000) {
          clearInterval(intervalo);
          actualizarContador(equipo, containerId);
          return;
        }

        if (diff <= 0 && diff > -105 * 60 * 1000) {
          contador.textContent = "EN DIRECTO!";
        } else if (diff > 0 && mismoDia && !partido.fecha.includes("T")) {
          contador.textContent = "HOY!";
        } else {
          const horas = Math.floor(diff / (1000 * 60 * 60));
          const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const segundos = Math.floor((diff % (1000 * 60)) / 1000);
          contador.textContent = `${horas}h ${minutos}m ${segundos}s`;
        }
      }

      actualizar();
      const intervalo = setInterval(actualizar, 1000);
      break;
    }
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador("real", "contadorReal");
  actualizarContador("athletic", "contadorAth");
});
