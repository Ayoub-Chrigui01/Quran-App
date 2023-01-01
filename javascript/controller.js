import { abdul } from "./timeStamps/app";

import * as model from "./model";
import loginView from "./view/loginView";
import signupView from "./view/signupView";
import notifications from "./view/notificationsView";
import appView from "./view/appView";
import sortView from "./view/sortView";
import resultsView from "./view/resultsView";
import searchView from "./view/searchView";
import sidebarView from "./view/sidebarView";
import bookmarkView from "./view/bookmarkView";
import panelView from "./view/panelView";
import readView from "./view/readView";
import menuView from "./view/menuView";

import { sortSurahs } from "./helper";

// auto Login
{
  if (localStorage.getItem("token")) {
    const auto = async function () {
      notifications.showSpinner();
      notifications.showSucces(
        "You have Successfully logged in. You will be redirected soon!"
      );
      model.state.token = localStorage.getItem("token");
      const profileInfo = await model.profile();
      const allSurahs = await model.getAll();
      await model.getBookmarks();
      appView.init(profileInfo, allSurahs, model.state.bookmarks);
      loginView.fade();
      notifications.hideSpinner();
      loginView.hide();
      appView.show();
      menuView.showMenuButton();
    };
    auto();
  }
}

// Log In Section
const switchSignup = function () {
  loginView.hide();
  signupView.show();
};
loginView.addHandler(switchSignup);

const loginControl = async function () {
  try {
    notifications.showSpinner();
    const data = await model.login(loginView.getData());
    model.state.token = data.token;
    const profileInfo = await model.profile();
    const allSurahs = await model.getAll();
    await model.getBookmarks();
    appView.init(profileInfo, allSurahs, model.state.bookmarks);
    loginView.reset();
    loginView.fade();
    notifications.showSucces("You have Successfully logged in");
    notifications.hideSpinner();
    loginView.hide();
    appView.show();
    menuView.showMenuButton();
  } catch (error) {
    notifications.hideSpinner();
    notifications.showError(
      String(error.message + `  Please try again.`).slice(6)
    );
  }
};

loginView.addHandlerSubmit(loginControl);

// Sign Up Section
const switchLogin = function () {
  signupView.hide();
  loginView.show();
};
signupView.addHandler(switchLogin);

const signupControl = async function () {
  try {
    notifications.showSpinner();
    const data = await model.signup(signupView.getData());
    if (data.status !== "success") throw new Error(data.message);
    model.state.token = data.token;
    const profileInfo = await model.profile();
    const allSurahs = await model.getAll();
    await model.getBookmarks();
    appView.init(profileInfo, allSurahs, model.state.bookmarks);
    signupView.reset();
    signupView.fade();
    notifications.showSucces(
      "Account created successfully. redirecting to panel ..."
    );
    signupView.hide();
    notifications.hideSpinner();
    appView.show();
    menuView.showMenuButton();
  } catch (error) {
    notifications.hideSpinner();
    notifications.showError(error);
  }
};

signupView.addHandlerSubmit(signupControl);

////////////////////////////////////
//////       APP SECTION     ///////
////////////////////////////////////

// sort functionality
const controlSort = function (type) {
  sortView.update(type);
  const arrSorted = sortSurahs(type, model.state.currentResults);
  resultsView.render(arrSorted, model.state.bookmarks);
};

sortView.addHandler(controlSort);

// search functionality
const controlSearch = function (value) {
  if (value === "") resultsView.render(model.state.all, model.state.bookmarks);

  const searchArr = model.state.all.filter((surah) =>
    surah.englishName.toUpperCase().includes(value.toUpperCase())
  );

  model.state.currentResults = searchArr;
  resultsView.render(searchArr, model.state.bookmarks);
};

searchView.addHandler(controlSearch);

// Logout Functionality
const controlLogout = function () {
  sidebarView.update("logout-button");
  localStorage.clear();
  location.reload();
};

sidebarView.addHandlerLogout(controlLogout);

// Bookmark Fonctionality
const controlBookmark = function (id) {
  if (model.state.bookmarks.includes(id)) {
    bookmarkView.updateIcon(id, "remove");
    const index = model.state.bookmarks.indexOf(id);
    model.state.bookmarks.splice(index, 1);
    model.removeBookmark(id);
  } else {
    bookmarkView.updateIcon(id, "add");
    model.state.bookmarks.push(id);
    model.addBookmark(id);
  }
};
// resultsView.addHandler(controlBookmark, () => {});

const controlBookmarkView = function () {
  model.state.currentResults = model.state.all.filter((surah) =>
    model.state.bookmarks.includes(surah._id)
  );
  sidebarView.update("bookmark-button");
  resultsView.render(model.state.currentResults, model.state.bookmarks);
};

sidebarView.addHandlerBookmarks(controlBookmarkView);

// Home Functionality
const controlHome = function () {
  model.state.currentResults = model.state.all;
  sidebarView.update("home-button");
  resultsView.render(model.state.all, model.state.bookmarks);
  appView.normalMode();
  document.querySelector(".app__read__title").textContent = "";
};

sidebarView.addHandlerHome(controlHome);

////////////////////////////////////
//////      READ SECTION     ///////
////////////////////////////////////

// transition to small mode
const controlRead = async function (number) {
  notifications.showSpinner();
  await model.getSurah(number);
  notifications.hideSpinner();
  appView.smallMode();
  readView.render(model.state.currentSurah);
  appView.hideAudio();
  appView.audioPause();
};

// changing settings when listen type changes
const controlType = function (value) {
  if (value === "All") {
    appView.hideSettingSurah();
    panelView.loadAllReaders();
  } else {
    appView.showSettingsSurah();
    panelView.loadTimeReaders();
  }
};
panelView.addHandlerType(controlType);

// Playing sound when pressed for
const controlPlaySurah = function (id, type) {
  // tracking current ayah
  const audio = document.querySelector("audio");
  const track = function () {
    // checking if audio is playing
    if (audio.paused) return;

    const currentTime = Math.trunc(audio.currentTime * 1000);
    const timeArray = abdul[model.state.currentSurah.number - 1];

    let currentAyah;
    for (let i = 0; i < timeArray.length; i++) {
      if (timeArray[i] > currentTime) {
        if (document.querySelector("#input--listen-type").value === "All") {
          readView.removeActiveAyah();
          return;
        }
        currentAyah = i;
        readView.updateActiveAyah(
          model.state.currentSurah.number === 9 ? currentAyah + 1 : currentAyah
        );
        setTimeout(track, timeArray[i] - currentTime);
        break;
      }
    }
  };

  // Data validation for start and finish ayahs
  const start = document.querySelector("#ayah-start").value;
  const finish = document.querySelector("#ayah-finish").value;
  if (type === "By") {
    if (
      start < 1 ||
      start > model.state.currentSurah.ayahsNumber ||
      finish > model.state.currentSurah.ayahsNumber ||
      finish < 1
    ) {
      notifications.showError("Please verify start and finish numbers !");
      return;
    }
  }

  notifications.showSpinner();
  appView.setAudio(
    `https://cdn.islamic.network/quran/audio-surah/128/${id}/${model.state.currentSurah.number}.mp3`
  );
  appView.showAudio();
  appView.audioPlay();
  document.querySelector(".control-close").click();
  if (+start !== 1)
    audio.currentTime = Number(
      abdul[model.state.currentSurah.number - 1][start - 1] / 1000
    );
  appView.addHandlerAudioPlay(() => {
    notifications.hideSpinner();
    if (type === "By") track();
  });
};

panelView.addHandlerPlay(controlPlaySurah);

resultsView.addHandler(controlBookmark, controlRead);

////////////////////////////////////
//////   CONTROL SECTION     ///////
////////////////////////////////////

panelView.addListenerRange();
panelView.addListenerColor();
panelView.addListenerReset();

////////////////////////////////////
//////   MOBILE SECTION      ///////
////////////////////////////////////

menuView.addListnerMenuClose();
menuView.addListnerMenuOpen();
menuView.addListnerControlClose();
menuView.addListnerControlOpen();
