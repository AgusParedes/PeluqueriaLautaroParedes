import React from 'react'
import { useState } from 'react';

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
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Confirmar Turno</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    </div>
  )
}

export default Formulario
