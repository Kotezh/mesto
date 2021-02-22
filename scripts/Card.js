export class Card {
  constructor(data, placeTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._placeTemplate = placeTemplate;
  }

  _getTemplate() {
    const place = document
      .querySelector(this._placeTemplate)
      .textContent.querySelector(".element")
      .cloneNode(true);
    return place;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementHeart = this._element.querySelector(".heart");
    this._elementTrash = this._element.querySelector(".trash");
    this._elementPopup = this._element.querySelector(".element__popup");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => {
      this._closePopup();
    });
    this._elementHeart.addEventListener("click", this._toggleLike);
    this._elementTrash.addEventListener("click", this.removePlace);
    this._elementPopup.addEventListener("click", (evt) => {
      evt.preventDefault();
      openPopup(popupOpenedImage);
      popupFullImage.src = this._link;
      popupFullImage.alt = this._name;
      popupFullImageCaption.textContent = this._name;
    });
  }

  _toggleLike(evt) {
    evt.target.classList.toggle("heart_active");
  }

  removePlace(evt) {
    evt.target.closest(".element").remove();
  }
}
/*
function createElement(place) {
  const element = placeTemplate.cloneNode(true);

  const elementImage = element.querySelector(".element__image");
  const elementTitle = element.querySelector(".element__title");
  const elementHeart = element.querySelector(".heart");
  const elementTrash = element.querySelector(".trash");
  const elementPopup = element.querySelector(".element__popup");
  elementImage.src = place.link;
  elementImage.alt = place.name;
  elementTitle.textContent = place.name;

  elementHeart.addEventListener("click", toggleLike);
  elementTrash.addEventListener("click", removePlace);
  elementPopup.addEventListener("click", (evt) => {
    evt.preventDefault();
    openPopup(popupOpenedImage);
    popupFullImage.src = place.link;
    popupFullImage.alt = place.name;
    popupFullImageCaption.textContent = place.name;
  });

  return element;
}

*/
