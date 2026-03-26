import { useState } from "react";
import './App.css'
import VistaCliente from "./components/VistaCliente/VistaCliente.jsx";
import VistaPeluquero from "./components/VistaPeluquero/VistaPeluquero.jsx";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
       <BrowserRouter>
           <Routes>

              <Route path='/' element={<Home />} />

              <Route path='/BookingPage' element={<VistaCliente
                  turnosReservados={turnosReservados}
                  turnosBloqueados={turnosBloqueados}
                  reservarTurno={reservarTurno}
                />} />

              <Route path='/SobreNosotros' element={<VistaPeluquero
                  turnosReservados={turnosReservados}
                  turnosBloqueados={turnosBloqueados}
                  bloquearTurno={bloquearTurno}
                  desbloquearTurno={desbloquearTurno}
                />} />

           </Routes>
       </BrowserRouter>
  );
}

export default App;