import profileView from "./profileView";
import resultsView from "./resultsView";

class AppView {
  parentElement = document.querySelector(".app");

  show() {
    this.parentElement.classList.add("active");
  }

  smallMode() {
    document.querySelector("body").classList.add("small");
    document.querySelector(".app__container").classList.add("small");
    document.querySelector(".app__main").classList.add("small");
    document.querySelector(".app__profile").classList.add("hidden");
    document.querySelector(".app__read").classList.remove("hidden");
    document.querySelector(".app__control").classList.remove("hidden");
  }

  normalMode() {
    document.querySelector("body").classList.remove("small");
    document.querySelector(".app__container").classList.remove("small");
    document.querySelector(".app__main").classList.remove("small");
    document.querySelector(".app__profile").classList.remove("hidden");
    document.querySelector(".app__read").classList.add("hidden");
    document.querySelector(".app__control").classList.add("hidden");
  }

  init(profile, surahs, bookmarks) {
    profileView.render(profile);
    resultsView.render(surahs, bookmarks);
  }

  showAudio() {
    document.querySelector("audio").classList.add("active");
  }

  hideAudio() {
    document.querySelector("audio").classList.remove("active");
  }

  setAudio(url) {
    document.querySelector("audio").setAttribute("src", url);
  }

  audioPlay() {
    document.querySelector("audio").play();
  }

  audioPause() {
    document.querySelector("audio").pause();
  }

  addHandlerAudioPlay(handler) {
    document.querySelector("audio").addEventListener("playing", (e) => {
      handler();
    });
  }

  hideSettingSurah() {
    document.querySelector(".start-finish").classList.add("hidden");
    document.querySelector(".repeat-ayah").classList.add("hidden");
  }

  showSettingsSurah() {
    document.querySelector(".start-finish").classList.remove("hidden");
    document.querySelector(".repeat-ayah").classList.remove("hidden");
  }
}
export default new AppView();
