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
    console.log('ondelemodal')
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

            <p className="modal__caption">Cancel</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnDeleteModal;