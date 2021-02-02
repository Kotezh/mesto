const initialCards = [
  {
    name: 'Палаван',
    link: './blocks/element/__image/Palawan.jpg'
  },
  {
    name: 'Андаманские острова',
    link: './blocks/element/__image/AndamanIslands.jpg'
  },
  {
    name: 'Меконг',
    link: './blocks/element/__image/Mekong-1.jpg'
  },
  {
    name: 'Карачаевск',
    link: './blocks/element/__image/Karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './blocks/element/__image/Elbrus-1.jpg'
  },
  {
    name: 'Домбай',
    link: './blocks/element/__image/Dombai-1.jpg'
  }
];

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewPlace = document.querySelector('.popup_type_add-place');
const popupOpenedImage = document.querySelector('.popup_type_image');
const closeButtonEdit = document.querySelector('.popup__close_type_edit-profile');
const closeButtonAdd = document.querySelector('.popup__close_type_add-place');
const closeButtonImage = document.querySelector('.popup__close_type_image');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeNameInput = document.querySelector('.popup__input_type_place-name');
const placeLinkInput = document.querySelector('.popup__input_type_place-link');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageCaption = document.querySelector('.popup__image-caption');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPlace = document.querySelector('.popup__form_type_add-place');
const elementsList = document.querySelector('.elements__list');



function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

function closePopupNewPlace(evt) {
  closePopup(popupNewPlace);
}

function closePopupImage(evt) {
  closePopup(popupOpenedImage);
}

function addPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

function addPlaceholder() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function addPopupEditProfile() {
  //evt.preventDefault();
  addPlaceholder();
  addPopup(popupEditProfile);
  
}

function addPopupNewPlace(evt) {
  evt.preventDefault();
  addPopup(popupNewPlace);
  placeNameInput.value = '';
  placeLinkInput.value = '';
}

function submitFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function removePlace(evt) {
  evt.target.closest('.element').remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('heart_active');
}

function closeClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closeEsc(evt) {
  if (evt.keyCode === 27) {
    const popupOpened = document.querySelector('.popup_opened');
    popupOpened.remove();
  }
}



function createElement(place) {
  const placeTemplate = document.querySelector('#new-element').content;
  const element = placeTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementHeart = element.querySelector('.heart');
  const elementTrash = element.querySelector('.trash');
  const elementPopup = element.querySelector('.element__popup');
  elementImage.src = place.link;
  elementImage.alt = place.name;
  elementTitle.textContent = place.name;
  elementHeart.addEventListener('click', toggleLike);
  elementTrash.addEventListener('click', removePlace);
  elementPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    addPopup(popupOpenedImage);
    popupFullImage.src = place.link;
    popupFullImage.alt = place.name;
    popupFullImageCaption.textContent = place.name;
  });
  return element;
};

function render() {
  let renderElement = initialCards.map(createElement);
  elementsList.append(...renderElement);
};

function addNewPlace(evt) {
  evt.preventDefault();
  let data = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  }
  let newElement = createElement(data);
  elementsList.prepend(newElement);
  closePopupNewPlace();
};

render();

editButton.addEventListener('click', addPopupEditProfile);
closeButtonEdit.addEventListener('click', closePopupEditProfile);
formEditProfile.addEventListener('submit', submitFormEdit);
addButton.addEventListener('click', addPopupNewPlace);
closeButtonAdd.addEventListener('click', closePopupNewPlace);
formAddPlace.addEventListener('submit', addNewPlace);
closeButtonImage.addEventListener('click', closePopupImage);
popupEditProfile.addEventListener('click', closeClickOverlay);
popupNewPlace.addEventListener('click', closeClickOverlay);
popupOpenedImage.addEventListener('click', closeClickOverlay);




const showInputError = (inputSelector) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorClass.textContent = inputSelector.validationMessage;
  errorClass.classList.add('popup__error_visible');
};

const hideInputError = (inputSelector) => {
  const errorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  errorClass.classList.remove('popup__error_visible');
  errorClass.textContent = '';
};

const checkInputValidity = (inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(inputSelector);
  } else {
    hideInputError(inputSelector);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function activateButton(){
  submitButtonSelector.classList.remove('popup__btn-submit_inactive');
  submitButtonSelector.disabled = false;
}

function inactivateButton(){
  submitButtonSelector.classList.add('popup__btn-submit_inactive');
  submitButtonSelector.disabled = true;
};

function toggleButtonState() {
  if (hasInvalidInput()) {
    inactivateButton();
  } else {
    activateButton();
  }
}

const setEventListeners = () => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
  toggleButtonState()
  inputList.forEach((inputElement) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButtonState()
    });
  });
};



const enableValidation = () => {
  formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      inactivateButton();
    });
    setEventListeners();
};

const disableInputError =() => {
  inputList.forEach((inputSelector) => {
    hideInputError(inputSelector);
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});




