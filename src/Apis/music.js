import axios from "../axios";

export const getApiCurSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getApiInfoSong = (sid) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infosong",
        method: "get",
        params: { id: sid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getApiDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "get",
        params: { id: pid },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const getSearch = (keywords) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/search",
        method: "get",
        params: { keyword: keywords },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const apiGetArtist = (artist) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        url: "/artist",
        method: "get",
        params: { name: artist },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const apiGetArtistSongs = (singerId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/artistsong",
        method: "get",
        params: {
          id: singerId,
          page: 1,
          count: 50,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
