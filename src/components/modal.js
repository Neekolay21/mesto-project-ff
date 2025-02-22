function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
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

  const closeOnEscape = function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };

  document.addEventListener("keydown", closeOnEscape);

  return function removeEscapeListener() {
    document.removeEventListener("keydown", closeOnEscape);
  };
}


export { closePopup, addClosePopupListeners };
