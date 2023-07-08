import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api";
import auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {
  const [isOpen, setOpen] = useState({
    editAvatarPopup: false,
    addCardPopup: false,
    editProfilePopup: false,
    confirmPopup: false,
    infoTooltipPopup: false,
  });
  const [confirmedCardForDelete, setConfirmedCardForDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    isSelected: false,
  });
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessAuthorization, setSuccessAuthorization] = useState(false);
  const [isPending, setPending] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards.reverse());
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setOpen((state) => ({ ...state, editAvatarPopup: true }));
  };

  const handleAddCardClick = () => {
    setOpen((state) => ({ ...state, addCardPopup: true }));
  };

  const handleEditProfileClick = () => {
    setOpen((state) => ({ ...state, editProfilePopup: true }));
  };

  const closeAllPopup = () => {
    setOpen({
      editAvatarPopup: false,
      addCardPopup: false,
      editProfilePopup: false,
      confirmPopup: false,
      infoTooltipPopup: false,
    });
    setSelectedCard({ name: "", link: "", isSelected: false });
  };

  const handleUpdateUser = (userInfo) => {
    api
      .patchUserInfo(userInfo)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setPending(false));
  };

  const handleUpdateAvatar = (userAvatar) => {
    api
      .patchUserAvatar(userAvatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setPending(false));
  };

  const handlePlaceSubmit = ({ title: name, link }) => {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setPending(false));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api
      .changeCardLikes(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardItem) =>
            card._id === cardItem._id ? newCard : cardItem
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    setOpen((state) => ({ ...state, confirmPopup: true }));
    setConfirmedCardForDelete(card);
  };

  const handleConfirm = () => {
    api
      .deleteCard(confirmedCardForDelete._id)
      .then(() =>
        setCards((state) =>
          state.filter(
            (cardItem) => cardItem._id !== confirmedCardForDelete._id
          )
        )
      )
      .catch((err) => console.log(err))
      .finally(() => closeAllPopup());
  };

  const handleLoginSubmit = (inputsValues) => {
    auth
      .authorization(inputsValues)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setEmail(inputsValues.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setSuccessAuthorization(false);
        setOpen((state) => ({ ...state, infoTooltipPopup: true }));
      })
      .finally(() => setPending(false));
  };

  const handleRegisterSubmit = (inputsValues) => {
    auth
      .register(inputsValues)
      .then(() => {
        navigate("/signin", { replace: true });
        setSuccessAuthorization(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpen((state) => ({ ...state, infoTooltipPopup: true }));
        setPending(false);
      });
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    setLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth
        .checkToken(jwt)
        .then((user) => {
          setLoggedIn(true);
          setEmail(user.email);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={loggedIn}
          email={email}
          onLogoutClick={handleLogoutClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                redirectPath="/signin"
                loggedIn={loggedIn}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleAddCardClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLikeClick={handleLikeClick}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                handleRegisterSubmit={handleRegisterSubmit}
                isPending={isPending}
                setPending={setPending}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                handleLoginSubmit={handleLoginSubmit}
                isPending={isPending}
                setPending={setPending}
              />
            }
          />
        </Routes>
        <Footer loggedIn={loggedIn} />
        <EditProfilePopup
          isOpen={isOpen.editProfilePopup}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          isPending={isPending}
          setPending={setPending}
        />
        <EditAvatarPopup
          isOpen={isOpen.editAvatarPopup}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isPending={isPending}
          setPending={setPending}
        />
        <AddPlacePopup
          isOpen={isOpen.addCardPopup}
          onClose={closeAllPopup}
          onAddCard={handlePlaceSubmit}
          isPending={isPending}
          setPending={setPending}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        <ConfirmPopup
          isOpen={isOpen.confirmPopup}
          onClose={closeAllPopup}
          onConfirm={handleConfirm}
        />
        <InfoTooltip
          isOpen={isOpen.infoTooltipPopup}
          onClose={closeAllPopup}
          isRegisterSuccess={isSuccessAuthorization}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
