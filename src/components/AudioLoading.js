import React from "react";
import { Audio } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function AudioLoading() {
  return (
      <Audio
        height="30"
        width="30"
        color="white"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
  );
}

export default AudioLoading;
