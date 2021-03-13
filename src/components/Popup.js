import { ESC_KEYCODE } from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this.setEventListeners();
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    const key = evt.keyCode;
    if (key === ESC_KEYCODE) this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    const popupClose = this._popupSelector.querySelector(".popup__close");
    popupClose.addEventListener("click", () => {
      this.close();
    });
    this._popupSelector.addEventListener("click", (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
