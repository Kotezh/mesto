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

  _hideInputError (inputElement, errorElement) {
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
    const hasErrors = !this._formElement.checkValidity();
    this._buttonElement.disabled = hasErrors;
    this._buttonElement.classList.toggle(
      this._validateSettings.inactiveButtonClass,
      hasErrors
    );
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validateSettings.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._validateSettings.submitButtonSelector
    );
    //this._formElement.addEventListener('reset', () => {
      //this.clearValidation();
   // })
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._checkInputValidity(inputElement);
      });
    });
    this._formElement.addEventListener("input", () => {
      this._toggleButtonState();
    });
  }

  enableValidation() {
    //this._formElement.addEventListener('submit', (evt) => {
			//evt.preventDefault();
      //this.clearValidation();
		//});
    this._setEventListeners();
  }
  
  clearValidation() {
		this._inputList.forEach(inputElement => {
			this._hideInputError(inputElement);
		})
    //this._toggleButtonState();
	}
}













/*clearValidation(){
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._validateSettings.inputSelector));
    this._inputsList.forEach(element => {
      element.classList.remove(this._validateSettings.inputErrorClass);
    })
    this._errorsList = Array.from(this._formElement.querySelectorAll(`${this._validateSettings.inputSelector}-error`));
    this._errorsList.forEach(element => {
      element.textContent = '';
      element.classList.remove(this._validateSettings.errorClass);
    })
  }*/