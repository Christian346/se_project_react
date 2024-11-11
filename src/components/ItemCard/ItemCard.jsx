import "./ItemCard.css"

function ItemCard({ propItem ,onCardClick }){
   const handleCardClick = () =>{
    onCardClick(propItem)
   }

    return(
      <li className="card">
        <h2 className="card__name">{propItem.name}</h2>
        <img onClick={handleCardClick}
        className="card__image"
         src={propItem.link}
          alt={propItem.name} />
      </li>
    );
}
export default ItemCard;