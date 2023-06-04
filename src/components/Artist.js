import React from "react";
import icon from "../Utils/icon";
import * as fcsSupport from "../Utils/fcSupported";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const { AiOutlineUserAdd } = icon;
const Artist = ({ artist }) => {
  const navigate = useNavigate();
  const imgRef = useRef();

  const handleHoverImage = () => {
    imgRef.current.classList.remove("animate-scale-up-center");
    imgRef.current.classList.add("animate-scale-up-image");
  };
  const handleLeaveImage = () => {
    imgRef.current.classList.remove("animate-scale-up-image");
    imgRef.current.classList.add("animate-scale-up-center");
  };

  const handleClickSinger = (alias) => {
    const path = `/ca-si/${alias}`;
    navigate(path);
  };
  return (
    <div className="px-3">
      <div
        className="w-full rounded-full overflow-hidden transition-all delay-75"
        onMouseEnter={handleHoverImage}
        onMouseLeave={handleLeaveImage}
        onClick={() => handleClickSinger(artist.alias)}
      >
        <img
          className="w-full aspect-square rounded-full cursor-pointer"
          ref={imgRef}
          src={
            artist.thumbnailM ||
            artist.thumbnail ||
            "https://vuaoto.com/wp-content/uploads/2018/02/mec-A-class-2019.jpg"
          }
          alt="avatar artist"
        />
      </div>
      <div className="text-center mt-[15px]">
        <h4
          className="text-[16px] cursor-pointer font-bold hover:text-main-500 hover:underline transition-all whitespace-nowrap overflow-hidden text-ellipsis"
          onClick={() => handleClickSinger(artist.alias)}
        >
          {artist.name || "No Name"}
        </h4>
        <span className="text-[13px] text-white-300 font-bold">
          {fcsSupport.ConvertFollow(artist.totalFollow)} quan tâm
        </span>
      </div>
      <div className="flex justify-center mt-[15px]">
        <button
          className=" hover:opacity-70 flex cursor-pointer transition-all items-center justify-center gap-2 py-[6px] px-[18px] bg-main-500 rounded-2xl"
          onClick={() => handleClickSinger(artist.alias)}
        >
          <span>
            <AiOutlineUserAdd size={18}></AiOutlineUserAdd>
          </span>
          <span className="uppercase text-[13px] font-semibold">Quan tâm</span>
        </button>
      </div>
    </div>
  );
};

export default Artist;
