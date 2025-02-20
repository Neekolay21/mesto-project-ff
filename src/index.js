// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import { initialCards } from './cards.js';

const container = document.querySelector('.content');
const placesList = container.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const newPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');
const imagePopup = document.querySelector('.popup_type_image');

addButton.addEventListener('click', function() {
    newPopup.classList.add('popup_is-opened');
});

editButton.addEventListener('click', function() {
    editPopup.classList.add('popup_is-opened');  
});

function closePopup (popup) {
    popup.classList.remove('popup_is-opened')
}

function addClosePopupListener(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
    document.addEventListener('keydown', function(evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }    
    });
    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            closePopup(popup);
        });
    }
}

addClosePopupListener(newPopup);
addClosePopupListener(editPopup);
addClosePopupListener(imagePopup);

function createCard(el, deleteCard) {
    const placeTemplate = document.querySelector('#card-template').content;
    const placeElement = placeTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = placeElement.querySelector('.card__delete-button');
    const imageButton = placeElement.querySelector('.card__image');

    placeElement.querySelector('.card__image').src = el.link;
    placeElement.querySelector('.card__title').textContent = el.name;
    placeElement.querySelector('.card__image').alt = `Фотография места: ${el.name}`;
    
    deleteButton.addEventListener('click', deleteCard);
    imageButton.addEventListener('click', function () {
        imagePopup.classList.add('popup_is-opened');
        imagePopup.querySelector('.popup__image').src = el.link;
        imagePopup.querySelector('.popup__caption').textContent = el.name;
        imagePopup.querySelector('.popup__image').alt = `Фотография места: ${el.name}`;
    });
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