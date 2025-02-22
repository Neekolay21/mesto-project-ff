function likeCard (evt) {
    evt.target.classList.add('card__like-button_is-active');
};

function createCard(el, deleteCard, likeCard, openImageCard) {
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
  imageButton.addEventListener("click", openImageCard);
  
  return placeElement;
}

function deleteCard(event) {
  const eventTarget = event.target.closest(".places__item");
  eventTarget.remove();
}

function openImageCard(el) {
    const card = el.target.closest('.card'); 

    const imagePopup = document.querySelector(".popup_type_image");
    const imageElement = imagePopup.querySelector(".popup__image");
    const captionElement = imagePopup.querySelector(".popup__caption");

    imagePopup.classList.add("popup_is-opened");

    const imageSrc = card.querySelector('.card__image').src;
    const imageAlt = card.querySelector('.card__title').textContent;
    const imageCaption = card.querySelector('.card__title').textContent;

    imageElement.src = imageSrc;
    imageElement.alt = `Фотография места: ${imageAlt}`;
    captionElement.textContent = imageCaption;
}

export { likeCard, createCard, deleteCard, openImageCard};
