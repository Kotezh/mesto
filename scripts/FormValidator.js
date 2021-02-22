
export class FormValidator {
  constructor(validateSettings, formElement) {
    this._validateSettings = validateSettings;
    this._formElement = formElement;
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`#${inputElement.id}-error`);
  }

  _showInputError(inputElement, errorMessage, errorElement) {
    inputElement.classList.add(this._validateSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validateSettings.errorClass);
  }

  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._validateSettings.inputErrorClass);
    errorElement.classList.remove(this._validateSettings.errorClass);
    errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        errorElement
      );
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._validateSettings.inactiveButtonClass
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._validateSettings.inactiveButtonClass
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validateSettings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this.__validateSettings.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        //const inputElement = evt.target;
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    /*this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    });*/
  }
}
