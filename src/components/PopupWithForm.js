import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormEdit) {
    super(popupSelector);
    this._submitFormEdit = submitFormEdit;
    this._inputSelectors = this._popupSelector.querySelectorAll(
      ".popup__input"
    );
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList = Array.from(this._inputSelectors);
    this._inputList.forEach((input) => {
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
    this._popupSelector.querySelector(".popup__form").reset();
  }

  close() {
    super.close();
    this._popupSelector.querySelector(".popup__form").reset();
  }
}
