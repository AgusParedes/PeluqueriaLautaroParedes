import GenerarTabla from "./GenerarTabla";
function VistaCliente({
    turnosReservados,
    turnosBloqueados,
    reservarTurno
}
    
) {
    return (
        <div>
            <h1>Bienvenido a la Peluquería</h1>
            <div>
                <GenerarTabla
                    modo="cliente"
                    turnosReservados={turnosReservados}
                    turnosBloqueados={turnosBloqueados}
                    onClickTurno={reservarTurno}
                />
            </div>
        </div>
    )
}

export default VistaCliente;   