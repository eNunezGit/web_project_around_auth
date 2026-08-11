import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { LoginContext } from '../contexts/LoginContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';

import api from '../utils/api.js';

import ProtectedRoute from './ProtectedRoute.jsx';
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

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [cards, setCards] = useState(null);
  
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch(console.error);
  }, []);
  
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

  return (
    <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <CurrentUserContext.Provider value={{currentUser, handleUpdateUser, handleUpdateAvatar}}>
    <CardsContext.Provider value={{cards, handleCardLike, handleCardDelete, handleAddCard}}>
    <div className="page__content">
      <Header />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Main onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup}/>
          </ProtectedRoute>
        } />
        <Route path="/signin" element={
          <ProtectedRoute anonymous>
            {/* <Login /> */}
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <ProtectedRoute anonymous>
            {/* <Register /> */}
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </div>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>
    </LoginContext.Provider>
  )
}

export default App