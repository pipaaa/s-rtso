const partidos = [
  {
    equipo: "RSO",
    rivales: [
      { local: "LPA", visitante: "RSO", fecha: "2025-04-06T14:00:00" },
      { local: "RSO", visitante: "MLL", fecha: "2025-04-12T14:00:00" },
      { local: "VIL", visitante: "RSO", fecha: "2025-04-20T16:15:00" },
      { local: "ALA", visitante: "RSO", fecha: "2025-04-28T21:30:00" },
      { local: "ATH", visitante: "RSO", fecha: "2025-05-04" },
      { local: "ATM", visitante: "RSO", fecha: "2025-05-11" },
      { local: "RSO", visitante: "CEL", fecha: "2025-05-14" },
      { local: "RSO", visitante: "GIR", fecha: "2025-05-18" },
      { local: "RMA", visitante: "RSO", fecha: "2025-05-25" },
    ]
  },
  {
    equipo: "ATH",
    rivales: [
      { local: "VIL", visitante: "ATH", fecha: "2025-04-06T21:00:00" },
      { local: "ATH", visitante: "RAY", fecha: "2025-04-13T21:00:00" },
      { local: "RAN", visitante: "ATH", fecha: "2025-04-10T21:00:00" },
      { local: "ATH", visitante: "RAN", fecha: "2025-04-17T21:00:00" },
      { local: "ATH", visitante: "LPA", fecha: "2025-04-27T19:00:00" },
      { local: "ATH", visitante: "RSO", fecha: "2025-05-04" },
      { local: "ATH", visitante: "ALA", fecha: "2025-05-11" },
      { local: "GET", visitante: "ATH", fecha: "2025-05-14" },
      { local: "VAL", visitante: "ATH", fecha: "2025-05-18" },
      { local: "ATH", visitante: "FCB", fecha: "2025-05-25" }
    ]
  }
];

function iniciarContadores() {
  partidos.forEach(partido => {
    const proximo = buscarProximoPartido(partido.rivales);
    if (!proximo) return;

    const id = partido.equipo === "RSO" ? "RSO" : "ATH";
    const local = proximo.local;
    const visitante = proximo.visitante;
    const lugar = partido.equipo === local ? "En casa" : "Fuera";
    const logoLocal = `logo${local}.png`;
    const logoVisitante = `logo${visitante}.png`;

    document.getElementById(`teams${id}`).textContent = `${local} - ${visitante}`;
    document.getElementById(`location${id}`).textContent = lugar;
    document.getElementById(`homeLogo${id}`).src = logoLocal;
    document.getElementById(`awayLogo${id}`).src = logoVisitante;

    actualizarCuentaAtras(`countdown${id}`, proximo.fecha, partido.rivales, 0);
  });
}

function buscarProximoPartido(lista) {
  const ahora = new Date();
  for (let i = 0; i < lista.length; i++) {
    const fecha = new Date(lista[i].fecha);
    if (ahora < fecha || (lista[i].fecha.length <= 10 && esHoy(lista[i].fecha))) {
      return lista[i];
    }
  }
  return null;
}

function esHoy(fechaStr) {
  const hoy = new Date();
  const f = new Date(fechaStr + "T00:00:00");
  return hoy.toDateString() === f.toDateString();
}

function actualizarCuentaAtras(id, fechaStr, lista, index) {
  const elem = document.getElementById(id);
  const fecha = new Date(fechaStr);
  const sinHora = fechaStr.length <= 10;

  function tick() {
    const ahora = new Date();
    if (sinHora && esHoy(fechaStr)) {
      elem.textContent = "HOY!";
      return;
    }

    const diff = fecha - ahora;

    if (diff <= 0 && diff > -105 * 60 * 1000) {
      elem.textContent = "EN DIRECTO!";
      return;
    }

    if (diff <= -105 * 60 * 1000) {
      const siguiente = buscarProximoPartido(lista.slice(index + 1));
      if (siguiente) {
        actualizarCuentaAtras(id, siguiente.fecha, lista, index + 1);
      }
      return;
    }

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segs = Math.floor((diff % (1000 * 60)) / 1000);

    elem.textContent = `${horas}h ${mins}m ${segs}s`;
  }

  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", iniciarContadores);
