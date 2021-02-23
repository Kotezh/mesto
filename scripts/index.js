import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validateSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const ESC_KEYCODE = 27;
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupNewPlace = document.querySelector(".popup_type_add-place");
export const popupOpenedImage = document.querySelector(".popup_type_image");
const closeButtonEdit = document.querySelector(
  ".popup__close_type_edit-profile"
);
const closeButtonAdd = document.querySelector(".popup__close_type_add-place");
const closeButtonImage = document.querySelector(".popup__close_type_image");
const editButton = document.querySelector(".profile__btn-edit");
const addButton = document.querySelector(".profile__btn-add");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeNameInput = document.querySelector(".popup__input_type_place-name");
const placeLinkInput = document.querySelector(".popup__input_type_place-link");
export const popupFullImage = document.querySelector(".popup__image");
export const popupFullImageCaption = document.querySelector(
  ".popup__image-caption"
);
const formEditProfile = document.querySelector(
  ".popup__form_type_edit-profile"
);
const formAddPlace = document.querySelector(".popup__form_type_add-place");
const elementsList = document.querySelector(".elements__list");
const submitButton = popupNewPlace.querySelector(".popup__btn-submit");
const formsList = document.querySelectorAll(".popup__form");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeEsc);
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

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeEsc);
}

function openPopupEditProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupEditProfile);
}

function submitFormEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function closeClickOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function closeEsc(evt) {
  const key = evt.keyCode;
  if (key === ESC_KEYCODE) {
    closePopup(document.querySelector(".popup_opened"));
  }
}

initialCards.forEach((item) => {
  const card = new Card(item, "#new-element");
  const place = card.generateCard();
  elementsList.append(place);
});

function addNewPlace(evt) {
  evt.preventDefault();
  const data = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const newElement = new Card(data, "#new-element");
  const newPlace = newElement.generateCard();
  elementsList.prepend(newPlace);
  closePopupNewPlace();
}

formsList.forEach((formElement) => {
  const formValidator = new FormValidator(validateSettings, formElement);
  formValidator.enableValidation();
});

editButton.addEventListener("click", openPopupEditProfile);
closeButtonEdit.addEventListener("click", closePopupEditProfile);
formEditProfile.addEventListener("submit", submitFormEdit);

addButton.addEventListener("click", () => {
  openPopup(popupNewPlace);
  formAddPlace.reset();
  submitButton.disabled = true;
  submitButton.classList.add(validateSettings.inactiveButtonClass);
});

closeButtonAdd.addEventListener("click", closePopupNewPlace);
closeButtonImage.addEventListener("click", closePopupImage);
popupEditProfile.addEventListener("mouseup", closeClickOverlay);
popupNewPlace.addEventListener("mouseup", closeClickOverlay);
popupOpenedImage.addEventListener("mouseup", closeClickOverlay);
formAddPlace.addEventListener("submit", addNewPlace);
