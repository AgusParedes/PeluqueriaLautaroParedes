import { useState } from "react";
import VistaCliente from "./components/VistaCliente.jsx";
import { useEffect } from "react";
import VistaPeluquero from "./components/VistaPeluquero.jsx";

function App() {

  useEffect(() => {
    fetch("http://localhost:3001/turnos")
    .then(res => res.json())
    .then(data => setTurnosReservados(data));

  fetch("http://localhost:3001/bloqueados")
    .then(res => res.json())
    .then(data => setTurnosBloqueados(data.map(t => t.id)));
}, []);

  const [turnosReservados, setTurnosReservados] = useState([]);
  const [turnosBloqueados, setTurnosBloqueados] = useState([]);


  const reservarTurno = async (dia, hora, nombre, telefono) => {
  
    const idTurno = `${dia}-${hora}`;

    const nuevoTurno =  {
      id : idTurno,
      hora,
      dia,
      nombre, 
      telefono
    };

    await fetch("http://localhost:3001/turnos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoTurno)
  });

    setTurnosReservados(prev => [...prev, nuevoTurno]);
  };


  const bloquearTurno = async (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    await fetch("http://localhost:3001/bloquear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idTurno })
    });

    setTurnosBloqueados(prev =>
      prev.includes(idTurno) ? prev : [...prev, idTurno]
    );

    console.log(`Turno bloqueado: ${idTurno}`);
  };

  const desbloquearTurno = async (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    await fetch("http://localhost:3001/desbloquear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idTurno })
    });


    console.log(`Intentando desbloquear turno: ${idTurno}`);

    setTurnosBloqueados(prev =>
      prev.filter(turno => turno !== idTurno)
    );

    setTurnosReservados(prev =>
      prev.filter(turno => turno.id !== idTurno)
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