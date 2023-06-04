import axios from "../axios";

export const getHome = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "home",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const chartHome = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: "/charthome",
        method: "get",
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
