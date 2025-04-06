import React, { useContext } from "react";
import CurrentUserContext from "../../utils/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ singleCard, onCardClick, handleHeartClick }) {
  const { currentUser = {}, isLoggedIn } = useContext(CurrentUserContext);
  //console.log(singleCard)

  let isLiked = false;

  singleCard.likes.forEach((id) => {
    if (currentUser._id === id) {
      isLiked = true;
    }
  });
  //check out the some method.
  const handleLikeButtonClick = () => {
    handleHeartClick({id: singleCard._id ,isLiked});
  };

  const handleCardClick = () => {
    onCardClick(singleCard);
  };

  return (
    <li className="card" /*key={singleCard._id}*/>
      <div className="card__upper-segment">
        <h2 className="card__name">{singleCard.name}</h2>
        {/*  ternanry operator to show the heart class by using isLiked */}
        <button
          className={isLiked ? "card__heart card__heart_active" : "card__heart"}
          type="button"
          aria-label="button to like"
          onClick={handleLikeButtonClick}
        ></button>
      </div>
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
