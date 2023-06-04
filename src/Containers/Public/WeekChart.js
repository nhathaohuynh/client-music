import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as apis from "../../Apis";
import bgRank from "../../assets/bgRank.jpg";
import icon from "../../Utils/icon";
import { useParams } from "react-router-dom";
import { List } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const { BsFillPlayFill } = icon;

const WeekChart = () => {
  const [weekChart, setWeekChart] = useState();
  const { pid } = useParams();
  const { curSongID } = useSelector((state) => state.music);

  useEffect(() => {
    const fetchingWeekChart = async () => {
      const res = await apis.chartHome();

      if (res.data.err === 0) {
        setWeekChart(res.data.data);
        return true;
      } else {
        return false;
      }
    };

    fetchingWeekChart();
  }, []);
  console.log(weekChart);
  return (
    <div>
      <div className="w-full h-full relative">
        <img
          src={bgRank}
          alt=""
          className="w-full h-full object-fill grayscale "
        />
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-main-200 opacity-90  z-[2]"></div>
        <div className="px-[48px] pt-[40px] z-10 absolute top-0 right-0 left-0 bottom-0">
          <div className="flex items-center gap-4  mt-[60px]">
            <h4 className="text-[40px] font-bold capitalize cursor-pointer">
              Bảng xếp hạng tuần
            </h4>
            <span className="w-[50px] h-[50px] bg-main-500 rounded-full flex justify-center items-center">
              <BsFillPlayFill size={30}></BsFillPlayFill>
            </span>
          </div>

          <div className="flex items-center mt-[32px] gap-10 pb-[12px]">
            {weekChart &&
              Object.keys(weekChart?.weekChart)?.map((item) => {
                return (
                  <NavLink
                    key={uuidv4()}
                    className={`text-[24px] uppercase py-[15px] font-bold cursor-pointer  ${
                      weekChart?.weekChart[item]?.link.includes(pid)
                        ? "text-white border-b-[3px] border-main-500"
                        : "text-white-200 border-b-2 border-transparent"
                    }
                  `}
                    to={weekChart?.weekChart[item]?.link.split(".")[0]}
                  >
                    {item === "vn"
                      ? "Việt Nam"
                      : item === "us"
                      ? "US-UK"
                      : "K-POP"}
                  </NavLink>
                );
              })}
          </div>

          <Scrollbars
            style={{ width: "100%", height: "95%" }}
            renderThumbHorizontal={(props) => (
              <div {...props} className="thumb-horizontal" />
            )}
            renderTrackHorizontal={(props) => (
              <div {...props} className="track-horizontal" />
            )}
          >
            <div className="flex flex-col mt-[12px] pr-[12px] ">
              {weekChart &&
                Object.keys(weekChart.weekChart)?.map((item) => {
                  if (!weekChart?.weekChart[item].link.includes(pid)) {
                    return <></>;
                  }
                  return weekChart?.weekChart[item]?.items?.map(
                    (song, index) => {
                      return (
                        <List
                          songData={song}
                          older={index + 1}
                          isHideNote
                          key={uuidv4()}
                          songPlaying={song.encodeId === curSongID}
                        ></List>
                      );
                    }
                  );
                })}
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default WeekChart;
