import { event } from "jquery";
import { deleteCardFromServer, likeCardOnServer, unlikeCardOnServer } from "./api.js"

function likeCard(event, cardId) {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");
  const likeCounter = cardElement.querySelector(".card__like-number");

  likeCardOnServer(cardId)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.add("card__like-button_is-active");
    })
    .catch((err) => console.error("Ошибка при добавлении лайка:", err));
}

function unLikeCard(event, cardId) {
  const likeButton = event.target;
  const cardElement = likeButton.closest(".card");
  const likeCounter = cardElement.querySelector(".card__like-number");

  unlikeCardOnServer(cardId)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.remove("card__like-button_is-active");
    })
    .catch((err) => console.error("Ошибка при удалении лайка:", err));
}

function createCard(el, deleteCard, likeCard, unLikeCard, openImageCard, myUserId) {
  const placeTemplate = document.querySelector("#card-template").content;
  const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = placeElement.querySelector(".card__delete-button");
  const imageButton = placeElement.querySelector(".card__image");
  const likeButton = placeElement.querySelector(".card__like-button");
  const likeCounter = placeElement.querySelector(".card__like-number");

  placeElement.querySelector(".card__image").src = el.link;
  placeElement.querySelector(".card__title").textContent = el.name;
  placeElement.querySelector(".card__image").alt = `Фотография места: ${el.name}`;
  likeCounter.textContent = el.likes.length;

  const isLikedByMe = el.likes.some((like) => like._id === myUserId);
  if (isLikedByMe) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (el.owner._id !== myUserId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (event) => deleteCard(event, el._id));
  }

  likeButton.addEventListener("click", (event) => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      unLikeCard(event, el._id);
    } else {
      likeCard(event, el._id);
    }
  });

  imageButton.addEventListener("click", openImageCard);

  return placeElement;
}

function deleteCard(event, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      const eventTarget = event.target.closest(".places__item");
      eventTarget.remove();
    })
    .catch((err) => console.error("Ошибка удаления карточки:", err));
}

export { likeCard, unLikeCard, createCard, deleteCard };
