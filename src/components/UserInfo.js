export default class UserInfo {
  constructor({ profileName, profileJob, profileAvatar, _id }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._userId = _id;
  }

  getUserInfo() {
    const userInformation = {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    };
    return userInformation;
  }

  getUserAvatar() {
    const userAvatar = this._profileAvatar.src;
    return userAvatar;
  }

  getUserId() {
    const userId = this._userId;
    return userId;
  }

  setUserInfo(name, about, avatar, _id) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._userId = _id;
  }
}
