import GenerarTabla from "../GenerarTabla/GenerarTabla";
import { useState } from "react";
import  Formulario  from "../Formulario/Formulario";
import "../../utils/flex.scss";

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
            <div className="flex-center" style={{ margin: "20px 0" }}>
                <img style={{ width: "230px", overflow: "hidden" }} src="/Foto_Logo.png" alt="Logo" />
            </div>
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
            <div className="calendar__info">
                <p>
                    ¿Necesitás cancelar o cambiar tu turno? <br />
                    <a
                    href="https://wa.me/549123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Contactanos por WhatsApp
                    </a>
                </p>
            </div>
        </div>
        
    )
}
}
export default VistaCliente;   