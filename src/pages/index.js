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
  avatarInput,
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
  const submitButton = document.querySelector(popup)
    .querySelector(".popup__btn-submit");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
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

const popupProfile = new PopupWithForm(popupEditProfile, () => {
  loading(popupEditProfile, true);
  const userData = {
    name: nameInput.value,
    about: jobInput.value,
  };
  api
    .setUserInfo(userData.name, userData.about)
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
const popupAvatar = new PopupWithForm(popupEditAvatar, () => {
  editAvatar.src = avatarInput.value;
  loading(popupEditAvatar, true);
  api
    .setNewAvatar(avatarInput.value)
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

const popupPlace = new PopupWithForm(popupAddNewPlace, (data) => {
  loading(popupAddNewPlace, true);
  api
    .addNewCard(data.name, data.link)
    .then((res) => {
      const card = new Card(
        res,
        userInfo.getUserId(),
        res._id,
        "#new-element",
        {
          handleCardClick: ({ name, link }) =>
            handleCardClick.open({ name, link }),
          handleLikeClick: () => {
            const likedCard = card.isLiked();
            const likedApi = likedCard
              ? api.deleteLike(card.getCardId())
              : api.addLike(card.getCardId());
            likedApi.then((data) => {
              card.setLikes(data.likes);
              card.renderLikes();
            });
          },
          handleDeleteIconClick: () => popupConfirm.open(card),
        }
      );
      const newElement = card.generateCard();
      defaultCardList.addItem(newElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupPlace.close();
      loading(popupAddNewPlace, false);
    });
});

// Удаление карточки

const delCard = (card) => {
  api
    .deleteCard(card.getCardId())
    .then(() => {
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

const popupConfirm = new PopupWithSubmit(popupTypeConfirm, (evt, card) => {
  evt.preventDefault();
  delCard(card);
});

//Карточки

let defaultCardList;

//Получение данных

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, initialCards]) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);
    defaultCardList = new Section(
      {
        items: initialCards,
        renderer: (place) => {
          const card = new Card(
            place,
            userInfo.getUserId(),
            place._id,
            "#new-element",
            {
              handleCardClick: ({ name, link }) =>
                handleCardClick.open({ name, link }),
              handleLikeClick: () => {
                const likedCard = card.isLiked();
                const likedApi = likedCard
                  ? api.deleteLike(card.getCardId())
                  : api.addLike(card.getCardId());
                likedApi.then((data) => {
                  card.setLikes(data.likes);
                  card.renderLikes();
                });
              },
              handleDeleteIconClick: () => {
                popupConfirm.open(card);
              },
            }
          );
          const newElement = card.generateCard();
          defaultCardList.setItems(newElement);
        },
      },
      ".elements__list"
    );
    defaultCardList.renderItems();
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
