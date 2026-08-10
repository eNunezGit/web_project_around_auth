import { useState, useContext } from 'react'; 
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext';

export default function EditProfile() {
  const { currentUser, handleUpdateUser} = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__fieldset">
        <label className="popup__field">
          <input
            className="popup__form-input"
            id="user-name"
            maxLength="40"
            minLength="2"
            name="user-name"
            placeholder={currentUser.name}
            required
            type="text"
            value={name}
            onChange={handleNameChange}
            />
          <span className="popup__error-info" id="user-name-error">Lore ipsum</span>
        </label>
        <label className="popup__field">
          <input
            className="popup__form-input"
            id="user-info"
            maxLength="200"
            minLength="2"
            name="user-info"
            placeholder={currentUser.about}
            required
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error-info" id="user-info-error">Lore ipsum</span>
        </label>
      </div>
      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Save</span>
      </button>
    </form>
  );
}
