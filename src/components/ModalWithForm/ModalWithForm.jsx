import "./ModalWithForm.css"
import closeicon from "../../assets/close-icon.svg"

function ModalWithForm({children , buttonText, titleText, activeModal, handleCloseActiveModal,isOpen}) {
  return (
    <div className={`modal ${/*activeModal === "add-garment"*/ isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{titleText}</h2>
        <button onClick={handleCloseActiveModal} className="modal__close" type="button">
        
        </button>

        <form className="modal__form">
         {children}
          <button className="modal__submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
