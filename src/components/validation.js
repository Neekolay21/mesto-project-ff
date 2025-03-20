function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
}

function isValid(formElement, inputElement) {
  const regexProfile = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

  if (inputElement.type === "url") {
    inputElement.setCustomValidity("");
  } else if (inputElement.value.trim() === "") {
    inputElement.setCustomValidity("");
  } else if (!regexProfile.test(inputElement.value)) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function updateButtonState(buttonElement, isDisabled, validationConfig) {
  if (isDisabled) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  const isInvalid = hasInvalidInput(inputList);
  updateButtonState(buttonElement, isInvalid, validationConfig);
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.setCustomValidity("");
  });

  updateButtonState(buttonElement, true, validationConfig);
}

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

export { clearValidation, enableValidation };
