import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  validateSettings,
  editButton,
  addButton,
  nameInput,
  jobInput,
  formEditProfile,
  formAddPlace,
} from "../utils/constants.js";
import { initialCards } from "../utils/initial-cards.js";

const editFormValidator = new FormValidator(validateSettings, formEditProfile);
const addFormValidator = new FormValidator(validateSettings, formAddPlace);

const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__job",
});

const handleCardClick = new PopupWithImage(".popup_type_image");

const addPlace = function (data) {
  const place = new Card(data, "#new-element", ({ name, link }) =>
    handleCardClick.open({ name, link })
  ).generateCard();
  return place;
};

const getInfo = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
};

const popupProfile = new PopupWithForm(".popup_type_edit-profile", (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});

const popupPlace = new PopupWithForm(".popup_type_add-place", (place) => {
  defaultCardList.addItem(addPlace(place));
  popupPlace.close();
});

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (place) => {
      defaultCardList.setItems(addPlace(place));
    },
  },
  ".elements__list"
);

defaultCardList.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

handleCardClick.setEventListeners();

editButton.addEventListener("click", () => {
  editFormValidator.clearValidation();
  popupProfile.open();
  getInfo();
});

addButton.addEventListener("click", () => {
  addFormValidator.clearValidation();
  popupPlace.open();
  formAddPlace.reset();
});
