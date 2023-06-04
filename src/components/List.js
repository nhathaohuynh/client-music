import React, { memo } from "react";
import icon from "../Utils/icon";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import * as actions from "../store/Action";

const { IoMusicalNotesOutline } = icon;
const List = ({
  older,
  songData,
  songPlaying,
  isHideAlbum,
  isHideNote,
  isShowTitle,
  isBorder,
}) => {
  const dispatch = useDispatch();
  const handleClickPlayMusic = () => {
    dispatch(actions.setCurSongID(songData?.encodeId));
    dispatch(actions.isPlaySong(true));
  };

  return (
    <div
      className={` cursor-pointer text-white-300 ${
        isBorder ? "rounded-md  pr-[2px] h-[60px]" : " border-b border-[rgba(255,255,255,.1)] p-[10px] h-[70px]"
      }   ${
        songPlaying
          ? "bg-[rgba(255,255,255,.1)]"
          : "hover:bg-[rgba(255,255,255,.1)]"
      } `}
      onClick={handleClickPlayMusic}
    >
      <div className="flex items-center">
        <div className="flex gap-3 items-center text-[12px] w-[55%] justify-start">
          {!isHideNote && (
            <span>
              <IoMusicalNotesOutline size={14}></IoMusicalNotesOutline>
            </span>
          )}
          {older && (
            <span
              className={`${
                older === 1
                  ? "text-shadow-no1"
                  : older === 2
                  ? "text-shadow-no2"
                  : older === 3
                  ? "text-shadow-no3"
                  : "text-shadow-more"
              } font-bold text-[#2d1a4c] text-[36px] px-5 ${
                isBorder ? "pr-7" : "pr-10"
              }   w-[40px] flex justify-center`}
            >
              {older}
            </span>
          )}

          <img
            src={songData?.thumbnailM}
            alt="thumbnail of playlist song"
            className="w-[40px] h-[40px] object-fill rounded-md"
          />
          <div className="flex flex-col font-semibold">
            {isShowTitle ? (
              <span className="text-white-100 text-[14px] whitespace-nowrap ">
                {songData?.title}
              </span>
            ) : (
              <span className="text-white-100 text-[14px] whitespace-nowrap ">
                {songData?.title.charAt(isBorder ? 15 : 30)
                  ? `${songData?.title.slice(0, isBorder ? 17 : 30)}...`
                  : songData?.title}
              </span>
            )}

            <span className="whitespace-nowrap">
              {songData?.artistsNames.charAt(isBorder ? 15 : 31)
                ? `${songData?.artistsNames.slice(0, isBorder ? 17 : 31)}...`
                : songData?.artistsNames}
            </span>
          </div>
        </div>
        {!isHideAlbum && (
          <span className="w-[30%]">{songData?.album?.title}</span>
        )}

        <span className="flex flex-auto justify-end text-[13px] font-bold">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default memo(List);
