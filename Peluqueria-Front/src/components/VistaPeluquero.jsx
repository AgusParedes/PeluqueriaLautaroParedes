import GenerarTabla from "./GenerarTabla";
function VistaPeluquero({
    turnosReservados,
    turnosBloqueados,
    bloquearTurno,
    desbloquearTurno
}

) {
    return (
        <div>
            <h2>Vista Peluquero</h2>
            <p>Aquí el peluquero puede ver los turnos reservados.</p>
                <GenerarTabla
                    modo="peluquero"
                    turnosReservados={turnosReservados}
                    turnosBloqueados={turnosBloqueados}
                    onClickTurno={bloquearTurno}
                    desbloquearTurno={desbloquearTurno}
                />
        </div>
    );
}
export default VistaPeluquero;