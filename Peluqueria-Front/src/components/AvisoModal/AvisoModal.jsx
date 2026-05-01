import React from "react";
import "./AvisoModal.scss";
function AvisoModal({ onClose }) {

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__contenido">
        <h2>Atención</h2>
        <p>
          Para cancelar o modificar turnos, comunicate al <br />
          <strong>+54 9 3404 408 785</strong>
        </p>

        <button onClick={onClose}>De acuerdo</button>
      </div>
    </div>
  );
}


export default AvisoModal;