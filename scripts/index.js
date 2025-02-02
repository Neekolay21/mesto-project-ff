// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');

function createCard(el, deleteCard) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = placeElement.querySelector('.card__delete-button');

    placeElement.querySelector('.card__image').src = el.link;
    placeElement.querySelector('.card__title').textContent = el.name;
    placeElement.querySelector('.card__image').alt = `Фотография места: ${el.name}`;
    
    deleteButton.addEventListener('click', deleteCard);
    return placeElement;
};

initialCards.forEach((el) => {
    const cardElement = createCard(el, deleteCard);
    placesList.append(cardElement);
});

function deleteCard(event) {
    let eventTarget = event.target.closest('.places__item');
    eventTarget.remove();
};