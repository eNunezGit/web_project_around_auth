import { useState, useContext } from 'react';
import { CardsContext } from '../../../contexts/CardsContext.js';
import Form from '../../Form/Form.jsx';
import FormField from '../../Form/FormField.jsx';
import { useFormValidation } from '../../../hooks/useFormValidation.js';

export default function NewCard() {
  const { handleAddCard } = useContext(CardsContext);

  const [cardTitle, setCardTitle] = useState("");
  const [cardUrl, setCardUrl] = useState("");

  const { errors, isValid, handleValidation } = useFormValidation();

  const handleTitleChange = (event) => {
    setCardTitle(event.target.value);
    handleValidation(event);
  }

  const handleUrlChange = (event) => {
    setCardUrl(event.target.value);
    handleValidation(event);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddCard({ name: cardTitle, link: cardUrl });
  };

  return (
    <Form
      formClassName="popup__form"
      fieldsetClassName="popup__form-fieldset"
      submitClassName="popup__submit-button"
      submitTextClassName="popup__submit-button-text"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
      submitText="Create"
      submitDisabled={!isValid}
    >
      <FormField
        fieldClassName="popup__form-field"
        inputClassName="popup__form-input"
        errorClassName="popup__error-info"
        id="card-title"
        name="card-title"
        maxLength="40"
        minLength="2"
        placeholder="Title"
        required
        type="text"
        value={cardTitle}
        onChange={handleTitleChange}
        errorText={errors["card-title"]}
        />
      <FormField
        fieldClassName="popup__form-field"
        inputClassName="popup__form-input"
        errorClassName="popup__error-info"
        id="card-url"
        name="card-url"
        placeholder="Image link"
        required
        type="url"
        value={cardUrl}
        onChange={handleUrlChange}
        errorText={errors["card-url"]}
      />
    </Form>
  );
}
