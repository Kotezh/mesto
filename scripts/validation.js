
const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__btn-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, validateSettings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validateSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateSettings.errorClass);
};

const hideInputError = (formElement, inputElement, validateSettings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validateSettings.inputErrorClass);
  errorElement.classList.remove(validateSettings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validateSettings) => {
  console.log(inputElement.validity.valid);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateSettings);
  } else {
    hideInputError(formElement, inputElement, validateSettings);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validateSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validateSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validateSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, validateSettings) => {
  const inputList = Array.from(formElement.querySelectorAll(validateSettings.inputSelector));
  const buttonElement = formElement.querySelector(validateSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validateSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validateSettings);
      toggleButtonState(inputList, buttonElement, validateSettings);
    });
  });
};

const enableValidation = (validateSettings) => {
  const formList = Array.from(document.querySelectorAll(validateSettings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validateSettings);
  })
};

enableValidation(validateSettings)



