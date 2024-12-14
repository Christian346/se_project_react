import React from "react";
import "../ItemModal/ItemModal.css";
import "./OnDeleteModal.css"

function OnDeleteModal({
  handleClickDeleteModal,
  activeModal,
  handleCloseActiveModal,
  onDeleteItem,
  card
}) {

  const handleDelete = (e) => {
    console.log(card._id)
    onDeleteItem(card._id);
  };



  return (
    <>
      <div
        className={`modal ${activeModal === "OnDeleteModal" && "modal_opened"}`}
      >
        <div className="modal__content modal__content_type_delete">
          <button
            onClick={handleCloseActiveModal}
            className="modal__close"
            type="button"
          ></button>

          <div className="modal__delete_container">
            <p className="modal__text">
              Are you sure you want to delete this item?
              <br /> This action is irreversible.
            </p>

            <button
              className="modal__OnDeleteModal_btn"
              /*onClick={handleClickDeleteModal}*/
              type="submit"
              onClick={handleDelete}
            >
              Yes, delete item
            </button>

            <button className="modal__cancel"
            onClick={handleCloseActiveModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnDeleteModal;