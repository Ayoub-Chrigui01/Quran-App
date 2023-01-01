class ReadView {
  parentElement = document.querySelector(".app__read");

  render(data) {
    const arabic = "٠١٢٣٤٥٦٧٨٩";
    const surahName = data.name;
    document.querySelector(".app__read__title").textContent = surahName;

    this.parentElement.querySelector(".first-ayah").style.display =
      data.number === 9 ? "none" : "block";

    data.ayahs[0].text =
      data.number !== 9 ? data.ayahs[0].text.slice(38) : data.ayahs[0].text;

    data.number === 1 && data.ayahs.shift();

    document.querySelector("#ayah-finish").value = data.ayahsNumber;

    document.querySelector(".app__read__surah").textContent = "";
    data.ayahs.forEach((ayah) => {
      const number = String(ayah.numberInSurah)
        .split("")
        .map((n) => arabic[n])
        .join("");
      const ayahText = `﴾${ayah.text} ﴿${number}`;
      document.querySelector(".app__read__surah").insertAdjacentHTML(
        "beforeend",
        `
        <span class="t${ayah.numberInSurah}">${ayah.text}</span><span> ﴿${number}﴾</span
      `
      );
    });
  }

  updateActiveAyah(number) {
    this.parentElement.querySelector(".active")?.classList.remove("active");
    this.parentElement.querySelector(`.t${number}`)?.classList.add("active");
    this.parentElement.querySelector(".active")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  removeActiveAyah() {
    this.parentElement.querySelector(".active")?.classList.remove("active");
  }
}

export default new ReadView();
