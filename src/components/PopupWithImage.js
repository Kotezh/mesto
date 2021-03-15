import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFullImage = this._popup.querySelector(".popup__image");
    this._popupFullImageCaption = this._popup.querySelector(
      ".popup__image-caption"
    );
  }

  open({ name, link }) {
    super.open();
    this._popupFullImage.src = link;
    this._popupFullImage.alt = name;
    this._popupFullImageCaption.textContent = name;
  }
}
