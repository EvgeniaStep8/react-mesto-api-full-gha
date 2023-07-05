import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddCard,
  onCardClick,
  onCardLikeClick,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__change-avatar-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фотография профиля"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button button"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button button"
          type="button"
          onClick={onAddCard}
        ></button>
      </section>
      <section className="cards">
        {cards?.map((card) => (
          <Card
            key={card._id}
            card={card}
            isOwnerCard={card.owner._id === currentUser._id}
            isLiked={card.likes.some((like) => like._id === currentUser._id)}
            onCardClick={onCardClick}
            onCardLikeClick={onCardLikeClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
};

export default Main;
