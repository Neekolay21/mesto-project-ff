function openPopup(popup) {
    popup.classList.add("popup_is-opened");

    const closeOnEscape = function(evt) {
        if (evt.key === "Escape") {
            closePopup(popup, closeOnEscape);
        }
    }

    document.addEventListener("keydown", closeOnEscape);
}

function closePopup(popup, closeOnEscape) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeOnEscape);
}

function addClosePopupListeners(popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });

  const closeButton = popup.querySelector(".popup__close");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closePopup(popup);
    });
  }
};


export { closePopup, addClosePopupListeners, openPopup};
