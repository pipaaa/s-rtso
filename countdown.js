// Datos de los partidos con fecha y hora
const partidos = [
    // Jornada 30
    { local: 'U.D. Las Palmas', visitante: 'Real Sociedad', fecha: '2023-04-07T14:00:00', liga: 'LaLiga', casa: false },
    { local: 'Villareal', visitante: 'Athletic', fecha: '2023-04-09T21:00:00', liga: 'LaLiga', casa: false },
    // Jornada 31
    { local: 'Real Sociedad', visitante: 'Mallorca', fecha: '2023-04-15T14:00:00', liga: 'LaLiga', casa: true },
    { local: 'Athletic', visitante: 'Rayo Vallecano', fecha: '2023-04-16T21:00:00', liga: 'LaLiga', casa: true },
    // Jornada 32
    { local: 'Villareal', visitante: 'Real Sociedad', fecha: '2023-04-18T16:15:00', liga: 'LaLiga', casa: false },
    { local: 'Real Madrid', visitante: 'Athletic', fecha: '2023-04-18T21:00:00', liga: 'LaLiga', casa: false },
    // Jornada 33
    { local: 'Athletic', visitante: 'Las Palmas', fecha: '2023-04-22T19:00:00', liga: 'LaLiga', casa: true },
    { local: 'Alaves', visitante: 'Real Sociedad', fecha: '2023-04-23T21:30:00', liga: 'LaLiga', casa: false },
    // Jornada 34
    { local: 'Athletic', visitante: 'Real Sociedad', fecha: '2023-05-04T21:00:00', liga: 'LaLiga', casa: true },
    // Jornada 35
    { local: 'Athletic', visitante: 'Alaves', fecha: '2023-05-11T21:00:00', liga: 'LaLiga', casa: true },
    { local: 'Atletico', visitante: 'Real Sociedad', fecha: '2023-05-11T21:00:00', liga: 'LaLiga', casa: false },
    // Jornada 36
    { local: 'Getafe', visitante: 'Athletic', fecha: '2023-05-14T19:00:00', liga: 'LaLiga', casa: false },
    { local: 'Real Sociedad', visitante: 'Celta de Vigo', fecha: '2023-05-14T21:00:00', liga: 'LaLiga', casa: true },
    // Jornada 37
    { local: 'Real Sociedad', visitante: 'Girona', fecha: '2023-05-18T21:00:00', liga: 'LaLiga', casa: true },
    { local: 'Valencia', visitante: 'Athletic', fecha: '2023-05-18T21:00:00', liga: 'LaLiga', casa: false },
    // Última jornada
    { local: 'Athletic', visitante: 'Barcelona', fecha: '2023-05-25T21:00:00', liga: 'LaLiga', casa: true },
    { local: 'Real Madrid', visitante: 'Real Sociedad', fecha: '2023-05-25T21:00:00', liga: 'LaLiga', casa: false },
    // Europa League
    { local: 'Rangers', visitante: 'Athletic', fecha: '2023-04-10T21:00:00', liga: 'Europa League', casa: false },
    { local: 'Athletic', visitante: 'Rangers', fecha: '2023-04-17T21:00:00', liga: 'Europa League', casa: true },
    // Semifinales (en caso de pasar cuartos)
    { local: 'Athletic', visitante: 'X equipo', fecha: '2023-05-01T21:00:00', liga: 'Europa League', casa: true },
    { local: 'X equipo', visitante: 'Athletic', fecha: '2023-05-08T21:00:00', liga: 'Europa League', casa: false }
];

// Función para actualizar el contador de cada partido
function actualizarContadores() {
    const ahora = new Date();

    // Ordenamos los partidos por fecha para mostrar el siguiente
    const partidosOrdenados = partidos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    let siguientePartido = null;

    // Buscar el siguiente partido
    for (const partido of partidosOrdenados) {
        if (new Date(partido.fecha) > ahora) {
            siguientePartido = partido;
            break;
        }
    }

    // Si hay un siguiente partido
    if (siguientePartido) {
        // Calculamos la cuenta atrás
        const fechaPartido = new Date(siguientePartido.fecha);
        const diff = fechaPartido - ahora;
        const segundos = Math.floor(diff / 1000) % 60;
        const minutos = Math.floor(diff / 60000) % 60;
        const horas = Math.floor(diff / 3600000) % 24;
        const dias = Math.floor(diff / 86400000);

        // Mostramos los detalles en el HTML
        document.getElementById('countdownTimeRS').innerText = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        document.getElementById('locationRS').innerText = siguientePartido.casa ? "En casa" : "Fuera de casa";

        // Actualizamos los detalles de los equipos
        document.getElementById('countdownRealSociedad').innerHTML = `
            <div class="contador-item">
                <img src="logoRS.png" alt="Real Sociedad Logo" class="team-logo" />
                <span class="team-name">${siguientePartido.local}</span>
            </div>
        `;
        document.getElementById('countdownAthletic').innerHTML = `
            <div class="contador-item">
                <img src="logoATH.png" alt="Athletic Logo" class="team-logo" />
                <span class="team-name">${siguientePartido.visitante}</span>
            </div>
        `;
    }
}

// Llamamos a la función para actualizar los contadores cada segundo
setInterval(actualizarContadores, 1000);
