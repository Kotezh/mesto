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


const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupNewPlace = document.querySelector('.popup_type_add-place');
const popupOpenedImage = document.querySelector('.popup_type_image');
const closeButtonEdit = document.querySelector('.popup__close_type_edit-profile');
const closeButtonAdd = document.querySelector('.popup__close_type_add-place');
const closeButtonImage = document.querySelector('.popup__close_type_image');
const editButton = document.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const likeButton = document.querySelectorAll('.heart');
const imageLink = document.querySelector('.element__image');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elementImage = document.querySelector('.element__image');
const elementImageCaption = document.querySelector('.element__title');

const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_job');
const placeNameInput = document.querySelector('.popup__field_place-name');
const placeLinkInput = document.querySelector('.popup__field_place-link');
const popupFullImage = document.querySelector('.popup__image');
const popupFullImageCaption = document.querySelector('.popup__image-caption');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddPlace = document.querySelector('.popup__form_type_add-place');

const trash = document.querySelector('.trash');
const elementsList = document.querySelector('.elements__list');


function addPopupEdit(evt){
  evt.preventDefault();
  popupEditProfile.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function removePopupEdit(evt){
  popupEditProfile.classList.remove('popup_opened');
}

function submitFormEdit(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopupEdit();
}

function addPopupNewPlace(evt){
  evt.preventDefault();
  popupNewPlace.classList.add('popup_opened');
}

function removePopupNewPlace(evt){
  popupNewPlace.classList.remove('popup_opened');
}

function removePlace(evt){
  evt.target.closest('.element').remove();
}

function toggleLike(evt){
  evt.target.classList.toggle('heart_active');
}

function removePopupImage(evt){
  popupOpenedImage.classList.remove('popup_opened');
}

function addOriginalPlaces(place){
    const placeTemplate = document.querySelector('#new-element').content;
    let element = placeTemplate.cloneNode(true);

    element.querySelector('.element__image').src = place.link;
    element.querySelector('.element__title').textContent = place.name;

    element.querySelector('.heart').addEventListener('click', toggleLike);
    element.querySelector('.trash').addEventListener('click', removePlace);
    element.querySelector('.element__popup').addEventListener('click', (evt) => {
      evt.preventDefault();
      popupOpenedImage.classList.add('popup_opened');
      popupFullImage.src = place.link;
      popupFullImageCaption.textContent = place.name;
    });
    elementsList.append(element); 
};

function render() {
	initialCards.forEach(addOriginalPlaces);
};

render();

function addNewPlace(evt){
    evt.preventDefault();
    
    const placeTemplate = document.querySelector('#new-element').content;
    let newElement = placeTemplate.cloneNode(true);
    
    newElement.querySelector('.element__image').src = placeLinkInput.value;
    newElement.querySelector('.element__title').textContent = placeNameInput.value;

    newElement.querySelector('.heart').addEventListener('click', toggleLike);
    newElement.querySelector('.trash').addEventListener('click', removePlace);
    newElement.querySelector('.element__popup').addEventListener('click', (evt) => {
      evt.preventDefault();
      popupOpenedImage.classList.add('popup_opened');
      popupFullImage.src = placeLinkInput.value;
      popupFullImageCaption.textContent = placeNameInput.value;
    });
    initialCards.unshift(newElement);
    elementsList.prepend(newElement); 
    
    removePopupNewPlace();
};

editButton.addEventListener('click', addPopupEdit);
closeButtonEdit.addEventListener('click', removePopupEdit);

popupEditProfile.addEventListener('click', (event) => {
  if(event.target === event.currentTarget){
    removePopupEdit();
  }
});

formEditProfile.addEventListener('submit', submitFormEdit);

addButton.addEventListener('click', addPopupNewPlace);
closeButtonAdd.addEventListener('click', removePopupNewPlace);

popupNewPlace.addEventListener('click', (event) => {
  if(event.target === event.currentTarget){
    removePopupNewPlace();
  }
});

formAddPlace.addEventListener('submit', addNewPlace);

closeButtonImage.addEventListener('click', removePopupImage);

popupOpenedImage.addEventListener('click', (event) => {
  if(event.target === event.currentTarget){
    removePopupImage();
  }
});



