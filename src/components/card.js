function likeCard (evt) {
    evt.target.classList.add('card__like-button_is-active');
};

function createCard(el, deleteCard, likeCard) {
  const placeTemplate = document.querySelector("#card-template").content;
  const placeElement = placeTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = placeElement.querySelector(".card__delete-button");
  const imageButton = placeElement.querySelector(".card__image");
  const likeButton = placeElement.querySelector(".card__like-button");
  const imagePopup = document.querySelector(".popup_type_image");
  
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

function deleteCard(event) {
  let eventTarget = event.target.closest(".places__item");
  eventTarget.remove();
}

export { likeCard, createCard, deleteCard };
