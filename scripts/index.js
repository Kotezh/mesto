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
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const placeNameInput = document.querySelector('.popup__field_place-name');
const placeLinkInput = document.querySelector('.popup__field_place-link');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageCaption = document.querySelector('.popup__image-caption');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPlace = document.querySelector('.popup__form_type_add-place');
const elementsList = document.querySelector('.elements__list');


function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function closePopupEditProfile(evt){
  closePopup(popupEditProfile);
}

function closePopupNewPlace(evt){
  closePopup(popupNewPlace);
}

function closePopupImage(evt){
  closePopup(popupOpenedImage);
}

function addPopup(popup){
  popup.classList.add('popup_opened');
}

function addPopupEditProfile(evt){
  evt.preventDefault();
  addPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function addPopupNewPlace(evt){
  evt.preventDefault();
  addPopup(popupNewPlace);
}

function submitFormEdit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function removePlace(evt){
  evt.target.closest('.element').remove();
}

function toggleLike(evt){
  evt.target.classList.toggle('heart_active');
}

function clickOverlay(event) {
    if(event.target === event.currentTarget){
      closePopup(event.currentTarget);
    }
}

function createElement(place){
  const placeTemplate = document.querySelector('#new-element').content;
  let element = placeTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  elementImage.src = place.link;
  elementImage.alt = place.name;
  element.querySelector('.element__title').textContent = place.name;
  element.querySelector('.heart').addEventListener('click', toggleLike);
  element.querySelector('.trash').addEventListener('click', removePlace);

  element.querySelector('.element__popup').addEventListener('click', (evt) => {
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

function addNewPlace(evt){
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
popupEditProfile.addEventListener('click', clickOverlay);
popupNewPlace.addEventListener('click', clickOverlay);
popupOpenedImage.addEventListener('click', clickOverlay);

