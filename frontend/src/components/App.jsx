import React, { useState, useEffect, useCallback } from "react";
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
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [isPending, setPending] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditAvatarClick = useCallback(() => {
    setOpen((state) => ({ ...state, editAvatarPopup: true }));
  }, []);

  const handleAddCardClick = useCallback(() => {
    setOpen((state) => ({ ...state, addCardPopup: true }));
  }, []);

  const handleEditProfileClick = useCallback(() => {
    setOpen((state) => ({ ...state, editProfilePopup: true }));
  }, []);

  const closeAllPopup = useCallback(() => {
    setOpen({
      editAvatarPopup: false,
      addCardPopup: false,
      editProfilePopup: false,
      confirmPopup: false,
      infoTooltipPopup: false,
    });
    setSelectedCard({ name: "", link: "", isSelected: false });
  }, []);

  const handleUpdateUser = useCallback(
    (userInfo) => {
      api
        .patchUserInfo(userInfo)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopup();
        })
        .catch((err) => console.log(err))
        .finally(() => setPending(false));
    },
    [closeAllPopup]
  );

  const handleUpdateAvatar = useCallback(
    (userAvatar) => {
      api
        .patchUserAvatar(userAvatar)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopup();
        })
        .catch((err) => console.log(err))
        .finally(() => setPending(false));
    },
    [closeAllPopup]
  );

  const handlePlaceSubmit = useCallback(
    ({ title: name, link }) => {
      api
        .postCard({ name, link })
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopup();
        })
        .catch((err) => console.log(err))
        .finally(() => setPending(false));
    },
    [closeAllPopup, cards]
  );

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
  }, []);

  const handleLikeClick = useCallback(
    (card) => {
      const isLiked = card.likes.some((like) => like._id === currentUser._id);
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
    },
    [currentUser]
  );

  const handleCardDelete = useCallback((card) => {
    setOpen((state) => ({ ...state, confirmPopup: true }));
    setConfirmedCardForDelete(card);
  }, []);

  const handleConfirm = useCallback(() => {
    api
      .deleteCard(confirmedCardForDelete._id)
      .then(() =>
        setCards((state) =>
          state.filter(
            (cardItem) => cardItem._id !== confirmedCardForDelete._id
          )
        )
      )
      .catch((err) => console.log(err));
  }, [confirmedCardForDelete]);

  const handleLoginSubmit = (inputsValues) => {
    auth.authorization(inputsValues)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail(inputsValues.email);
        navigate('/', {replace: true});
      })
      .catch((err) => {
        console.log(err);
        setOpen((state) => ({ ...state, infoTooltipPopup: true }));
      })
      .finally(() => setPending(false));
  }

  const handleRegisterSubmit = (inputsValues) => {
    auth.register(inputsValues)
      .then(() => {
        navigate('/signin', {replace: true});
        setRegisterSuccess(true);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setOpen((state) => ({ ...state, infoTooltipPopup: true }));
        setPending(false);
      })
  }

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate("/signin");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      auth.checkToken(jwt)
        .then(({ data }) => {
          setLoggedIn(true);
          setEmail(data.email);
          navigate('/', {replace: true});
        })
        .catch((err) => console.log(err));
      }
  }, [navigate]);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header loggedIn={loggedIn} email={email} onLogoutClick={handleLogoutClick} />
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
          <Route path="/signup" element={
            <Register
              handleRegisterSubmit={handleRegisterSubmit}
              isPending={isPending}
              setPending={setPending}
            />
          } />
          <Route path="/signin" element={
            <Login
              handleLoginSubmit={handleLoginSubmit}
              isPending={isPending}
              setPending={setPending}
            />
          } />
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
          isRegisterSuccess={isRegisterSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
