const partidos = [
    // Jornada 30
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'U.D. Las Palmas', fecha: '2025-04-06T14:00:00', lugar: 'Fuera', logoLocal: 'logoRS.png', logoVisitante: 'logoLPA.png' },
    { equipoLocal: 'Villarreal', equipoVisitante: 'Athletic', fecha: '2025-04-06T21:00:00', lugar: 'Fuera', logoLocal: 'logoVIL.png', logoVisitante: 'logoATH.png' },

    // Jornada 31
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Mallorca', fecha: '2025-04-12T14:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoMALL.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Rayo Vallecano', fecha: '2025-04-13T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRAY.png' },

    // Jornada 32
    { equipoLocal: 'Villarreal', equipoVisitante: 'Real Sociedad', fecha: '2025-04-19T16:15:00', lugar: 'Fuera', logoLocal: 'logoVIL.png', logoVisitante: 'logoRS.png' },
    { equipoLocal: 'Real Madrid', equipoVisitante: 'Athletic', fecha: '2025-04-19T21:00:00', lugar: 'Fuera', logoLocal: 'logoRMA.png', logoVisitante: 'logoATH.png' },

    // Jornada 33
    { equipoLocal: 'Athletic', equipoVisitante: 'Las Palmas', fecha: '2025-04-26T19:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoLPA.png' },
    { equipoLocal: 'Alavés', equipoVisitante: 'Real Sociedad', fecha: '2025-04-27T21:30:00', lugar: 'Fuera', logoLocal: 'logoALA.png', logoVisitante: 'logoRS.png' },

    // Jornada 34
    { equipoLocal: 'Athletic', equipoVisitante: 'Real Sociedad', fecha: '2025-05-04T00:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRS.png' },

    // Jornada 35
    { equipoLocal: 'Athletic', equipoVisitante: 'Alavés', fecha: '2025-05-11T00:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoALA.png' },
    { equipoLocal: 'Atlético', equipoVisitante: 'Real Sociedad', fecha: '2025-05-11T00:00:00', lugar: 'Fuera', logoLocal: 'logoATM.png', logoVisitante: 'logoRS.png' },

    // Jornada 36
    { equipoLocal: 'Getafe', equipoVisitante: 'Athletic', fecha: '2025-05-14T21:00:00', lugar: 'Fuera', logoLocal: 'logoGET.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Celta de Vigo', fecha: '2025-05-14T21:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoCEL.png' },

    // Jornada 37
    { equipoLocal: 'Real Sociedad', equipoVisitante: 'Girona', fecha: '2025-05-18T21:00:00', lugar: 'Casa', logoLocal: 'logoRS.png', logoVisitante: 'logoGIR.png' },
    { equipoLocal: 'Valencia', equipoVisitante: 'Athletic', fecha: '2025-05-18T21:00:00', lugar: 'Fuera', logoLocal: 'logoVAL.png', logoVisitante: 'logoATH.png' },

    // Última jornada
    { equipoLocal: 'Athletic', equipoVisitante: 'Barcelona', fecha: '2025-05-25T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoBAR.png' },
    { equipoLocal: 'Real Madrid', equipoVisitante: 'Real Sociedad', fecha: '2025-05-25T21:00:00', lugar: 'Fuera', logoLocal: 'logoRMA.png', logoVisitante: 'logoRS.png' },

    // Europa League
    { equipoLocal: 'Rangers', equipoVisitante: 'Athletic', fecha: '2025-04-10T21:00:00', lugar: 'Fuera', logoLocal: 'logoRAN.png', logoVisitante: 'logoATH.png' },
    { equipoLocal: 'Athletic', equipoVisitante: 'Rangers', fecha: '2025-04-17T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoRAN.png' },

    // Semifinales en caso de pasar cuartos
    { equipoLocal: 'Athletic', equipoVisitante: 'X equipo', fecha: '2025-05-01T21:00:00', lugar: 'Casa', logoLocal: 'logoATH.png', logoVisitante: 'logoX.png' },
    { equipoLocal: 'X equipo', equipoVisitante: 'Athletic', fecha: '2025-05-08T21:00:00', lugar: 'Fuera', logoLocal: 'logoX.png', logoVisitante: 'logoATH.png' }
];

function updateCounter(partido, elementId) {
    const partidoElement = document.getElementById(elementId);
    
    const now = new Date();
    const partidoFecha = new Date(partido.fecha);
    const tiempoRestante = partidoFecha - now;

    if (tiempoRestante <= 0) {
        // Si ya pasó la hora, mostrar "EN DIRECTO!" durante 105 minutos
        const enDirectoEndTime = partidoFecha.getTime() + 105 * 60000;
        if (now.getTime() < enDirectoEndTime) {
            partidoElement.innerHTML = `
                <div class="partido">
                    <div class="equipo local">
                        <img src="${partido.logoLocal}" class="logo" alt="${partido.equipoLocal}">
                        <p class="nombre">${partido.equipoLocal}</p>
                    </div>
                    <div class="contador">
                        <p class="cuenta">EN DIRECTO!</p>
                    </div>
                    <div class="equipo visitante">
                        <img src="${partido.logoVisitante}" class="logo" alt="${partido.equipoVisitante}">
                        <p class="nombre">${partido.equipoVisitante}</p>
                    </div>
                </div>
            `;
        } else {
            // Si han pasado los 105 minutos, pasa al siguiente partido
            const siguientePartido = partidos.find(p => new Date(p.fecha) > now);
            updateCounter(siguientePartido, elementId);
        }
    } else if (partidoFecha.toDateString() === now.toDateString()) {
        partidoElement.innerHTML = `
            <div class="partido">
                <div class="equipo local">
                    <img src="${partido.logoLocal}" class="logo" alt="${partido.equipoLocal}">
                    <p class="nombre">${partido.equipoLocal}</p>
                </div>
                <div class="contador">
                    <p class="cuenta">HOY!</p>
                </div>
                <div class="equipo visitante">
                    <img src="${partido.logoVisitante}" class="logo" alt="${partido.equipoVisitante}">
                    <p class="nombre">${partido.equipoVisitante}</p>
                </div>
            </div>
        `;
    } else {
        // Mostrar cuenta atrás normal
        const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        partidoElement.innerHTML = `
            <div class="partido">
                <div class="equipo local">
                    <img src="${partido.logoLocal}" class="logo" alt="${partido.equipoLocal}">
                    <p class="nombre">${partido.equipoLocal}</p>
                </div>
                <div class="contador">
                    <p class="cuenta">${horas}h ${minutos}m ${segundos}s</p>
                    <p class="ubicacion">${partido.lugar}</p>
                </div>
                <div class="equipo visitante">
                    <img src="${partido.logoVisitante}" class="logo" alt="${partido.equipoVisitante}">
                    <p class="nombre">${partido.equipoVisitante}</p>
                </div>
            </div>
        `;
    }
}

// Iniciar el contador para los partidos de la Real Sociedad y Athletic
const siguientePartidoRealSociedad = partidos.find(p => p.equipoLocal === 'Real Sociedad' || p.equipoVisitante === 'Real Sociedad');
updateCounter(siguientePartidoRealSociedad, 'real-sociedad');

const siguientePartidoAthletic = partidos.find(p => p.equipoLocal === 'Athletic' || p.equipoVisitante === 'Athletic');
updateCounter(siguientePartidoAthletic, 'athletic');
