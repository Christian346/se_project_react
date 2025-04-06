import React from "react";
import "./Profile.css"
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onLogout,
  handleEditBtnClick,
  handleHeartClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogout={onLogout}
          handleEditBtnClick={handleEditBtnClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleHeartClick={handleHeartClick}
        />
      </section>
    </div>
  );
}

export default Profile