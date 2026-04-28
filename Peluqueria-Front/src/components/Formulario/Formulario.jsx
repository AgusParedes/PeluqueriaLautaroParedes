import React from 'react'
import { useState } from 'react';
import './Formulario.scss';

const Formulario = ({turno, confirmar, cancelar}) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const DiaFormatiado = turno.dia.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long"
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        confirmar(DiaFormatiado, turno.hora, nombre, telefono);

        setNombre('');
        setTelefono('');

        cancelar();
        console.log(`Formulario enviado: ${DiaFormatiado} a las ${turno.hora} por ${nombre} (${telefono})`);
    }

return (
  <div className="formulario-overlay">
    <form className="formulario-container" onSubmit={handleSubmit}>
      
      <h2>Confirmar turno</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <div className="botones">
        <button className="btn-confirmar" type="submit">
          Confirmar
        </button>
        <button className="btn-cancelar" type="button" onClick={cancelar}>
          Cancelar
        </button>
      </div>

    </form>
  </div>
);
}
export default Formulario
