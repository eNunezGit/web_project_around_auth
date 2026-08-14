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

  return (
    <div className="popup">
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
