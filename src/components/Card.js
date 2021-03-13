export default class Card {
  constructor(data, placeTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._placeTemplate = placeTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const place = document
      .querySelector(this._placeTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    return place;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._elementHeart = this._element.querySelector(".heart");
    this._elementTrash = this._element.querySelector(".trash");
    this._elementPopup = this._element.querySelector(".element__popup");
    this._elementHeart.addEventListener("click", (evt) => {
      this._toggleLike(evt);
    });
    this._elementTrash.addEventListener("click", () => {
      this._removePlace();
    });
    this._elementPopup.addEventListener("click", () => {
      //evt.preventDefault();
      this._handleCardClick({
        name: this._name,
        link: this._link
      });
    });
  }

  _toggleLike() {
    this._elementHeart.classList.toggle("heart_active");
  }

  _removePlace(evt) {
    this._element.remove();
  }
}
