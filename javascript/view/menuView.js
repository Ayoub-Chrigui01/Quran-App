class MenuView {
  addListnerMenuClose() {
    document.querySelector(".close-button").addEventListener("click", (e) => {
      document.querySelector(".main__sidebar").classList.remove("show");
      setTimeout(() => {
        document.querySelector(".menu-button").style.display = "block";
      }, 400);
    });
  }
  addListnerMenuOpen() {
    document.querySelector(".menu-button").addEventListener("click", (e) => {
      document.querySelector(".main__sidebar").classList.add("show");
      document.querySelector(".menu-button").style.display = "none";
    });
  }

  showMenuButton() {
    if (window.matchMedia("(max-width:900px)").matches) {
      document.querySelector(".menu-button").style.display = "block";
    }
  }

  addListnerControlOpen() {
    document.querySelector(".control-open").addEventListener("click", (e) => {
      document.querySelector(".app__control").classList.add("show");
      document.querySelector(".control-open").style.display = "none";
    });
  }

  addListnerControlClose() {
    document.querySelector(".control-close").addEventListener("click", (e) => {
      if (window.matchMedia("(max-width:900px)").matches) {
        document.querySelector(".app__control").classList.remove("show");
        setTimeout(() => {
          document.querySelector(".control-open").style.display = "block";
        }, 400);
      }
    });
  }
}

export default new MenuView();
