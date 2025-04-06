const partidos = [
    // Todos los partidos de la Real Sociedad y el Athletic
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'U.D. Las Palmas', fecha: '2025-04-06T14:00:00', lugar: 'Fuera', logoLocal: 'logoRS.png', logoVisitante: 'logoLPA.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Villarreal', fecha: '2025-04-06T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoVIL.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Mallorca', fecha: '2025-04-11T14:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoMALL.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Rayo Vallecano', fecha: '2025-04-12T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRAY.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Villarreal', fecha: '2025-04-18T16:15:00', lugar: 'Fuera', logoLocal: 'logoRS.png', logoVisitante: 'logoVIL.png' },
    { equipoLocal: 'Real Madrid', equipoVisitante: 'Athletic', fecha: '2025-04-19T21:00:00', lugar: 'Fuera', logoLocal: 'logoRM.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Las Palmas', fecha: '2025-04-22T19:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoLPA.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Alaves', fecha: '2025-04-23T21:30:00', lugar: 'Fuera', logoLocal: 'logoRS.png', logoVisitante: 'logoALV.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Real Sociedad', fecha: '2025-05-04T00:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRS.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Alaves', fecha: '2025-05-11T00:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoALV.png' },
    { equipoLocal: 'Atletico Madrid', equipoVisitante: 'Real Sociedad', fecha: '2025-05-11T00:00:00', lugar: 'Fuera', logoLocal: 'logoATM.png', logoVisitante: 'logoRS.png' },
    { equipoLocal: 'Getafe', equipoVisitante: 'Athletic', fecha: '2025-05-14T21:00:00', lugar: 'Fuera', logoLocal: 'logoGET.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Celta de Vigo', fecha: '2025-05-14T21:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoCEL.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Girona', fecha: '2025-05-18T00:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoGIR.png' },
    { equipoLocal: 'Valencia', equipoVisitante: 'Athletic', fecha: '2025-05-18T00:00:00', lugar: 'Fuera', logoLocal: 'logoVAL.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Barcelona', fecha: '2025-05-25T00:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoBAR.png' },
    { equipoLocal: 'Real Madrid', equipoVisitante: 'Real Sociedad', fecha: '2025-05-25T00:00:00', lugar: 'Fuera', logoLocal: 'logoRM.png', logoVisitante: 'logoRS.png' },

    // Europa League
    { equipoLocal: 'Rangers', equipoVisitante: 'Athletic', fecha: '2025-04-10T21:00:00', lugar: 'Fuera', logoLocal: 'logoRAN.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Rangers', fecha: '2025-04-17T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRAN.png' },

    // Semifinales en caso de pasar cuartos
    { equipoLocal: 'Athletic', equipoVisitante: 'X equipo', fecha: '2025-05-01T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoX.png' },
    { equipoLocal: 'X equipo', equipoVisitante: 'Athletic', fecha: '2025-05-08T21:00:00', lugar: 'Fuera', logoLocal: 'logoX.png', logoVisitante: 'logoATH.png' }
];

const actualizarContador = (partido, contenedor) => {
    const ahora = new Date().getTime();
    const fechaPartido = new Date(partido.fecha).getTime();
    let tiempoRestante = fechaPartido - ahora;

    if (tiempoRestante <= 0) {
        tiempoRestante = 0;
    }

    const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

    const contenedorHTML = document.getElementById(contenedor);
    contenedorHTML.innerHTML = `
        <div class="partido">
            <div class="equipo">
                <img src="${partido.logoLocal}" class="logo" alt="${partido.equipoLocal}">
                <p class="nombre">${partido.equipoLocal}</p>
            </div>
            <div class="contador">
                <p class="cuenta">${horas}h ${minutos}m ${segundos}s</p>
                <p class="ubicacion">${partido.lugar}</p>
            </div>
            <div class="equipo">
                <img src="${partido.logoVisitante}" class="logo" alt="${partido.equipoVisitante}">
                <p class="nombre">${partido.equipoVisitante}</p>
            </div>
        </div>
    `;
};

const actualizarContadores = () => {
    const ahora = new Date().getTime();
    // Obtener el siguiente partido de la Real Sociedad
    const siguientePartidoRealSociedad = partidos
        .filter(p => p.equipoLocal === 'Real Sociedad' || p.equipoVisitante === 'Real Sociedad')
        .find(p => new Date(p.fecha).getTime() > ahora);
    // Obtener el siguiente partido del Athletic
    const siguientePartidoAthletic = partidos
        .filter(p => p.equipoLocal === 'Athletic' || p.equipoVisitante === 'Athletic')
        .find(p => new Date(p.fecha).getTime() > ahora);

    // Actualizar los contadores con el siguiente partido de cada uno
    if (siguientePartidoRealSociedad) {
        actualizarContador(siguientePartidoRealSociedad, 'countdownRealSociedad');
    }

    if (siguientePartidoAthletic) {
        actualizarContador(siguientePartidoAthletic, 'countdownAthletic');
    }
};

// Ejecutar la actualización cada segundo
setInterval(actualizarContadores, 1000);
