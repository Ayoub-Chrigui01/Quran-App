class SignupView {
  parentElement = document.querySelector(".panel--signup");

  show() {
    this.parentElement.classList.remove("hidden");
  }

  hide() {
    this.parentElement.classList.add("hidden");
  }

  addHandler(handler) {
    document.querySelector(".login-btn").addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  getData() {
    const name = this.parentElement.querySelector("#signup-name").value;
    const phone = this.parentElement.querySelector("#signup-phone").value;
    const email = this.parentElement.querySelector("#signup-email").value;
    const password = this.parentElement.querySelector("#signup-password").value;
    const confirm = this.parentElement.querySelector("#singup-confirm").value;

    if (name.trim().length === 0)
      throw new Error("Name is not correct. Please try again!");

    if (confirm !== password) {
      this.parentElement.querySelector("#singup-confirm").value = "";
      throw new Error("Confirmed password is not correct");
    }
    return {
      name: name.trim(),
      phone: phone,
      email: email,
      password: password,
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
    document.querySelector(".signup-reset").click();
  }

  fade() {
    this.parentElement.classList.add("fade");
  }
}

export default new SignupView();
