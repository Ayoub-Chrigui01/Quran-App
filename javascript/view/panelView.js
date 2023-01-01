import { arr } from "../readers";
import { arr2 } from "../timeReaders";

class PanelView {
  parentElement = document.querySelector(".app__control");

  addListenerRange() {
    document
      .querySelector("#inptut--font-size")
      .addEventListener("input", (e) => {
        const value = e.target.value;
        document.querySelector(".app__read__surah").style.fontSize = `${
          (value / 100 + 0.1) * 3
        }rem`;
      });
  }

  addListenerColor() {
    document
      .querySelector("#input--font-color")
      .addEventListener("input", (e) => {
        document.querySelector(".app__read__surah").style.color =
          e.target.value;
      });
  }

  addListenerReset() {
    document.querySelector(".reset-button").addEventListener("click", (e) => {
      document.querySelector("#inptut--font-size").value = 60;
      document.querySelector(".app__read__surah").style.fontSize = "2.25rem";
      document.querySelector("#input--font-color").value = "#7e7e7e";
      document.querySelector(".app__read__surah").style.color = "#7e7e7e";
    });
  }

  addHandlerPlay(handler) {
    document.querySelector(".play-button").addEventListener("click", (e) => {
      const id = document.querySelector("#input-reader").value;
      const type = document.querySelector("#input--listen-type").value;
      handler(id, type);
    });
  }

  addHandlerType(handler) {
    document
      .querySelector("#input--listen-type")
      .addEventListener("input", (e) => {
        handler(e.target.value);
      });
  }

  loadAllReaders() {
    document.querySelector("#input-reader").innerHTML = "";
    arr.forEach((r) => {
      document.querySelector("#input-reader").insertAdjacentHTML(
        "beforeend",
        `
        <option value="${r.identifier}">${r.englishName}</option>
      `
      );
    });
  }

  loadTimeReaders() {
    document.querySelector("#input-reader").innerHTML = "";
    arr2.forEach((r) => {
      document.querySelector("#input-reader").insertAdjacentHTML(
        "beforeend",
        `
        <option value="${r.identifier}">${r.englishName}</option>
      `
      );
    });
  }
}

export default new PanelView();

// initilizing select options for listening by surah
document.querySelector("#input-reader").innerHTML = "";
arr.forEach((r) => {
  document.querySelector("#input-reader").insertAdjacentHTML(
    "beforeend",
    `
    <option value="${r.identifier}">${r.englishName}</option>
  `
  );
});
