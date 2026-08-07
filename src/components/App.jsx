import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router";

import defaultAvatar from '../images/default-pic.svg'
import Header from './Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardsContext } from '../contexts/CardsContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Your Name",
    about: "Your Info",
    avatar: defaultAvatar,
  });

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
    .then((newCard) => {
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
        <Route path="/signup" element={
          <ProtectedRoute anonymous>
            {/* <Login /> */}
          </ProtectedRoute>
          } />
        <Route path="/signin" element={
          <ProtectedRoute anonymous>
            {/* <Register /> */}
          </ProtectedRoute>
          } />
      </Routes>
      <Footer />
    </div>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App