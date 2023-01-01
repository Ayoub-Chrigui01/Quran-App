import { NOTIF_TIME } from "../config";
class Notification {
  parentElement = document.querySelector("body");

  showSpinner() {
    document.querySelector(".loadingSpinner").classList.add("show");
  }
  hideSpinner() {
    document.querySelector(".loadingSpinner").classList.remove("show");
  }

  async showSucces(text, timer = NOTIF_TIME) {
    document.querySelector(".succes__text").textContent = text;
    document.querySelector(".succes").classList.add("show");

    let countdown = 900;
    const promise = async function (resolve) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          countdown -= 1;
          document.querySelector(".succes__timer").style.width = `${
            countdown / 10
          }%`;
          if (countdown === 0) {
            document.querySelector(".succes").classList.remove("show");
            clearInterval(interval);
            resolve();
          }
        }, timer);
      });
    };
    await promise();
  }

  showError(text, timer = NOTIF_TIME) {
    document.querySelector(".error__text").textContent = text;
    document.querySelector(".error").classList.add("show");

    let countdown = 900;
    const interval = setInterval(() => {
      countdown -= 1;
      document.querySelector(".error__timer").style.width = `${
        countdown / 10
      }%`;
      if (countdown === 0) {
        document.querySelector(".error").classList.remove("show");
        clearInterval(interval);
      }
    }, timer);
  }
}

export default new Notification();
