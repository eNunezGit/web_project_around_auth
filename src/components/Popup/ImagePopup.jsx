export default function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <>
      <img className="popup__img" src={link} alt={name} />
      <p className="popup__img-title">{name}</p>
    </>
  );
}