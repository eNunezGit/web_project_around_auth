import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { CardsContext } from '../../contexts/CardsContext.js';

import pencilIcon from '../../images/pencil.svg';
import editButton from '../../images/edit-button.svg';
import addButton from '../../images/add-button.svg';
import Popup from '../Popup/Popup.jsx';
import NewCard from './popup-forms/NewCard.jsx';
import EditProfile from './popup-forms/EditProfile.jsx';
import EditAvatar from './popup-forms/EditAvatar.jsx';
import Card from './Card.jsx';

function Main(props) {
  const {currentUser} = useContext(CurrentUserContext);
  const {cards, handleCardLike, handleCardDelete} = useContext(CardsContext);

  const handleOpenPopup = props.onOpenPopup;
  const handleClosePopup = props.onClosePopup;
  const popup = props.popup;

  const newCardPopup = {
    title: 'New Card',
    children: <NewCard />
  }

  const editProfilePopup = {
    title: 'Edit Profile',
    children: <EditProfile />
  }

  const editAvatarPopup = {
    title: 'Edit Avatar',
    children: <EditAvatar />
  }

  return (
    <>
      <div className="profile page__section">
        <div className="profile__avatar-container">
          <button
            id="editAvatarButton"
            aria-label="Edit avatar"
            className="profile__edit-avatar-button"
            type="button"
            onClick={() => handleOpenPopup(editAvatarPopup)}
            >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Foto de perfil" />
            <img
              className="profile__edit-icon"
              src={pencilIcon}
              alt="Icono de editar avatar" />
          </button>
        </div>
        <div className="profile__settings">
          <div className="profile__settings-wrapper">
            <p className="profile__name">{currentUser.name}</p>
            <button
              id="editSettingsButton"
              aria-label="Edit settings"
              className="profile__edit-settings-button"
              type="button"
              onClick={() => handleOpenPopup(editProfilePopup)}
              >
              <img
                className="profile__edit-settings-button-img"
                src={editButton}
                alt="Botón de editar" />
            </button>
          </div>
          <p className="profile__info">{currentUser.about}</p>
        </div>
        <button
          id="addCardButton"
          aria-label="Add new card"
          className="profile__add-card-button"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
          >
          <img
            className="profile__add-card-button-img"
            src={addButton}
            alt="Botón de añadir" />
        </button>
      </div>
      <div className="elements page__section">
        {cards ? (
          <ul className="elements__grid">
            {cards.map((card) => (
              <Card key={card._id} card={card} onImageClick={handleOpenPopup} onCardLike={() => {handleCardLike(card)}} onCardDelete={() => {handleCardDelete(card)}} />
            ))}
          </ul>
        ) : (
          <p>No Cards to show yet</p>
        )}
      </div>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title} variant={popup.variant}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}

export default Main;
