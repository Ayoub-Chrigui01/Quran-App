class SortView {
  parentElement = document.querySelector(".sort-container");

  addHandler(handler) {
    this.parentElement.addEventListener("click", (e) => {
      const sortElement = e.target.closest(".sort__card");

      if (!sortElement) return;

      const type = sortElement.dataset.number;
      handler(type);
    });
  }

  update(type) {
    this.parentElement.querySelector(".active").classList.remove("active");
    this.parentElement
      .querySelectorAll(".sort__card")
      [+type - 1].classList.add("active");
  }
}
export default new SortView();
