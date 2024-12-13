import "./ItemModal.css";
import closeicon from "../../assets/close-icon.svg";

function ItemModal({activeModal , card ,handleCloseActiveModal , handleClickDeleteModal}){
    return (
      <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
          <button
            onClick={handleCloseActiveModal}
            className="modal__close"
            type="button"
          ></button>
          <img src={card.imageUrl} alt={card.name} className="modal__image" />
          <div className="modal__lower_container">
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button className="modal__delete_btn" onClick={handleClickDeleteModal} >Delete Item</button>
          </div>
        </div>
      </div>
    );
}
export default ItemModal;