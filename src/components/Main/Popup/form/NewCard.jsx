import { useState, useContext } from 'react';
import { CardsContext } from '../../../../contexts/CardsContext.js';
import Form from '../../../Form/Form.jsx';
import FormField from '../../../Form/FormField.jsx';

export default function NewCard() {
  const { handleAddCard } = useContext(CardsContext);

  const [cardTitle, setCardTitle] = useState("");
  const [cardUrl, setCardUrl] = useState("");

  const handleTitleChange = (event) => {
    setCardTitle(event.target.value);
  }

  const handleUrlChange = (event) => {
    setCardUrl(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAddCard({ name: cardTitle, link: cardUrl });
  };

  return (
    <Form
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
      submitText="Create"
    >
      <FormField
        id="card-title"
        name="card-title"
        maxLength="40"
        minLength="2"
        placeholder="Title"
        required
        type="text"
        value={cardTitle}
        onChange={handleTitleChange}
        errorText="Lore ipsum"
      />
      <FormField
        id="card-url"
        name="card-url"
        placeholder="Image link"
        required
        type="url"
        value={cardUrl}
        onChange={handleUrlChange}
        errorText="Lore ipsum"
      />
    </Form>
  );
}
