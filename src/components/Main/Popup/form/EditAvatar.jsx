import { useRef, useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import Form from '../../../Form/Form.jsx';
import FormField from '../../../Form/FormField.jsx';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <Form
      name="avatar-form"
      id="edit-avatar-form"
      onSubmit={handleSubmit}
      submitText="Save"
    >
      <FormField
        inputRef={avatarRef}
        id="avatar-url"
        name="avatar-url"
        placeholder="Image link"
        required
        type="url"
        errorText="Lore ipsum"
      />
    </Form>
  );
}
