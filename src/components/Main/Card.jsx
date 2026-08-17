import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import deleteButton from '../../images/delete-button.svg';
import likeButton from '../../images/like-button.svg';
import likeButtonFull from '../../images/like-button_full.svg';
import ImagePopup from '../Popup/ImagePopup.jsx';

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const cardData  = props.card;
  const onImageClick = props.onImageClick;
  const onCardLike = props.onCardLike;
  const onCardDelete = props.onCardDelete

  // La API puede exponer owner como id suelto o como objeto anidado.
  const cardOwnerId = typeof cardData.owner === 'string'
    ? cardData.owner
    : cardData.owner?._id;

  // Solo ocultamos el botón cuando sabemos con certeza que la tarjeta es de
  // otra persona; si la API no expone el propietario, se muestra igual.
  const isOwn = !cardOwnerId || !currentUser._id || cardOwnerId === currentUser._id;

  const imageComponent = {
    variant: 'image',
    children: <ImagePopup card={props.card} />
  }

  return (
    <li className="elements__card">
      <img className="elements__img" src={cardData.link} alt={cardData.name} onClick={() =>onImageClick(imageComponent)} />
      {isOwn && (
        <button
          onClick={() => {onCardDelete(cardData)}}
          aria-label="Delete card"
          className="elements__delete-button"
          type="button"
          >
          <img className="elements__delete-button-img" src={deleteButton} alt="Delete card" />
        </button>
      )}
      <div className="elements__legend">
        <h2 className="elements__title">{cardData.name}</h2>
        <button
          onClick={() => {onCardLike(cardData)}}
          aria-label="Like card"
          type="button"
          className="elements__like-button"
          >
          <img className="elements__like-button-img" src={cardData.isLiked ? likeButtonFull : likeButton} alt="Like card" />
        </button>
      </div>
    </li>
  );
}
