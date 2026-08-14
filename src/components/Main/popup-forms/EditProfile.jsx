import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';
import Form from '../../Form/Form.jsx';
import FormField from '../../Form/FormField.jsx';
import { useFormValidation } from '../../../hooks/useFormValidation.js';

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { errors, isValid, handleValidation } = useFormValidation();

  const handleNameChange = (event) => {
    setName(event.target.value);
    handleValidation(event);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    handleValidation(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
  };

  return (
    <Form
      formClassName="popup__form"
      fieldsetClassName="popup__form-fieldset"
      submitClassName="popup__submit-button"
      submitTextClassName="popup__submit-button-text"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      submitText="Save"
      submitDisabled={!isValid}
    >
      <FormField
        fieldClassName="popup__form-field"
        inputClassName="popup__form-input"
        errorClassName="popup__error-info"
        id="user-name"
        name="user-name"
        maxLength="40"
        minLength="2"
        placeholder={currentUser.name}
        required
        type="text"
        value={name}
        onChange={handleNameChange}
        errorText={errors["user-name"]}
      />
      <FormField
        fieldClassName="popup__form-field"
        inputClassName="popup__form-input"
        errorClassName="popup__error-info"
        id="user-info"
        name="user-info"
        maxLength="200"
        minLength="2"
        placeholder={currentUser.about}
        required
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        errorText={errors["user-info"]}
      />
    </Form>
  );
}
