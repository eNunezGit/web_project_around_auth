import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import Form from '../../../Form/Form.jsx';
import FormField from '../../../Form/FormField.jsx';

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

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
    <Form
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
      submitText="Save"
    >
      <FormField
        id="user-name"
        name="user-name"
        maxLength="40"
        minLength="2"
        placeholder={currentUser.name}
        required
        type="text"
        value={name}
        onChange={handleNameChange}
        errorText="Lore ipsum"
      />
      <FormField
        id="user-info"
        name="user-info"
        maxLength="200"
        minLength="2"
        placeholder={currentUser.about}
        required
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        errorText="Lore ipsum"
      />
    </Form>
  );
}
