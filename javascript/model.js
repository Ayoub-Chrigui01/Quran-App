import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  token: "",
};

export const login = async function (data) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await getJSON(`${API_URL}v1/user/login`, requestOptions);

    if (res.status) {
      if (data.rememberMe) localStorage.setItem("token", res.token);
      return res;
    }
    throw new Error(res.message);
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async function (data) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const res = await getJSON(`${API_URL}v1/user/signup`, requestOptions);

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const profile = async function () {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await getJSON(`${API_URL}v1/user/me`, requestOptions);

  return res.data.user;
};

export const getAll = async function () {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await getJSON(`${API_URL}v1/quran`, requestOptions);

  state.all = res.data;
  state.currentResults = state.all;
  return res.data;
};

export const getBookmarks = async function () {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await getJSON(`${API_URL}v1/quran/bookmark`, requestOptions);
  state.bookmarks = res.data.map((m) => m.surahID);
};

export const addBookmark = async function (id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    surahId: id,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await getJSON(`${API_URL}v1/quran/bookmark`, requestOptions);
};

export const removeBookmark = async function (id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await getJSON(
    `${API_URL}v1/quran/bookmark/${id}`,
    requestOptions
  );
};

export const getSurah = async function (id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${state.token}`);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await getJSON(`${API_URL}v1/quran?surah=${id}`, requestOptions);
  state.currentSurah = res.data;
};
