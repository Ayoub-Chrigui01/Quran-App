class ProfileView {
  parentElement = document.querySelector(".app__profile");

  render(data) {
    const name = this.parentElement.querySelector(".profile__name");
    const email = this.parentElement.querySelector(".profile__email");

    name.textContent = data.name;
    email.textContent = data.email;
  }
}
export default new ProfileView();
