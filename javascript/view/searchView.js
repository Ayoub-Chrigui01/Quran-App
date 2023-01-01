class SearchView {
  parentElement = document.querySelector(".app__search");

  addHandler(handler) {
    this.parentElement.addEventListener("input", (e) => {
      handler(document.querySelector(".app__search").value);
    });
  }
}
export default new SearchView();
