let editButton = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');

function addPopup(evt){
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', addPopup);

function removePopup(evt){
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', removePopup);

popup.addEventListener('click', (event) => {
  if(event.target === event.currentTarget){
    removePopup();
  }
}
)

let form = document.querySelector('.popup__wrapper');

form.addEventListener('submit', function(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopup();
}
)