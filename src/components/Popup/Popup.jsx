import { useEffect } from 'react';
import closeButton from '../../images/close-icon.svg'

// form/tooltip comparten fondo blanco (popup__container); image no.
// wrapContent controla si se envuelve en popup__content (padding + layout
// interno consistente); solo form muestra título.
const VARIANTS = {
  form: { containerClass: 'popup__container', wrapContent: true },
  tooltip: { containerClass: 'popup__container', wrapContent: true },
  image: { containerClass: 'popup__img-container', wrapContent: false },
};

export default function Popup({ onClose, title, variant = 'form', children }) {
  const { containerClass, wrapContent } = VARIANTS[variant];

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Solo cierra si el clic fue en el overlay mismo, no en el contenido.
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className={containerClass}>
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
          >
          <img
          className="popup__close-button-img"
          src={closeButton}
          alt="Close"/>
        </button>
        {wrapContent ? (
          <div className="popup__content">
            {title && <p className="popup__title">{title}</p>}
            {children}
          </div>
        )
        : (
          children
        )}
      </div>
    </div>
  );
}
