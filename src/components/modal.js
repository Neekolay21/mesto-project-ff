const closeOnEscape = function (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
};

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
}

function addClosePopupListeners(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(document.querySelector(".popup_is-opened"));
    }
  });

  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closePopup(document.querySelector(".popup_is-opened"));
    });
  }
}

export { closePopup, addClosePopupListeners, openPopup };
