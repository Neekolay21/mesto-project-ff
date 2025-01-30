// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const deleteButton = container.querySelector('.card__delete-button');
const addButton = container.querySelector('.profile__add-button');
const placeTemplate = document.querySelector('#card-template').content;

function addCard(el) {
    const placeElements = placeTemplate.querySelector('.card').cloneNode(true);

    placeElements.querySelector('.card__image').src = el.link;
    placeElements.querySelector('.card__title').textContent = el.name;
    
    placesList.append(placeElements);

} 

function deleteCard() {
    deleteButton.addEventListener('click', function () {
        placeItem = deleteButton.closest('.card');
        placeItem.remove();
    });
}

initialCards.forEach(addCard);
