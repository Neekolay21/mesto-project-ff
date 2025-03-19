// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  likeCard,
  unLikeCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  addClosePopupListeners,
} from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validation.js";
import { 
  getUserData, 
  getInitialCards, 
  updateUserProfile, 
  addNewCard, 
  updateAvatar 
} from "./components/api.js";

const container = document.querySelector(".content");
const placesList = container.querySelector(".places__list");
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const avatarButton = document.querySelector(".profile__image");
const newPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_new-avatar");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.forms["edit-profile"];
const formNewPlace = document.forms["new-place"];
const formNewAvatar = document.forms["new-avatar"];
const profileNameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
const avatarInput = document.querySelector(".popup__input_type_avatar");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
};

editPopup.classList.add("popup_is-animated");
newPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");
avatarPopup.classList.add("popup_is-animated");

function renderLoading(isLoading, buttonElement, defaultText = "Сохранить") {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = defaultText;
    buttonElement.disabled = false;
  }
}

function handleFormEditProfile(evt) {
  evt.preventDefault();
  const submitButton = formEditProfile.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const newNameObj = {
    name: profileNameInput.value,
    about: jobInput.value,
  };

  updateUserProfile(newNameObj)
    .then((res) => {
      profileName.textContent = res.name;
      profileJob.textContent = res.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.error("Ошибка при изменении данных профиля:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}
formEditProfile.addEventListener("submit", handleFormEditProfile);

function handleFormNewCard(evt) {
  evt.preventDefault();
  const submitButton = formNewPlace.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const newCardObj = {
    name: cardNameInput.value,
    link: urlInput.value,
  };

  addNewCard(newCardObj)
    .then((cardData) => {
      const newCard = createCard(cardData, deleteCard, likeCard, openImageCard);
      placesList.prepend(newCard);
      closePopup(newPopup);
      formNewPlace.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}
formNewPlace.addEventListener("submit", handleFormNewCard);

function handleFormNewAvatar(evt) {
  evt.preventDefault();
  const submitButton = formNewAvatar.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const newAvatarObj = {
    avatar: avatarInput.value,
  };

  updateAvatar(newAvatarObj)
    .then((res) => {
      avatarButton.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(avatarPopup);
      formNewAvatar.reset();
    })
    .catch((err) => {
      console.error("Ошибка при изменении аватара профиля:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
}
formNewAvatar.addEventListener("submit", handleFormNewAvatar);

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
addClosePopupListeners(avatarPopup);

/* initialCards.forEach((el) => {
  const cardElement = createCard(el, deleteCard, likeCard, openImageCard);
  placesList.append(cardElement);
}); */

addButton.addEventListener("click", function () {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openPopup(newPopup);
});

editButton.addEventListener("click", function () {
  editPopup.querySelector(".popup__input_type_name").value =
    profileName.textContent;
  editPopup.querySelector(".popup__input_type_description").value =
    profileJob.textContent;

  clearValidation(formEditProfile, validationConfig);
  openPopup(editPopup);
});
avatarButton.addEventListener("click", function () {
  formNewAvatar.reset();
  clearValidation(formNewAvatar, validationConfig);
  openPopup(avatarPopup);
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
});

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    const myUserId = userData._id;

    cards.forEach((el) => {
      const cardElement = createCard(
        el,
        deleteCard,
        likeCard,
        unLikeCard,
        openImageCard,
        myUserId
      );
      placesList.append(cardElement);
    });
  })
  .catch((err) => console.error("Ошибка при загрузке данных:", err));
