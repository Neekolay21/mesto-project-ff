// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');

function addCard(el) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElements = placeTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = placeElements.querySelector('.card__delete-button');

    placeElements.querySelector('.card__image').src = el.link;
    placeElements.querySelector('.card__title').textContent = el.name;
    
    placesList.append(placeElements);
    deleteButton.addEventListener('click', deleteCard);
};

initialCards.forEach(addCard);

function deleteCard(event) {
    let eventTarget = event.target.closest('.places__item');
    eventTarget.remove();
};