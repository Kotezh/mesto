import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitFormEdit) {
    super(popupSelector);
    this._submitFormEdit = submitFormEdit;
  }

  open(id, confirmDel) {
    super.open();
    this._element = id;
    this._confirmDel = confirmDel
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFormEdit(this._element, this._confirmDel);
    });
  }
}
