import { useRef, useContext } from 'react';
import { CurrentUserContext } from '../../../../contexts/CurrentUserContext.js';
import Form from '../../../Form/Form.jsx';
import FormField from '../../../Form/FormField.jsx';
import { useFormValidation } from '../../../../utils/useFormValidation.js';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  const avatarRef = useRef(null);

  const { errors, isValid, handleValidation } = useFormValidation();

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateAvatar({ avatar: avatarRef.current.value });
  };

  return (
    <Form
      formClassName="popup__form"
      fieldsetClassName="popup__form-fieldset"
      submitClassName="popup__submit-button"
      submitTextClassName="popup__submit-button-text"
      name="avatar-form"
      id="edit-avatar-form"
      onSubmit={handleSubmit}
      submitText="Save"
      submitDisabled={!isValid}
    >
      <FormField
        fieldClassName="popup__form-field"
        inputClassName="popup__form-input"
        errorClassName="popup__error-info"
        inputRef={avatarRef}
        id="avatar-url"
        name="avatar-url"
        placeholder="Image link"
        required
        type="url"
        onChange={handleValidation}
        errorText={errors["avatar-url"]}
      />
    </Form>
  );
}
