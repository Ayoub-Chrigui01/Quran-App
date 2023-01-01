export const getJSON = async function (url, option = {}) {
  try {
    let data;
    if (option === {}) {
      data = await fetch(url);
    } else {
      data = await fetch(url, option);
    }
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const sortSurahs = function (type, arr) {
  const newarr = arr.map((a) => a);
  if (+type === 1) {
    newarr.sort((a, b) => (a.englishName > b.englishName ? 1 : -1));
  }
  if (+type === 3) {
    newarr.sort((b, a) => a.ayahsNumber - b.ayahsNumber);
  }
  return newarr;
};
