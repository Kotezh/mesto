export default class Card {
  constructor( data, userId, placeTemplate, handleCardClick, handleLikeClick, 
    handleDeleteIconClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._placeTemplate = placeTemplate;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userId = userId;
  }

  _getTemplate() {
    const place = document
      .querySelector(this._placeTemplate)
      .content.querySelector(".element")
      .cloneNode(true);
    return place;
  }

  _toggleLike() {
    this._elementHeart.classList.toggle("heart_active");
  }

  removePlace() {
    this._element.remove();
  }

  getCardId(){
    return this._userId
  }

  countLikesNumber (data){
      this._data = data;
      this._likesNumber.textContent = this._data.likes.length;
      if(this._data.likes.some(item => item._id === this._userId)){
        this._elementHeart.classList.add("heart_active");
      } else {
        this._elementHeart.classList.remove("heart_active");
      }
  }

  _setDeleteIcon(){
    if (this._userId !== this._data.owner._id){
      this._elementTrash.remove()
    }
    //if (this._data.likes.some(item => item._id === this._userId)) {
      //this._elementHeart.classList.add("heart_active");
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._likesNumber = this._element.querySelector(".element__likes-number");
    this._elementHeart = this._element.querySelector(".heart");
    this._elementTrash = this._element.querySelector(".trash");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setDeleteIcon();
    this.countLikesNumber(this._data);
    return this._element;
  }

  _setEventListeners() {
    this._elementHeart.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });
    this._elementTrash.addEventListener("click", () => {
      this._handleDeleteIconClick(this._data._id, ()=>{
        this.removePlace()
      });
    });
    this._elementImage.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }
};
