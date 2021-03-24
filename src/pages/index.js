import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import {
  validateSettings,
  editButton,
  addButton,
  nameInput,
  jobInput,
  formEditProfile,
  formAddPlace,
  formEditAvatar,
  editAvatar,
  popupEditProfile,
  popupAddNewPlace,
  popupEditAvatar,
  popupTypeConfirm,
} from "../utils/constants.js";
import Api from "../components/Api.js";

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-21",
  headers: {
    authorization: "d8273a5f-78fb-4b97-a734-1bffa72aa238",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

function loading(popup, isLoading) {
  const submitButton = document
    .querySelector(popup)
    .querySelector(".popup__btn-submit");
  if (isLoading) {
    submitButton.value = "Сохранение...";
  } else {
    submitButton.value = "Сохранить";
  }
}

//Профиль пользователя
const userInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__job",
  profileAvatar: ".profile__avatar",
});

const getInfo = () => {
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
};

const popupProfile = new PopupWithForm(popupEditProfile, (data) => {
  loading(popupEditProfile, true);
  api
    .setUserInfo({ name: data.name, about: data.about })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.close();
      loading(popupEditProfile, false);
    });
});

//Смена аватара
const popupAvatar = new PopupWithForm(popupEditAvatar, (data) => {
  loading(popupEditAvatar, true);
  api
    .setNewAvatar({ avatar: data.avatar })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.close();
      loading(popupEditAvatar, false);
    });
});

//Новое место

const createPlace = function (data) {
  return new Card(
    data,
    userInfo.getUserId(),
    data._id,
    "#new-element",
    ({ name, link }) => handleCardClick.open({ name, link }),
    (id, confirmDel) => popupConfirm.open(id, confirmDel),
    (id) => api.addLike(id)
  ).generateCard();
};

const popupPlace = new PopupWithForm(popupAddNewPlace, (data) => {
  loading(popupAddNewPlace, true);
  api
    .addNewCard({ name: data.name, link: data.link })
    .then((res) => {
      const card = createPlace(res);
      defaultCardList.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.close();
      loading(popupEditAvatar, false);
    });
    popupPlace.close();
  loading(popupAddNewPlace, false);
});

// Удаление карточки

const delCard = (card) => {
  api
    .deleteCard(card.getCardId())
    .then((card) => {
      card.removePlace();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupConfirm.close();
    });
};

//Подтверждение удаления

const popupConfirm = new PopupWithSubmit(popupTypeConfirm, (card) => {
  delCard(card);
});

popupConfirm.setEventListeners();

//Карточки

let defaultCardList;

//Получение данных

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, data]) => {
    defaultCardList = new Section(
      {
        items: initialCards,
        renderer: (place) => {
          const card = createPlace(place);
          defaultCardList.setItems(card);
        },
      },
      ".elements__list"
    );
    defaultCardList.renderItems();
    //defaultCardList.addItem(user);
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    console.log();
  })
  .catch((err) => {
    console.log(err);
  });

//Валидация

const editFormValidator = new FormValidator(validateSettings, formEditProfile);
const addFormValidator = new FormValidator(validateSettings, formAddPlace);
const editAvatarFormValidator = new FormValidator(
  validateSettings,
  formEditAvatar
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

//Попап открытия картинки

const handleCardClick = new PopupWithImage(".popup_type_image");
handleCardClick.setEventListeners();

//Открытие попапов

editButton.addEventListener("click", () => {
  popupProfile.open();
  getInfo();
  editFormValidator.clearValidation();
});

addButton.addEventListener("click", function () {
  popupPlace.open();
  addFormValidator.clearValidation();
});

editAvatar.addEventListener("click", function () {
  popupAvatar.open();
  editAvatarFormValidator.clearValidation();
});

/*const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (place) => {
      const card = createPlace(place);
      defaultCardList.setItems(card);
    },
  },
  ".elements__list"
);
defaultCardList.renderItems();
*/
