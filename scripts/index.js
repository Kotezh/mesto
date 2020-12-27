let editButton = document.querySelector('.profile__btn-edit');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

let nameInput = document.querySelector('.popup__field_name');
let jobInput = document.querySelector('.popup__field_job');

let form = document.querySelector('.popup__wrapper');

function addPopup(evt){
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function removePopup(evt){
  popup.classList.remove('popup_opened');
}

function submitForm(evt){
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  removePopup();
}

editButton.addEventListener('click', addPopup);
closeButton.addEventListener('click', removePopup);

popup.addEventListener('click', (event) => {
  if(event.target === event.currentTarget){
    removePopup();
  }
})

form.addEventListener('submit', submitForm);