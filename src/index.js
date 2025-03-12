// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  addClosePopupListeners,
} from "./components/modal.js";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const newPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const profileNameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const formNewPlace = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
const formError = formElement.querySelector(`.${formInput.id}-error`);
/* const formInputs = formElement.querySelectorAll(".popup__input"); */
const regexProfile = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

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
    link: urlInput.value,
  };
  const newCard = createCard(newCardObj, deleteCard, likeCard, openImageCard);
  placesList.prepend(newCard);
  closePopup(newPopup);
  cardNameInput.value = "";
  urlInput.value = "";
}
formNewPlace.addEventListener("submit", handleFormNewCard);

function openImageCard(el) {
  const card = el.target.closest(".card");

  const imagePopup = document.querySelector(".popup_type_image");
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  openPopup(imagePopup);

  const imageSrc = card.querySelector(".card__image").src;
  const imageAlt = card.querySelector(".card__title").textContent;
  const imageCaption = card.querySelector(".card__title").textContent;

  imageElement.src = imageSrc;
  imageElement.alt = `Фотография места: ${imageAlt}`;
  captionElement.textContent = imageCaption;
}

addClosePopupListeners(newPopup);
addClosePopupListeners(editPopup);
addClosePopupListeners(imagePopup);

initialCards.forEach((el) => {
  const cardElement = createCard(el, deleteCard, likeCard, openImageCard);
  placesList.append(cardElement);
});

addButton.addEventListener("click", function () {
  openPopup(newPopup);
});
editButton.addEventListener("click", function () {
  const form = editPopup.querySelector(".popup__form");

  editPopup.querySelector(".popup__input_type_name").value =
    profileName.textContent;
  editPopup.querySelector(".popup__input_type_description").value =
    profileJob.textContent;

  /* clearValidationErrors(form); */

  openPopup(editPopup);
});

/* function showInputError(element, errorMessage) {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.add("popup__input_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("popup__input-error_active");
}

function hideInputError(element) {
  const formError = formElement.querySelector(`.${element.id}-error`);
  element.classList.remove("popup__input_type_error");
  formError.classList.remove("popup__input-error_active");
  formError.textContent = "";
}

function isValid(event) {
  const inputElement = event.target;
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else if (!regexProfile.test(inputElement.value)) {
    showInputError(inputElement, "Допустимы только буквы, пробел и дефис!");
  } else {
    hideInputError(inputElement);
  }
}

formInputs.forEach((input) => {
  input.addEventListener("input", isValid);
});

function clearValidationErrors(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  inputs.forEach((input) => hideInputError(input));
}

function hasInvalidInput(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  return 
} */

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else if (!regexProfile.test(inputElement.value)) {
    showInputError(
      formElement,
      inputElement,
      "Допустимы только буквы, пробел и дефис!"
    );
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
