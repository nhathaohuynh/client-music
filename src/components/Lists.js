import React, { memo } from "react";
import icon from "../Utils/icon";
import List from "./List";
import moment from "moment/moment";
import { useSelector } from "react-redux";

const { TbArrowsSort, BsDot } = icon;

const Lists = ({ totalDuration }) => {
  const { curSongID , songs } = useSelector((state) => state.music);

  return (
    <div>
      <div className="flex p-[12px] justify-between mt-[10px] items-center text-white-300 font-bold text-[12px] border-b border-[rgba(255,255,255,0.1)]">
        <span className="flex gap-3 w-[55%] justify-start items-center">
          <span className="cursor-pointe">
            <TbArrowsSort size={16}></TbArrowsSort>
          </span>
          <span className="">BÀI HÁT</span>
        </span>
        <span className="w-[30%]">ALBUM</span>
        <span className="flex-auto flex justify-end whitespace-nowrap">
          THỜI GIAN
        </span>
      </div>
      <div className="flex flex-col">
        {songs?.map((item) => (
          <List key={crypto.randomUUID()} songData={item} songPlaying = {item.encodeId === curSongID}></List>
        ))}
      </div>
      <div className="flex text-[12px] text-white-300 items-center gap-[2px] font-semibold mt-3 ">
        <span>{`${songs?.length} bài hát`}</span>
        <span>
          <BsDot size={20}></BsDot>
        </span>
        <span>
          {moment.utc(totalDuration * 1000).format(`HH giờ mm `)} phút
        </span>
      </div>
    </div>
  );
};

export default memo(Lists);
