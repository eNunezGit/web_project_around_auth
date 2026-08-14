import checkIcon from '../../images/tooltip-check.svg';
import crossIcon from '../../images/tooltip-cross.svg';

// Popup de contenido: se usa como children de <Popup>, igual que ImagePopup.
// isSuccess decide el ícono; message es el texto que muestra el llamador
// (Login/Register conocen el copy correcto para cada caso, Tooltip no lo inventa).
export default function Tooltip({ isSuccess, message }) {
  return (
    <div className="tooltip">
      <img
        className="tooltip__icon"
        src={isSuccess ? checkIcon : crossIcon}
        alt={isSuccess ? 'Autenticación exitosa' : 'Error de autenticación'}
      />
      <p className="tooltip__message">{message}</p>
    </div>
  );
}
