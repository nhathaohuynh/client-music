import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurSongID, isPlaySong } from "../store/Action";

const SongItem = ({
  thumbnail,
  title,
  artistsNames,
  releaseDate,
  encodeId,
  percents,
  older,
  sm,
  custom,
}) => {
  const dispatch = useDispatch();
  const handleClickSongItem = () => {
    if (sm && custom) return;
    dispatch(isPlaySong(false));
    dispatch(setCurSongID(encodeId));
    dispatch(isPlaySong(true));
  };
  return (
    <div
      className={`cursor-pointer w-full flex gap-2 p-[6px] ${
        !!custom ? custom : "hover:bg-[rgba(255,255,255,0.2)]"
      } rounded-md items-center ${
        older === 1 ? "bg-[rgba(255,255,255,0.1)]" : ""
      }
      `}
      onClick={handleClickSongItem}
    >
      {older && (
        <span
          className={`${
            older === 1
              ? "text-shadow-no1"
              : older === 2
              ? "text-shadow-no2"
              : "text-shadow-no3"
          } font-bold text-[#2d1a4c] text-[40px] px-2`}
        >
          {older}
        </span>
      )}

      <img
        src={thumbnail}
        alt=""
        className={`${
          sm ? "w-[50px] h-[50px]" : "}w-[70px] h-[70px]"
        } object-fill rounded-xl items-start p-1`}
      />

      <div className={`flex flex-col gap-1 ${sm ? "gap-0" : "gap-1"}`}>
        <span className="font-bold text-[14px]">
          {" "}
          {title?.charAt(31)
            ? `${title.slice(0, 27)}...`
            : title }
        </span>
        <span
          className={` ${
            sm ? "text-white-200" : "text-white-300"
          } text-[12px] text-white-300 font-bold`}
        >
          {artistsNames}
        </span>
        {releaseDate && (
          <span className="text-[12px] text-white-300 font-bold">
            {moment(releaseDate * 1000).fromNow()}
          </span>
        )}
      </div>
      {percents && (
        <span className="ml-auto font-bold text-[16px] pr-2">{percents}%</span>
      )}
    </div>
  );
};

export default SongItem;
