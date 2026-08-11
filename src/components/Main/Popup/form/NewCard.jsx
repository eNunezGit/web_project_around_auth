import { useState, useContext } from 'react'; 
import { CardsContext } from '../../../../contexts/CardsContext.js';

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
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="popup__fieldset">
        <label className="popup__field">
          <input
            className="popup__form-input"
            id="card-title"
            maxLength="40"
            minLength="2"
            name="card-title"
            placeholder="Title"
            required
            type="text"
            value={cardTitle}
            onChange={handleTitleChange}
            />
          <span className="popup__error-info" id="card-title-error">Lore ipsum</span>
        </label>
        <label className="popup__field">
          <input
            className="popup__form-input"
            id="card-url"
            name="card-url"
            placeholder="Image link"
            required
            type="url"
            value={cardUrl}
            onChange={handleUrlChange}
            />
          <span className="popup__error-info" id="card-url-error">Lore ipsum</span>
        </label>
      </div>
      <button className="popup__submit-button" type="submit">
        <span className="popup__submit-button-text">Create</span>
      </button>
    </form>
  );
}
