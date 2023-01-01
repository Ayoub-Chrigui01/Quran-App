class LoginView {
  parentElement = document.querySelector(".panel--login");

  show() {
    this.parentElement.classList.remove("hidden");
  }

  hide() {
    this.parentElement.classList.add("hidden");
  }

  addHandler(handler) {
    document.querySelector(".signup-btn").addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  getData() {
    const email = this.parentElement.querySelector("#login-email").value;
    const password = this.parentElement.querySelector("#login-password").value;
    const rememberMe =
      this.parentElement.querySelector("#login-rememberMe").checked;

    return {
      email: email,
      password: password,
      rememberMe: rememberMe,
    };
  }

  addHandlerSubmit(handler) {
    this.parentElement
      .querySelector(".panel__form")
      .addEventListener("submit", (e) => {
        // e.preventDefault();
        handler();
      });
  }

  reset() {
    document.querySelector(".login-reset").click();
  }

  fade() {
    this.parentElement.classList.add("fade");
  }
}

export default new LoginView();
