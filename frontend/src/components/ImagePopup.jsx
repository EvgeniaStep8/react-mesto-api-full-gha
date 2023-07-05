import React from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import handleOverlayClick from "../utils/utils";

const ImagePopup = ({ card, onClose }) => {
  const isOpen = card.isSelected;
  const classNamePopup =   `popup popup_overlay_dark ${isOpen ? "popup_opened" : ""}`;

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);
  
  return (
    <div
      className={classNamePopup}
      id="popup-open-image"
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img alt={card.name} src={card.link} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default ImagePopup;
