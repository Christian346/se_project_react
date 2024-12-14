import React from "react";
import "./ClothesSection.css"
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";


function ClothesSection ({onCardClick ,clothingItems ,handleAddClick}){
 return (
   <div className="clothes-section">
     <div className="clothes-section__upper">
       <p className="clothes-section__text">Your Items</p>
       <button className="clothes-section__btn" onClick={handleAddClick}>Add New +</button>
     </div>

     <ul className="clothes-section__items">
       {//defaultClothingItems
       clothingItems
         // .filter((item) => {//   return item.weather === propWeatherData.type;// })
         .map((singleCard) => {
           return (
             <ItemCard
             
               singleCard={singleCard}
               // pass as prop to this component
               onCardClick={onCardClick}
             />
           );
         })}
     </ul>
   </div>
 );
}
export default ClothesSection;