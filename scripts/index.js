// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.places');
const placesList = container.querySelector('.places__list');
const deleteButton = container.querySelector('.card__delete-button');

initialCards.forEach(addCard);

function addCard() {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElements = placeTemplate.querySelectorAll('.card').cloneNode(true);

} 