import React, { memo } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import handleOverlayClick from "../utils/utils";

const ConfirmPopup = memo(({ isOpen, onClose, onConfirm }) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
    onClose();
  };

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id="popup-confirm"
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">Вы уверены?</h2>
        <form
          className="form"
          name="popupUpdateAvatarForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <button className="form__submit-button" type="submit">
            Да
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
});

export default ConfirmPopup;
