import { useRef, useContext } from 'react'; 
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    handleUpdateAvatar({avatar: avatarRef.current.value});
  };

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__fieldset">
        <label className="popup__field">
          <input
            ref={avatarRef}
            className="popup__form-input"
            id="avatar-url"
            name="avatar-url"
            placeholder="Image link"
            required
            type="url"
          />
          <span className="popup__error-info" id="avatar-url-error">Lore ipsum</span>
        </label>
      </div>
      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Save</span>
      </button>
    </form>
  );
}
