import "./ItemCard.css";


function ItemCard({ singleCard, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(singleCard);
  };

  return (
    <li className="card" /*key={singleCard._id}*/>
      <h2 className="card__name">{singleCard.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={singleCard.imageUrl}
        alt={singleCard.name}
      />
    </li>
  );
}
export default ItemCard;
