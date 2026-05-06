import { useState, useEffect } from "react";
import './App.css'
import VistaCliente from "./components/VistaCliente/VistaCliente.jsx";
import VistaPeluquero from "./components/VistaPeluquero/VistaPeluquero.jsx";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AvisoModal from "./components/AvisoModal/AvisoModal.jsx";
import toast, { Toaster } from "react-hot-toast";

function App() {

  const [turnosReservados, setTurnosReservados] = useState([]);
  const [turnosBloqueados, setTurnosBloqueados] = useState([]);
  const [mostrarAviso, setMostrarAviso] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/turnos")
      .then(res => res.json())
      .then(data => setTurnosReservados(data));

    fetch("http://localhost:3001/bloqueados")
      .then(res => res.json())
      .then(data => setTurnosBloqueados(data.map(t => t.id)));
  }, []);

  // =========================
  // RESERVAR
  // =========================
  const reservarTurno = async (dia, hora, nombre, telefono) => {
    const idTurno = `${dia}-${hora}`;

    const nuevoTurno = {
      id: idTurno,
      hora,
      dia,
      nombre,
      telefono
    };

    const promesa = fetch("http://localhost:3001/turnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoTurno)
    }).then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    });

    toast.promise(promesa, {
      loading: "Reservando turno...",
      success: "Turno reservado correctamente 💈",
      error: "Error al reservar el turno ❌",
    });

    try {
      await promesa;
      setTurnosReservados(prev => [...prev, nuevoTurno]);
    } catch {}
  };

  // =========================
  // BLOQUEAR
  // =========================
  const bloquearTurno = async (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    const promesa = fetch("http://localhost:3001/bloquear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idTurno })
    }).then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    });

    toast.promise(promesa, {
      loading: "Bloqueando turno...",
      success: "Turno bloqueado 🔒",
      error: "No se pudo bloquear ❌",
    });

    try {
      await promesa;

      setTurnosBloqueados(prev =>
        prev.includes(idTurno) ? prev : [...prev, idTurno]
      );

    } catch {}
  };

  // =========================
  // DESBLOQUEAR
  // =========================
  const desbloquearTurno = async (hora, dia) => {
    const fechaFormateada = dia.toLocaleDateString("es-AR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });

    const idTurno = `${fechaFormateada}-${hora}`;

    const promesa = fetch("http://localhost:3001/desbloquear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idTurno })
    }).then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    });

    toast.promise(promesa, {
      loading: "Desbloqueando...",
      success: "Turno disponible nuevamente ✅",
      error: "Error al desbloquear ❌",
    });

    try {
      await promesa;

      setTurnosBloqueados(prev =>
        prev.filter(turno => turno !== idTurno)
      );

      setTurnosReservados(prev =>
        prev.filter(turno => turno.id !== idTurno)
      );

    } catch {}
  };

  return (
    <BrowserRouter>

      {/* 🔥 TOASTER GLOBAL */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#1f1f1f",
            color: "#fff",
            padding: "16px",
            fontSize: "14px"
          },
          success: {
            icon: "🟢",
          },
          error: {
            icon: "🔴",
          },
        }}
      />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route
          path='/BookingPage'
          element={
            <>
              {mostrarAviso && (
                <AvisoModal onClose={() => setMostrarAviso(false)} />
              )}

              <VistaCliente
                turnosReservados={turnosReservados}
                turnosBloqueados={turnosBloqueados}
                reservarTurno={reservarTurno}
              />
            </>
          }
        />

        <Route
          path='/SobreNosotros'
          element={
            <VistaPeluquero
              turnosReservados={turnosReservados}
              turnosBloqueados={turnosBloqueados}
              bloquearTurno={bloquearTurno}
              desbloquearTurno={desbloquearTurno}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;