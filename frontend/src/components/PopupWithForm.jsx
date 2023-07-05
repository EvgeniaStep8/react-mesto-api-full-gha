import React from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import handleOverlayClick from "../utils/utils";

const PopupWithForm = ({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  isValid,
  children
}) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id={`popup-${name}`}
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__container"> 
        <h2 className="popup__title">{title}</h2> 
        <form className="form" name={`form${name}`} onSubmit={onSubmit} noValidate>
          {children} 
          <button className="form__submit-button" type="submit" disabled={!isValid} >
            {isPending ? (buttonText ?  buttonText + '...' : 'Сохранить...') : (buttonText || 'Сохранить')} 
          </button> 
        </form> 
        <button 
          className="popup__close" 
          type="button" 
          onClick={onClose} 
        ></button> 
      </div> 
    </div> 

  );
};
export default PopupWithForm;
