import React from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import handleOverlayClick from "../utils/utils";
import okIcon from "../images/info-tooltip-ok.svg";
import errIcon from "../images/info-tooltip-err.svg";

const InfoTooltip = ({ isOpen, onClose, isRegisterSuccess }) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);
  const image = isRegisterSuccess
    ? okIcon
    : errIcon;

  return (
    <div
      className={classNamePopup}
      id="popup-info"
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__container">
        <img
          className="popup__info-icon"
          src={image}
          alt="Информация об успешности регистации"
        />
        <h2 className="popup__info-title">
          {isRegisterSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
