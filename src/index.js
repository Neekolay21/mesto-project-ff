// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard, openImageCard } from "./components/card.js";
import { closePopup, addClosePopupListeners } from "./components/modal.js";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const newPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formEditProfile = document.forms['edit-profile'];
const profileNameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formNewPlace = document.forms['new-place'];
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

editPopup.classList.add("popup_is-animated");
newPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

function handleFormEditProfile(evt) {
  evt.preventDefault();

  const newName = profileNameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closePopup(editPopup);
}
formEditProfile.addEventListener("submit", handleFormEditProfile);

function handleFormNewCard(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: cardNameInput.value,
        link: urlInput.value
    };
    const newCard = createCard(newCardObj, deleteCard, likeCard, openImageCard);
    placesList.prepend(newCard);
    closePopup(newPopup);
    cardNameInput.value = '';
    urlInput.value = '';
}
formNewPlace.addEventListener("submit", handleFormNewCard);

addButton.addEventListener("click", function () {
  newPopup.classList.add("popup_is-opened");
});
editButton.addEventListener("click", function () {
  editPopup.querySelector(".popup__input_type_name").value = profileName.textContent;
  editPopup.querySelector(".popup__input_type_description").value = profileJob.textContent;
  editPopup.classList.add("popup_is-opened");
});

addClosePopupListeners(newPopup);
addClosePopupListeners(editPopup);
addClosePopupListeners(imagePopup);

initialCards.forEach((el) => {
  const cardElement = createCard(el, deleteCard, likeCard, openImageCard);
  placesList.append(cardElement);
});
