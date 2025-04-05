const partidos = [
  // Real Sociedad
  {
    equipoLocal: "Real Sociedad",
    equipoVisitante: "Las Palmas",
    fecha: new Date("April 7, 2025 14:00:00"),
    lugar: "Casa",
    logoLocal: "logoRSO.png",
    logoVisitante: "logoLPA.png"
  },
  {
    equipoLocal: "Villarreal",
    equipoVisitante: "Athletic",
    fecha: new Date("April 7, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoVIL.png",
    logoVisitante: "logoATH.png"
  },
  {
    equipoLocal: "Real Sociedad",
    equipoVisitante: "Mallorca",
    fecha: new Date("April 12, 2025 14:00:00"),
    lugar: "Casa",
    logoLocal: "logoRSO.png",
    logoVisitante: "logoMAL.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Rayo Vallecano",
    fecha: new Date("April 13, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoRAY.png"
  },
  {
    equipoLocal: "Villarreal",
    equipoVisitante: "Real Sociedad",
    fecha: new Date("April 18, 2025 16:15:00"),
    lugar: "Fuera",
    logoLocal: "logoVIL.png",
    logoVisitante: "logoRSO.png"
  },
  {
    equipoLocal: "Real Madrid",
    equipoVisitante: "Athletic",
    fecha: new Date("April 19, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoRMA.png",
    logoVisitante: "logoATH.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Las Palmas",
    fecha: new Date("April 22, 2025 19:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoLPA.png"
  },
  {
    equipoLocal: "Alaves",
    equipoVisitante: "Real Sociedad",
    fecha: new Date("April 23, 2025 21:30:00"),
    lugar: "Fuera",
    logoLocal: "logoALA.png",
    logoVisitante: "logoRSO.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Real Sociedad",
    fecha: new Date("May 4, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoRSO.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Alaves",
    fecha: new Date("May 11, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoALA.png"
  },
  {
    equipoLocal: "Atletico",
    equipoVisitante: "Real Sociedad",
    fecha: new Date("May 11, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoATM.png",
    logoVisitante: "logoRSO.png"
  },
  {
    equipoLocal: "Getafe",
    equipoVisitante: "Athletic",
    fecha: new Date("May 14, 2025 14:00:00"),
    lugar: "Fuera",
    logoLocal: "logoGET.png",
    logoVisitante: "logoATH.png"
  },
  {
    equipoLocal: "Real Sociedad",
    equipoVisitante: "Celta de Vigo",
    fecha: new Date("May 14, 2025 14:00:00"),
    lugar: "Casa",
    logoLocal: "logoRSO.png",
    logoVisitante: "logoCEL.png"
  },
  {
    equipoLocal: "Real Sociedad",
    equipoVisitante: "Girona",
    fecha: new Date("May 18, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoRSO.png",
    logoVisitante: "logoGIR.png"
  },
  {
    equipoLocal: "Valencia",
    equipoVisitante: "Athletic",
    fecha: new Date("May 18, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoVAL.png",
    logoVisitante: "logoATH.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Barcelona",
    fecha: new Date("May 25, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoBAR.png"
  },
  {
    equipoLocal: "Real Madrid",
    equipoVisitante: "Real Sociedad",
    fecha: new Date("May 25, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoRMA.png",
    logoVisitante: "logoRSO.png"
  },
  
  // Europa League
  {
    equipoLocal: "Rangers",
    equipoVisitante: "Athletic",
    fecha: new Date("April 10, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoRAN.png",
    logoVisitante: "logoATH.png"
  },
  {
    equipoLocal: "Athletic",
    equipoVisitante: "Rangers",
    fecha: new Date("April 17, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoRAN.png"
  },

  // Semifinales en caso de pasar cuartos
  {
    equipoLocal: "Athletic",
    equipoVisitante: "X equipo",
    fecha: new Date("May 1, 2025 21:00:00"),
    lugar: "Casa",
    logoLocal: "logoATH.png",
    logoVisitante: "logoX.png"
  },
  {
    equipoLocal: "X equipo",
    equipoVisitante: "Athletic",
    fecha: new Date("May 8, 2025 21:00:00"),
    lugar: "Fuera",
    logoLocal: "logoX.png",
    logoVisitante: "logoATH.png"
  }
];

function crearCuentaAtras(partido, idElemento) {
  const timerContainer = document.getElementById(idElemento);
  const juego = document.getElementById(idElemento + "Game");
  const contador = document.getElementById(idElemento + "Timer");

  const logoLocal = document.createElement("img");
  logoLocal.src = partido.logoLocal;
  logoLocal.classList.add("team-logo");

  const logoVisitante = document.createElement("img");
  logoVisitante.src = partido.logoVisitante;
  logoVisitante.classList.add("team-logo");

  juego.innerHTML = `
    <div>${partido.equipoLocal} - ${partido.equipoVisitante}</div>
    <div>${partido.lugar}</div>
  `;

  timerContainer.appendChild(logoLocal);
  timerContainer.appendChild(juego);
  timerContainer.appendChild(logoVisitante);

  function actualizarCuentaAtras() {
    const ahora = new Date();
    const tiempoRestante = partido.fecha - ahora;
    
    if (tiempoRestante <= 0) {
      // Si ya ha pasado el tiempo, mostrar "EN DIRECTO!"
      contador.innerText = "EN DIRECTO!";
    } else if (partido.fecha.toDateString() === ahora.toDateString()) {
      // Si el día es hoy pero aún no ha pasado la hora
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

window.onload = () => {
  // Crear cuenta atrás para todos los partidos de la Real Sociedad y Athletic
  for (let i = 0; i < partidos.length; i++) {
    crearCuentaAtras(partidos[i], `countdown-${i}`);
  }
};
