class SidebarView {
  parentElement = document.querySelector(".main__sidebar");

  update(className) {
    this.parentElement.querySelector(".active").classList.remove("active");
    this.parentElement.querySelector(`.${className}`).classList.add("active");
  }

  addHandlerLogout(handler) {
    this.parentElement
      .querySelector(".logout-button")
      .addEventListener("click", (e) => {
        handler();
      });
  }

  addHandlerBookmarks(handler) {
    this.parentElement
      .querySelector(".bookmark-button")
      .addEventListener("click", (e) => {
        handler();
      });
  }

  addHandlerHome(handler) {
    this.parentElement
      .querySelector(".home-button")
      .addEventListener("click", (e) => {
        handler();
      });
  }
}

export default new SidebarView();
