import React from "react"
import Header from "./Header.js"
import "../index.css"
import Main from "./Main"
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Login from "./Login.js"
import Register from "./Register.js"
import * as auth from "../utils/auth"
import ProtectedRoute from "./ProtectedRoute.js"
import InfoTooltip from "./InfoTooltip.js"
import UnionUnsuccess from "../images/UnionUnsuccess.svg"
import UnionSuccess from "../images/UnionSuccess.svg"

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [tooltipImage, setTooltipImage] = React.useState("")
  const [tooltipTitle, setTooltipTitle] = React.useState("")
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")

  const navigate = useNavigate()

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsTooltipPopupOpen(false)
  }

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
        .then(([userInfo, cardData]) => {
          setCurrentUser(userInfo)
          setCards(cardData.data.reverse())
          console.log(userInfo, cardData)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
  }, [loggedIn])

  // eslint-disable-next-line
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    console.log(jwt)
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.email)
            navigate("/", { replace: true })
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  /* function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c))
        })
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }*/

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    (isLiked ? api.removeLike(card._id) : api.addLike(card._id, true))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === newCard.data._id ? newCard.data : c))
        )
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api
      .editProfile(userInfo)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api
      .editProfileAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api
      .addCardElements(newCard)
      .then((newCard) => {
        setCards([newCard.data, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleOnLogin(password, email) {
    auth
      .authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token)
        setLoggedIn(true)
        setEmail(email)
        navigate("/")
      })
      .catch((err) => {
        onError()
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleOnRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/signin")
        onRegister()
      })
      .catch((err) => {
        onError()
        console.log(`Ошибка: ${err}`)
      })
  }

  function onRegister() {
    setTooltipTitle("Вы успешно зарегистрировались!")
    setTooltipImage(UnionSuccess)
    setIsTooltipPopupOpen(true)
  }

  function onError() {
    setTooltipTitle("Что-то пошло не так! Попробуйте еще раз.")
    setTooltipImage(UnionUnsuccess)
    setIsTooltipPopupOpen(true)
  }

  function signOut() {
    localStorage.removeItem("jwt")
    setLoggedIn(false)
    setEmail("")
    navigate("./signin")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header loggedIn={loggedIn} email={email} signOut={signOut} />
          <Routes>
            <Route path="/signin" element={<Login onLogin={handleOnLogin} />} />
            <Route
              path="/signup"
              element={<Register onRegister={handleOnRegister} />}
            />
            <Route
              path="/"
              element={
                <>
                  <ProtectedRoute
                    element={Main}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    loggedIn={loggedIn}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="*"
              element={<Navigate to={loggedIn ? "/" : "/signin"} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            image={tooltipImage}
            title={tooltipTitle}
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}
