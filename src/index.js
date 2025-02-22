// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./cards.js";

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

function likeCard (evt) {
    evt.target.classList.add('card__like-button_is-active');
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = profileNameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closePopup(editPopup);
}
formEditProfile.addEventListener("submit", handleFormSubmit);

function handleFormNewCard(evt) {
    evt.preventDefault();
    const newCardObj = {
        name: cardNameInput.value,
        link: urlInput.value
    };
    const newCard = createCard(newCardObj, deleteCard, likeCard);
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

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function addClosePopupListener(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closePopup(popup);
    });
  }
}

addClosePopupListener(newPopup);
addClosePopupListener(editPopup);
addClosePopupListener(imagePopup);

function createCard(el, deleteCard, likeCard) {
  const placeTemplate = document.querySelector("#card-template").content;
  const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = placeElement.querySelector(".card__delete-button");
  const imageButton = placeElement.querySelector(".card__image");
  const likeButton = placeElement.querySelector(".card__like-button");

  placeElement.querySelector(".card__image").src = el.link;
  placeElement.querySelector(".card__title").textContent = el.name;
  placeElement.querySelector(".card__image").alt = `Фотография места: ${el.name}`;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
  imageButton.addEventListener("click", function () {
    imagePopup.classList.add("popup_is-opened");
    imagePopup.querySelector(".popup__image").src = el.link;
    imagePopup.querySelector(".popup__caption").textContent = el.name;
    imagePopup.querySelector(".popup__image").alt = `Фотография места: ${el.name}`;
  });
  return placeElement;
}

initialCards.forEach((el) => {
  const cardElement = createCard(el, deleteCard, likeCard);
  placesList.append(cardElement);
});

function deleteCard(event) {
  let eventTarget = event.target.closest(".places__item");
  eventTarget.remove();
}
