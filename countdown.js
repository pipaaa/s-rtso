const partidos = [
  { equipo: "RSO", rival: "LPA", fecha: "2025-04-06T14:00:00", local: false },
  { equipo: "ATH", rival: "VIL", fecha: "2025-04-06T21:00:00", local: false },
  { equipo: "RSO", rival: "MLL", fecha: "2025-04-12T14:00:00", local: true },
  { equipo: "ATH", rival: "RAY", fecha: "2025-04-13T21:00:00", local: true },
  { equipo: "ATH", rival: "RAN", fecha: "2025-04-10T21:00:00", local: false }, // Europa League
  { equipo: "ATH", rival: "RAN", fecha: "2025-04-17T21:00:00", local: true },
  { equipo: "RSO", rival: "VIL", fecha: "2025-04-20T16:15:00", local: false },
  { equipo: "ATH", rival: "RMA", fecha: "2025-04-20T21:00:00", local: false },
  { equipo: "ATH", rival: "LPA", fecha: "2025-04-26T19:00:00", local: true },
  { equipo: "RSO", rival: "ALA", fecha: "2025-04-27T21:30:00", local: false },
  { equipo: "ATH", rival: "RSO", fecha: "2025-05-04", local: true },
  { equipo: "ATH", rival: "ALA", fecha: "2025-05-11", local: true },
  { equipo: "RSO", rival: "ATL", fecha: "2025-05-11", local: false },
  { equipo: "ATH", rival: "GET", fecha: "2025-05-14", local: false },
  { equipo: "RSO", rival: "CEL", fecha: "2025-05-14", local: true },
  { equipo: "RSO", rival: "GIR", fecha: "2025-05-18", local: true },
  { equipo: "ATH", rival: "VAL", fecha: "2025-05-18", local: false },
  { equipo: "ATH", rival: "FCB", fecha: "2025-05-25", local: true },
  { equipo: "RSO", rival: "RMA", fecha: "2025-05-25", local: false },
];

const equipos = {
  RSO: "Real Sociedad",
  ATH: "Athletic",
  VIL: "Villarreal",
  RAN: "Rangers",
  MLL: "Mallorca",
  RAY: "Rayo Vallecano",
  LPA: "Las Palmas",
  ALA: "Alavés",
  ATL: "Atlético",
  GET: "Getafe",
  CEL: "Celta",
  GIR: "Girona",
  VAL: "Valencia",
  FCB: "Barcelona",
  RMA: "Real Madrid"
};

const contenedor = document.getElementById("match-countdowns");

["RSO", "ATH"].forEach(club => {
  const siguiente = partidos.filter(p => p.equipo === club).sort((a, b) => new Date(a.fecha) - new Date(b.fecha)).find(p => {
    const ahora = new Date();
    const inicio = new Date(p.fecha);
    const fin = new Date(inicio.getTime() + 105 * 60000);
    return ahora < fin;
  });

  if (!siguiente) return;

  const local = siguiente.local ? siguiente.equipo : siguiente.rival;
  const visitante = siguiente.local ? siguiente.rival : siguiente.equipo;
  const donde = siguiente.local ? "En casa" : "Fuera de casa";
  const equipoNombre = equipos[siguiente.equipo];
  const rivalNombre = equipos[siguiente.rival];
  const fechaPartido = new Date(siguiente.fecha);

  const div = document.createElement("div");
  div.className = "match-box";
  div.innerHTML = `
    <div class="logos">
      <img src="logo${local}.png" alt="${equipos[local]}" />
      <span class="vs-text">vs</span>
      <img src="logo${visitante}.png" alt="${equipos[visitante]}" />
    </div>
    <div class="info">
      <strong>${equipos[local]}</strong> vs <strong>${equipos[visitante]}</strong><br>
      <span>${donde}</span><br>
      <div class="cuenta-atras" id="contador-${club}"></div>
    </div>
  `;
  contenedor.appendChild(div);

  function actualizarCuentaAtras() {
    const ahora = new Date();
    const inicio = new Date(fechaPartido);
    const fin = new Date(inicio.getTime() + 105 * 60000);
    const destino = document.getElementById(`contador-${club}`);

    if (ahora.toDateString() === inicio.toDateString() && isNaN(inicio.getHours())) {
      destino.textContent = "HOY!";
    } else if (ahora >= inicio && ahora <= fin) {
      destino.textContent = "EN DIRECTO!";
    } else if (ahora < inicio) {
      const diff = inicio - ahora;
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      destino.textContent = `${d}d ${h}h ${m}m ${s}s`;
    } else {
      destino.textContent = "Próximamente";
    }
  }

  actualizarCuentaAtras();
  setInterval(actualizarCuentaAtras, 1000);
});
