import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

axios.interceptors.request.use(
  (config) => {
    //do something
    return config;
  },
  (error) => {
    //do something
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  // do simething
  (response) => {
    //do something
    return response;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

export default instance
