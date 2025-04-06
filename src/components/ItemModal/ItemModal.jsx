import "./ItemModal.css";
import closeicon from "../../assets/close-icon.svg";
import CurrentUserContext from "../../utils/CurrentUserContext";
import {useContext} from "react";

function ItemModal({activeModal , card:selectedCard ,handleCloseActiveModal , handleClickDeleteModal}){
  
  const {currentUser}= useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "" : "modal__delete-btn_hidden"
  }`;


  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseActiveModal}
          className="modal__close"
          type="button"
        ></button>
        <img src={selectedCard.imageUrl} alt={selectedCard.name} className="modal__image" />
        <div className="modal__lower_container">
          <div className="modal__footer">
            <h2 className="modal__caption">{selectedCard.name}</h2>
            <p className="modal__weather">Weather: {selectedCard.weather}</p>
          </div>
          <button
            className={itemDeleteButtonClassName}
            onClick={handleClickDeleteModal}
          >
            Delete Item
          </button>
          {/* */}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;