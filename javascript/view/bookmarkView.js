// import heartOutline from "url:../../Content/icons/heartOutline.svg";
const heart = new URL("../../Content/icons/heart.svg", import.meta.url);
const heartOutline = new URL(
  "../../Content/icons/heart-outline.svg",
  import.meta.url
);

class BookmarkView {
  updateIcon(id, type) {
    const card = document.querySelector(`.surah__card[data-id="${id}"]`);

    if (type === "add") {
      card.querySelector(".surah__card__bookmark").setAttribute("src", heart);
    }

    if (type === "remove") {
      card
        .querySelector(".surah__card__bookmark")
        .setAttribute("src", heartOutline);
    }
  }
}
export default new BookmarkView();
