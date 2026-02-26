import { useState } from "react";
import VistaCliente from "./components/VistaCliente.jsx";
import VistaPeluquero from "./components/VistaPeluquero.jsx";

function App() {

  const [turnosReservados, setTurnosReservados] = useState([]);
  const [turnosBloqueados, setTurnosBloqueados] = useState([]);


  const reservarTurno = (dia, hora, nombre, telefono) => {
  
    const idTurno = `${dia}-${hora}`;

    const nuevoTurno =  {
      id : idTurno,
      hora,
      dia,
      nombre, 
      telefono
    }

    setTurnosReservados(prev => [...prev, nuevoTurno]);
  };


  const bloquearTurno = (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    setTurnosBloqueados(prev =>
      prev.includes(idTurno) ? prev : [...prev, idTurno]
    );

    console.log(`Turno bloqueado: ${idTurno}`);
  };

  const desbloquearTurno = (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    setTurnosBloqueados(prev =>
      prev.filter(turno => turno !== idTurno)
    );

    setTurnosReservados(prev =>
      prev.filter(turno => turno !== idTurno)
    );

    console.log(`Turno desbloqueado: ${idTurno}`);
  }

  return (
    <div>
      <h1>Turnos Peluquería</h1>

      <VistaCliente
        turnosReservados={turnosReservados}
        turnosBloqueados={turnosBloqueados}
        reservarTurno={reservarTurno}
      />

      <VistaPeluquero
        turnosReservados={turnosReservados}
        turnosBloqueados={turnosBloqueados}
        bloquearTurno={bloquearTurno}
        desbloquearTurno={desbloquearTurno} 
      />
    </div>
  );
}

export default App;