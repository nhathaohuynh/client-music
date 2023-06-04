import React from "react";
import * as apis from "../../Apis";
import { ChartSection, List } from "../../components";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import bgRank from "../../assets/bgRank.jpg";
import { Link } from "react-router-dom";
import icon from "../../Utils/icon";
import { useNavigate } from "react-router-dom";

const { BsFillPlayFill } = icon;

const ZingChart = () => {
  const [dataChart, setDataChart] = useState();
  const [isRankTop, setIsRankTop] = useState(false);
  const { curSongID } = useSelector((state) => state.music);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchingChartData = async () => {
      const res = await apis.chartHome();
      if (res.data.err === 0) {
        console.log(res.data);
        setDataChart(res.data.data);
        return true;
      } else {
        return false;
      }
    };
    fetchingChartData();
  }, []);
  console.log(dataChart);
  return (
    <div>
      <div className="w-full h-full">
        <ChartSection isHideSong></ChartSection>
      </div>
      <div className="px-[48px] mt-[12px]">
        {dataChart &&
          dataChart?.RTChart?.items.map((song, index) => {
            if (isRankTop) {
              return (
                <List
                  older={index + 1}
                  isHideNote
                  key={uuidv4()}
                  songPlaying={curSongID === song.encodeId}
                  songData={song}
                ></List>
              );
            } else {
              if (index > 9) {
                return null;
              } else {
                return (
                  <List
                    older={index + 1}
                    songPlaying={curSongID === song.encodeId}
                    isHideNote
                    key={uuidv4()}
                    songData={song}
                  ></List>
                );
              }
            }
          })}
        <button
          className="px-8 py-2 bg-transparent border border-white-100 m-auto block mt-4 rounded-full 
          hover:bg-[rgba(255,255,255,0.1)] transition-all
          "
          onClick={() => setIsRankTop((prev) => !prev)}
        >
          <span className="text-[14px] font-bold text-white-200 rounded-full">
            {isRankTop ? "Ẩn Top 100" : "Xem top 100"}
          </span>
        </button>
      </div>

      <div className="w-full h-[580px] mt-12 relative">
        <img
          src={bgRank}
          alt=""
          className="w-full h-full object-fill grayscale "
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-main-200 opacity-90  z-[2]"></div>
        <div className="px-[48px] pt-[40px] z-10 absolute top-0 right-0 left-0 bottom-0">
          <h4 className="text-[40px] font-bold capitalize cursor-pointer">
            Bảng xếp hạng tuần
          </h4>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {dataChart &&
              Object.keys(dataChart?.weekChart)?.map((item) => {
                return (
                  <div
                    key={uuidv4()}
                    className="py-[20px] px-[10px] bg-[rgba(255,255,255,0.1)] rounded-md"
                  >
                    <div className="flex items-center gap-3 pl-[40px] pb-[10px] ">
                      <Link
                        to={dataChart?.weekChart[item]?.link.split(".")[0]}
                        className="text-[24px] capitalize font-bold cursor-pointer hover:text-main-500 transition-all"
                      >
                        {item === "vn"
                          ? "Việt Nam"
                          : item === "us"
                          ? "US-UK"
                          : "K-Pop"}
                      </Link>
                      <span className="w-[30px] h-[30px] bg-main-500 rounded-full flex justify-center items-center">
                        <BsFillPlayFill size={24}></BsFillPlayFill>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      {dataChart?.weekChart &&
                        dataChart?.weekChart[item]?.items.map((song, index) => {
                          if (index > 4) {
                            return <></>;
                          }
                          return (
                            <List
                              songData={song}
                              older={index + 1}
                              isHideAlbum
                              isHideNote
                              isBorder
                              key={uuidv4()}
                              // songPlaying={song.encodeId === curSongID}
                            ></List>
                          );
                        })}
                    </div>
                    <button
                      className="px-8 py-2 bg-transparent border border-white-100 m-auto block mt-4 rounded-full hover:bg-[rgba(255,255,255,0.1)] transition-all"
                      onClick={() =>
                        navigate(dataChart?.weekChart[item]?.link.split(".")[0])
                      }
                    >
                      <span className="text-[14px] font-bold text-white-200 rounded-full">
                        Xem Tất cả
                      </span>
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
