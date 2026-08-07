import closeButton from '../../../images/close-icon.svg'

export default function Popup(props) {
  const {onClose, title, children} = props;
  return (
    <div className="popup">
      <div className={title ? "popup__container" : "popup__img-container"}>
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
        {title ? (
          <div className="popup__content">
            <h3 className="popup__title">{title}</h3>
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