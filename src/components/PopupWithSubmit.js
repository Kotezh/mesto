import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormEdit) {
    super(popupSelector);
    this._submitFormEdit = submitFormEdit;
  }

  open(id) {
    super.open();
    this._element = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormEdit(evt, this._element);
    });
  }
}
