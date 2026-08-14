import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import { LoginContext } from '../contexts/LoginContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';

import api from '../utils/api.js';
import * as auth from '../utils/auth.js';

import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Auth/Login.jsx';
import Register from './Auth/Register.jsx';
import Header from './Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer.jsx';

import defaultAvatar from '../images/default-pic.svg';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Your Name",
    about: "Your Info",
    avatar: defaultAvatar,
  });

  const [userEmail, setUserEmail] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // true mientras se valida un token guardado de una visita anterior.
  // Evita que ProtectedRoute redirija a /signin por una fracción de segundo
  // antes de que sepamos si el usuario ya estaba logueado. Si no hay token
  // guardado no hay nada que validar, así que arranca en false directamente.
  const [isCheckingToken, setIsCheckingToken] = useState(
    () => Boolean(localStorage.getItem('jwt'))
  );

  const [cards, setCards] = useState(null);

  // Correo del usuario logueado, tal como lo devuelve auth.checkToken
  // (/users/me) — no viene de lo que el usuario tipeó en el formulario.

  // Al montar: si hay un token guardado de una visita anterior, lo validamos
  // contra /users/me antes de decidir si el usuario sigue logueado.
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return;
    }

    auth.checkToken(token)
      .then((res) => {
        api.setToken(token);
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem('jwt');
      })
      .finally(() => {
        setIsCheckingToken(false);
      });
  }, []);

  // Los endpoints de perfil/tarjetas están protegidos: sin token (antes de
  // iniciar sesión) fallarían, así que esperamos a que isLoggedIn sea true.
  useEffect(() => {
    if (!isLoggedIn) return;

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch(console.error);
  }, [isLoggedIn]);

  const handleLogin = ({ email, password }) => {
    return auth.login({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        api.setToken(data.token);

        return auth.checkToken(data.token);
      })
      .then((res) => {
        setUserEmail(res.data.email);
        setIsLoggedIn(true);
      })
  }

  const handleRegister = ({ email, password }) => {
    return auth.register({ email, password });
  }


  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
    .then(userData => {
      setCurrentUser(userData);
      handleClosePopup();
    })
    .catch(console.error);
  }
  
  const handleUpdateAvatar = (data) => {
    api.updateUserAvatar(data)
    .then(userData => {
      setCurrentUser(userData);
      handleClosePopup();
    })
    .catch(console.error);
  }
  
  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
    })
    .catch(console.error);
  }
  
  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
    })
    .catch(console.error);
  }
  
  const handleAddCard = (card) => {
    api.addCard(card)
    .then(newCard => {
      setCards([newCard, ...cards]);
      handleClosePopup();
    })
    .catch(console.error);
  }
  
  const [popup, setPopup] = useState(null);
  
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  // Nada que decidir todavía: no sabemos si hay sesión válida, así que no
  // renderizamos rutas para no mandar a /signin a alguien que sí la tiene.
  if (isCheckingToken) {
    return null;
  }

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn, handleLogin, handleRegister, userEmail}}>
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
    <div className="page__content">
      <Header />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <CardsContext.Provider value={{cards, handleCardLike, handleCardDelete, handleAddCard}}>
            <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup}/>
            </CardsContext.Provider>
            <Footer />
          </ProtectedRoute>
        } />
        <Route path="/signin" element={
          <ProtectedRoute anonymous>
            <Login />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <ProtectedRoute anonymous>
            <Register />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
    </LoginContext.Provider>
  )
}

export default App