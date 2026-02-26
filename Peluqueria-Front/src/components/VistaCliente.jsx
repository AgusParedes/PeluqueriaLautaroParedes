import GenerarTabla from "./GenerarTabla";
import { useState } from "react";
import  Formulario  from "./Formulario";

function VistaCliente({
    turnosReservados,
    turnosBloqueados,
    reservarTurno
})
{
    const [ TurnoSeleccionado, setTurnoSeleccionado ] = useState(null);

    const manejarSeleccion = (hora, dia) => {
    setTurnoSeleccionado({ hora, dia });
  };



 {
    return (
        <div>
            <h1>Bienvenido a la Peluquería</h1>
            <div>
                <GenerarTabla
                    modo="cliente"
                    turnosReservados={turnosReservados}
                    turnosBloqueados={turnosBloqueados}
                    onClickTurno={manejarSeleccion}
                />
            </div>
            {TurnoSeleccionado && (
                <Formulario
                    turno={TurnoSeleccionado}
                    confirmar={reservarTurno}
                    cancelar={() => setTurnoSeleccionado(null)}
                />
            )}
        </div>
    )
}
}
export default VistaCliente;   