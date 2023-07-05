import React, { memo } from "react";

const Card = memo(
  ({
    card,
    isOwnerCard,
    isLiked,
    onCardClick,
    onCardLikeClick,
    onCardDelete,
  }) => {
    const handleClick = () => {
      onCardClick({
        name: card.name,
        link: card.link,
        isSelected: true,
      });
    }

    const handleLikeClick = () => {
      onCardLikeClick(card);
    }

    const handleCardDelete = () => {
      onCardDelete(card);
    }

    return (
      <article className="card">
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        {isOwnerCard && (
          <button
            className="card__delete button"
            type="button"
            onClick={handleCardDelete}
          ></button>
        )}
        <div className="card__container">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              className={`card__like button ${isLiked && "card__like_active"}`}
              type="button"
              onClick={handleLikeClick}
            ></button>
            <p className="card__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </article>
    );
  }
);

export default Card;
