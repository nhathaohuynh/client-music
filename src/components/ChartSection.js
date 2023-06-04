import React from "react";
import { memo } from "react";
import icon from "../Utils/icon";
import bgChart from "../assets/bgChart.jpg";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useEffect, useState, useRef } from "react";
import SongItem from "./SongItem";
import { Link } from "react-router-dom";
import path from "../Utils/path";
import _ from "lodash";

const { BsFillPlayFill } = icon;
const ChartSection = ({ isHideSong }) => {
  const { chart } = useSelector((state) => state.app);
  const [data, setData] = useState(null);
  const tooltipRef = useRef();
  const [songTopId, setSongTopId] = useState(null);
  const [tooltipStyle, setTooltipStyle] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const options = {
    type: "line",
    reponsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    padding: 0,
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          borderDash: [1, 1],
          color: "rgba(255,255,255,0.1)",
          drawTicks: false,
        },
        min: chart?.chart?.minScore,
        max: chart?.chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "white" },
        grid: {
          color: "transparent",
        },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false, // hide tooltip define
        external: (context) => {
          // console.log(context);
          const tooltipModel = context.tooltip;
          // console.log(tooltipModel);
          if (!tooltipRef || !tooltipRef.current) return;
          if (tooltipModel.opacity === 0) {
            if (tooltipStyle.opacity !== 0) {
              setTooltipStyle((prev) => ({ ...prev, opacity: 0 }));
              return;
            }
          }
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          };
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
                .filter((item) => +item.hour % 2 === 0)
                .map((item) => item.counter),
              encodeId: Object.keys(chart?.chart?.items)[i],
            });
          }
          const result = counters?.find((item) =>
            item?.data?.some(
              (line) =>
                line === +tooltipModel?.body[0].lines[0].replace(",", "")
            )
          );
          if (!_.isEqual(tooltipStyle, newTooltipData)) {
            setTimeout(() => {
              setTooltipStyle(newTooltipData);
              setSongTopId(result);
            }, 1000);
          }
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const datasets = [];
    let labels;
    if (chart?.chart?.times) {
      labels = chart?.chart?.times
        ?.filter((item) => +item.hour % 2 === 0)
        ?.map((item) => `${item.hour}:00`);
    }
    if (chart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.chart?.items[Object.keys(chart?.chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 1.5,
          pointBorderWidth: 3,
          pointBackgroundColor: "#fff",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 5,
        });
      }
    }
    const timeOut = setTimeout(() => {
      setData({
        labels,
        datasets,
      });
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <div
      className={`${
        !isHideSong ? "mt-12 px-[59px] h-[410px]" : "h-full w-ful"
      } relative`}
    >
      <img
        src={bgChart}
        alt=""
        className={`${
          isHideSong && "grayscale"
        } w-full h-full object-fill rounded-md `}
      />
      <div
        className={`absolute top-0 ${
          isHideSong
            ? "bg-main-200 left-0 right-0 w-full"
            : "bg-gradient-to-t from-[#2d1a4c] to-[#740091] rounded-md left-[58px] right-[58px] bottom-0"
        }  opacity-90 z-10 h-full`}
      ></div>
      <div
        className={`absolute right-0 top-0 bottom-[70px] left-0 z-30 ${
          isHideSong ? "px-[48px]" : "px-[79px]"
        } py-2 rounded-md`}
      >
        <div
          className={`flex items-center gap-2 justify-start mb-3 ${
            isHideSong && "pt-[100px] mb-5"
          }`}
        >
          <Link to={`/${path.ZINGCHART}`}>
            <h3 className="text-[36px] font-bold hover:text-[rgba(255,255,255,0.4)] cursor-pointer">
              #Zingchart
            </h3>
          </Link>
          <button className="text-white-300 bg-white-100 w-[30px] h-[30px] flex justify-center items-center rounded-full">
            <BsFillPlayFill size={20}></BsFillPlayFill>
          </button>
        </div>
        <div className={`flex gap-4 ${isHideSong ? "h-[80%]" : "h-full"}`}>
          {!isHideSong && (
            <div className=" w-[40%] flex justify-center flex-col gap-4">
              <div className="flex flex-col gap-2">
                {chart?.items
                  ?.filter((item, index) => index < 3)
                  ?.map((item, index) => {
                    return (
                      <SongItem
                        key={crypto.randomUUID()}
                        encodeId={item.encodeId}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        artistsNames={item.artistsNames}
                        releaseDate={item.releaseDate}
                        percents={Math.round(
                          (+item.score * 100) / chart.chart.totalScore
                        )}
                        older={index + 1}
                      ></SongItem>
                    );
                  })}
              </div>
              <button>
                <Link to={path.ZINGCHART}>
                  <span className="py-1.5 px-6 text-[14px] font-medium border border-white-100 rounded-full  hover:bg-[rgba(255,255,255,0.1)] transition-all tracking-wide align-middle">
                    Xem thêm
                  </span>
                </Link>
              </button>
            </div>
          )}
          <div
            className={`${isHideSong ? "w-[100%]" : "w-[60%]"} h-full relative`}
          >
            {data && (
              <Line ref={tooltipRef} data={data} options={options}></Line>
            )}
            <div
              className="tooltip absolute transition-all translate-y"
              style={{
                top: tooltipStyle.top,
                left: tooltipStyle.left,
                opacity: tooltipStyle.opacity,
                transform: "translate(-50%, -150%)",
              }}
            >
              <div className="flex w-[50px] h-[50px] rounded-md">
                <img
                  className="w-full h-full rounded-md object-fill"
                  src={
                    chart?.items?.find(
                      (item) => item.encodeId === songTopId?.encodeId
                    )?.thumbnail
                  }
                  alt=""
                />
                {/* <span>{chart?.items.find(item => item.encodeId == songTopId?.encodeId)?.title}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
