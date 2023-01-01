// import heartOutline from "url:../../Content/icons/heartOutline.svg";
const heart = new URL("../../Content/icons/heart.svg", import.meta.url);
const heartOutline = new URL(
  "../../Content/icons/heart-outline.svg",
  import.meta.url
);
// import heart from "url:../../Content/icons/heart.svg";

class ResultsView {
  parentElement = document.querySelector(".surah__cards");

  clear() {
    this.parentElement.innerHTML = "";
  }

  render(data, bookmarks) {
    this.clear();
    data.forEach((surah) => {
      const conidtion = bookmarks.includes(surah._id);
      this.parentElement.insertAdjacentHTML(
        "beforeend",
        `
          <div class="surah__card" data-id="${surah._id}">
            <div class="surah__card__top">
              <span class="surah__card__number">${surah.number}</span>
              <img
                class="surah__card__bookmark"
                src="${conidtion ? heart : heartOutline}"
                alt="icon of heart"
              />
            </div>
            <div class="surah__card__bottom">
              <div class="surah__left">
                <span class="surah__title--english">${surah.englishName}</span>
                <span class="surah__title--meaning">${
                  surah.englishNameTranslation
                }</span>
              </div>
              <div class="surah__right">
                <span class="surah__title--arabic"
                  >${surah.name}</span
                >
                <span class="surah__ayahs">${surah.ayahsNumber} Ayahs</span>
              </div>
            </div>
          </div>
      `
      );
    });
  }

  addHandler(handler1, handler2) {
    this.parentElement.addEventListener("click", (e) => {
      const card = e.target.closest(".surah__card");
      if (!card) return;

      const id = card.dataset.id;
      if (e.target.classList.contains("surah__card__bookmark")) {
        handler1(id);
        return;
      }

      const number = card.querySelector(".surah__card__number").textContent;

      handler2(number);
    });
  }
}
export default new ResultsView();
