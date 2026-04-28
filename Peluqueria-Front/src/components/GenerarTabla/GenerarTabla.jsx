import { useState } from "react";
import "./GenerarTabla.scss";

function GenerarTabla({
  modo,
  turnosReservados,
  turnosBloqueados,
  onClickTurno,
  desbloquearTurno
}) {

  const [fechaActual, setFechaActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date());

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

    return horarios.filter(h => h !== "13:00");
  };

  const horarios = GenerarHorarios();

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  const ultimoDia = new Date(año, mes + 1, 0).getDate();

  const primerDia = new Date(año, mes, 1).getDay();
  const primerDiaAjustado = primerDia === 0 ? 6 : primerDia - 1;

  const diasCalendario = [];

  for (let i = 0; i < primerDiaAjustado; i++) {
    diasCalendario.push(null);
  }

  for (let i = 1; i <= ultimoDia; i++) {
    diasCalendario.push(new Date(año, mes, i));
  }

  const formatearFecha = (dia) =>
    dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

  return (
    <div className="calendar__container">

      <div>

        <h2>
          {fechaActual.toLocaleDateString("es-AR", {
            month: "long",
            year: "numeric"
          })}
        </h2>

        <div className="semana">
          {["l", "m", "m", "j", "v", "s", "d"].map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

      <div className="calendario">
  {diasCalendario.map((dia, index) => {
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const esSeleccionado =
      dia &&
      diaSeleccionado &&
      dia.toDateString() === diaSeleccionado.toDateString();

    const esDomingo = dia && dia.getDay() === 0;

    const esPasado = dia && dia < hoy;

    const deshabilitado = esDomingo || esPasado;

    return (
      <div
        key={index}
        className="dia"
        onClick={() => dia && !deshabilitado && setDiaSeleccionado(dia)}
        style={{
          background: esSeleccionado ? "#00bcd4" : "transparent",
          cursor: dia && !deshabilitado ? "pointer" : "not-allowed",
          opacity: dia ? (deshabilitado ? 0.3 : 1) : 0.3
        }}
      >
        {dia ? (
          <>
            {dia.getDate()}
          </>
        ) : ""}
      </div>
    );
  })}
</div>
</div>
      <div>
        <h3>{formatearFecha(diaSeleccionado)}</h3>

        <div className="horarios">
          {horarios.map((hora) => {

            const idTurno = `${formatearFecha(diaSeleccionado)}-${hora}`;

            const estaReservado = turnosReservados.some(
              turno => turno.id === idTurno
            );

            const estaBloqueado = turnosBloqueados.includes(idTurno);

            const esDomingo = diaSeleccionado.getDay() === 0;

            const turnoEncontrado = turnosReservados.find(
              turno => turno.id === idTurno
            );

            const deshabilitado = esDomingo || estaReservado || estaBloqueado;

            return (
              <div key={hora}>

                <button
                  disabled={deshabilitado}
                  onClick={() => onClickTurno(hora, diaSeleccionado)}
                  className="calendar__time-button"
                >
                  {hora}
                  {esDomingo
                    ? "Cerrado"
                    : estaBloqueado
                    ? "Bloqueado"
                    : estaReservado
                    ? "Reservado"
                    : modo === "peluquero"
                    ? "- Bloquear"
                    : ""}
                </button>

                {estaReservado && modo === "peluquero" && turnoEncontrado && (
                  <div>
                    <div>{turnoEncontrado.nombre}</div>
                    <div>{turnoEncontrado.telefono}</div>
                  </div>
                )}

                {!esDomingo && (estaReservado || estaBloqueado) && modo === "peluquero" && (
                  <button onClick={() => desbloquearTurno(hora, diaSeleccionado)}>
                    Desbloquear
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenerarTabla;