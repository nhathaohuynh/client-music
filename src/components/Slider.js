import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../store/Action";
import { useNavigate } from "react-router-dom";
import icon from "../Utils/icon";

const { MdArrowBackIosNew, MdArrowForwardIos } = icon;

const Slider = () => {
  let intervalID;
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHoverBanner, setIsHoverBanner] = useState(false);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(2);

  // function changeIndex(slider) {}
  const getIndexSlider = (startIndex, endIndex, length) => {
    const arrayIndexSilder = [];
    const limit = startIndex > endIndex ? length : endIndex;
    for (let i = startIndex; i <= limit; i++) {
      arrayIndexSilder.push(i);
    }
    if (startIndex > endIndex) {
      for (let i = 0; i <= endIndex; i++) {
        arrayIndexSilder.push(i);
      }
    }
    return arrayIndexSilder;
  };
  const hiddenAttributeSlide = (sliderList, listIndexSlide) => {
    for (let i = 0; i < sliderList.length; i++) {
      sliderList[i].classList?.remove(
        "order-first",
        "animate-slide-left",
        "z-20"
      );
      sliderList[i].classList?.remove("order-2", "animate-slide-right", "z-10");
      sliderList[i].classList?.remove(
        "order-last",
        "animate-slide-left-between",
        "z-10"
      );
      if (listIndexSlide.some((item) => item === i)) {
        sliderList[i].style.display = "block";
      } else {
        sliderList[i].style.display = "none";
      }
    }
  };
  const addAttributeSlide = (sliderList, listIndexSlide) => {
    listIndexSlide.forEach((item) => {
      if (item === minIndex) {
        sliderList[item]?.classList?.add(
          "order-first",
          "animate-slide-left",
          "z-20"
        );
      } else if (item === maxIndex) {
        sliderList[item]?.classList?.add(
          "order-last",
          "animate-slide-right",
          "z-10"
        );
      } else {
        sliderList[item]?.classList?.add(
          "order-2",
          "animate-slide-left-between",
          "z-10"
        );
      }
    });
  };

  useEffect(() => {
    const sliderList = Array.from(
      document.getElementsByClassName("slider-item")
    );
    if (!isHoverBanner) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      intervalID = setInterval(() => {
        const listIndexSlide = getIndexSlider(
          minIndex,
          maxIndex,
          sliderList.length - 1
        );
        hiddenAttributeSlide(sliderList, listIndexSlide);
        addAttributeSlide(sliderList, listIndexSlide);
        setMinIndex((prev) => (prev === sliderList.length - 1 ? 0 : prev + 1));
        setMaxIndex((prev) => (prev === sliderList.length - 1 ? 0 : prev + 1));
      }, 3000);
    } else {
      const listIndexSlide = getIndexSlider(
        minIndex,
        maxIndex,
        sliderList.length - 1
      );
      hiddenAttributeSlide(sliderList, listIndexSlide);
      addAttributeSlide(sliderList, listIndexSlide);
    }

    return () => {
      intervalID && clearInterval(intervalID);
    };
  }, [minIndex, maxIndex]);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      const sid = item.encodeId;
      dispatch(actions.setCurSongID(sid));
      dispatch(actions.isPlaySong(true));
    } else if (item?.type === 4) {
      const pathAblum = item.link.split(".")[0];
      navigate(pathAblum);
    } else {
      console.log("chua xu li");
    }
  };

  const handleMouseEnterBanner = () => {
    setIsHoverBanner(true);
    if (intervalID) {
      clearInterval(intervalID);
    }
  };
  const handleMouseLeaveBanner = () => {
    setIsHoverBanner(false);
    setMaxIndex((prev) => (prev === 5 ? 0 : prev + 1));
    setMinIndex((prev) => (prev === 5 ? 0 : prev + 1));
  };

  const handleClickPrevBanner = () => {
    setIsHoverBanner(true)
    setMaxIndex((prev) => (prev === 5 ? 0 : prev + 1));
    setMinIndex((prev) => (prev === 5 ? 0 : prev + 1));
  };

  const handleClickNextBanner = () => {
    setIsHoverBanner(true)
    setMaxIndex((prev) => (prev === 0 ? 5 : prev - 1));
    setMinIndex((prev) => (prev === 0 ? 5 : prev - 1));
  };
  return (
    <div
      className="w-full pt-[129px] px-[58px] relative"
      onMouseEnter={handleMouseEnterBanner}
      onMouseLeave={handleMouseLeaveBanner}
    >
      {isHoverBanner && (
        <div className="absolute left-[20px] right-[20px] top-[60%] px-[58px] flex justify-between z-30">
          <button>
            <span
              className="flex justify-center items-center w-[50px] h-[50px] bg-[rgba(0,0,0,0.2)] rounded-full text-white-200"
              onClick={handleClickPrevBanner}
            >
              <MdArrowBackIosNew size={32}></MdArrowBackIosNew>
            </span>
          </button>
          <button>
            <span
              className="flex justify-center items-center w-[50px] h-[50px] bg-[rgba(0,0,0,0.2)] rounded-full text-white-200"
              onClick={handleClickNextBanner}
            >
              <MdArrowForwardIos size={32}></MdArrowForwardIos>
            </span>
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 grid-rows-1 gap-5 overflow-hidden">
        {banner?.map((item, index) => {
          return (
            <img
              key={crypto.randomUUID()}
              src={item.banner}
              alt="banner"
              onClick={() => handleClickBanner(item)}
              className={`slider-item select-none rounded-md cursor-pointer  ${
                index <= 2 ? "block" : "hidden"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
