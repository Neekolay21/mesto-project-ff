function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
  }
  
  function addClosePopupListener(popup) {
    popup.addEventListener("click", function (evt) {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        closePopup(popup);
      }
    });
    const closeButton = popup.querySelector(".popup__close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        closePopup(popup);
      });
    }
  }

  export { closePopup, addClosePopupListener };