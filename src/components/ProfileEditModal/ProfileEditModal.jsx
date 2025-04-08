import React, {useState, useContext} from 'react';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from '../../utils/CurrentUserContext';

function ProfileEditModal ({handleCloseActiveModal,isOpen,onEdit}){
  //props are always going to be one object with nothing else.

  const { currentUser } = useContext(CurrentUserContext);
  //user currentcontext.name and avatar instead of "" empty strings below!

  const [data, setData] = useState({
    name: currentUser.name/*""*/,
    avatar:currentUser.avatar /*""*/,
  });
  // can you please elaborate on how I would use the useEffect hook here instead please!!

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(data /*{ name, imageUrl }*/);
  };

  return (
    <ModalWithForm
      titleText="Change profile data"
      buttonText="Save changes"
      // activeModal={activeModal}
      // isOpen={activeModal === "add-garment"}
      handleCloseActiveModal={handleCloseActiveModal}
      isOpen={isOpen}
      onSubmit={/*(e) => onAddItem(e, { name })*/ handleSubmit} // to populate data on the onAddItem in App.js
    >
      <label htmlFor="name" className="modal__label">
        Name *{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={data.name} // {name}
          onChange={handleChange} //{handleNameChange}
        />
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL *{" "}
        <input
          name="avatar"
          type="url"
          required
          className="modal__input"
          id="avatar"
          placeholder="Avatar Url"
          value={data.avatar} //{avatarUrl}
          onChange={handleChange} //{handleImageUrlChange}
        />
      </label>
    </ModalWithForm>
  );
}
export default ProfileEditModal;