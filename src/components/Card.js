export default class Card {
  constructor(
    data,
    userId,
    cardId,
    placeTemplate,
    { handleCardClick, handleLikeClick, handleDeleteIconClick }
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardId = cardId;
    this._userId = userId;
    this._placeTemplate = placeTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    const place = document
      .querySelector(this._placeTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    return place;
  }

  removePlace() {
    this._element.remove();
  }

  getCardId() {
    return this._cardId;
  }

  isLiked() {
    return this._data.likes.some((item) => {
      return item._id === this._userId;
    });
  }

  countLikesNumber() {
    if (this.isLiked(this._userId)) {
      this._elementHeart.classList.add("heart_active");
    } else {
      this._elementHeart.classList.remove("heart_active");
    }
  }

  renderLikes() {
    this._likesNumber.textContent = this._data.likes.length;
    this.countLikesNumber(this._userId);
  }

  setLikes(listLikes) {
    this._data.likes = listLikes;
  }

  _setDeleteIcon() {
    if (this._data.owner._id !== this._userId) {
      this._elementTrash.remove();
    }
  }

  _setEventListeners() {
    this._elementHeart.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._elementTrash.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });
    this._elementImage.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._likesNumber = this._element.querySelector(".element__likes-number");
    this._elementHeart = this._element.querySelector(".heart");
    this._elementTrash = this._element.querySelector(".trash");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setDeleteIcon();
    this.renderLikes();
    this._setEventListeners();
    return this._element;
  }
}
