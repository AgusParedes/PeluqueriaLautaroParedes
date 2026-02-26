function GenerarTabla({
  modo,
  turnosReservados,
  turnosBloqueados,
  onClickTurno,
  desbloquearTurno
}) {

  const GenerarHorarios = () => {
    const horarios = [];

    let hora = 9;
    let minutos = 0;

    while (hora < 21 || (hora === 20 && minutos === 30)) {
      const h = hora.toString().padStart(2, "0");
      const m = minutos.toString().padStart(2, "0");

      horarios.push(`${h}:${m}`);

      minutos += 30;

      if (minutos === 60) {
        minutos = 0;
        hora++;
      }
    }

    return horarios;
  };

  const horarios = GenerarHorarios();
  const horariosPermitidos = horarios.filter(hora => hora !== "13:00");

  const hoy = new Date();
  const dias = [];

  for (let i = 0; i < 12; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);
    dias.push(fecha);
  }

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {dias.map((dia, index) => (
        <div key={index}>
          <div>
            {dia.toLocaleDateString()}
          </div>

          <div>
            {horariosPermitidos.map((hora) => {

              const fechaFormateada = dia.toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long"
              });

              const idTurno = `${fechaFormateada}-${hora}`;

              const estaReservado = turnosReservados.some(
                turno => turno.id === idTurno
              );;
              
              const estaBloqueado = turnosBloqueados.includes(idTurno);

              const deshabilitado = estaReservado || estaBloqueado;

              return (
                <div key={hora}>
                  <div>{hora}</div>

                  <button
                    disabled={deshabilitado}
                    onClick={() => onClickTurno(hora, dia)}
                  >
                    {estaBloqueado
                        ? "Bloqueado"
                        : estaReservado
                        ? "Reservado"
                        : modo === "cliente"
                        ? "Reservar"
                        : "Bloquear"}
                  </button>
                  {(estaReservado || estaBloqueado) && modo === "peluquero" && (
                    <button onClick={() => desbloquearTurno(hora, dia)}>
                      Desbloquear
                    </button>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GenerarTabla;