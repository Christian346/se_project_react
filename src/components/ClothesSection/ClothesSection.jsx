import React, {useContext} from "react";
import "./ClothesSection.css"
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import CurrentUserContext from "../../utils/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleHeartClick,
}) {
  //currentuser context to  access id from the user and compare to the "owner" of the item
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <div className="clothes-section">
      <div className="clothes-section__upper">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          Add New +
        </button>
      </div>

      <ul className="clothes-section__items">
        {
          //defaultClothingItems
          clothingItems //   return item.weather === propWeatherData.type;// })
            .filter((item) => {
              return item.owner === currentUser._id;
            })
            .map((singleCard) => {
              return (
                <ItemCard
                  key={singleCard._id}
                  singleCard={singleCard}
                  // pass as prop to this component
                  onCardClick={onCardClick}
                  handleHeartClick={handleHeartClick}
                />
              );
            })
        }
      </ul>
    </div>
  );
}
export default ClothesSection;