import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormEdit) {
    super(popupSelector);
    this._submitFormEdit = submitFormEdit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormEdit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}
