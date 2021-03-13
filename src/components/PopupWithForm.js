import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormEdit) {
    super(popupSelector);
    this._submitFormEdit = submitFormEdit;
  }

  _getInputValues() {
    this._inputSelectors = this._popupSelector.querySelectorAll(
      ".popup__input")
    this._inputValues = {};
    this._inputSelectors.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormEdit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupSelector.querySelector(".popup__form").reset();
  }
}
