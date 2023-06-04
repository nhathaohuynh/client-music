import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import * as apis from "../Apis";
import icons from "../Utils/icon";
import { useDispatch } from "react-redux";
import * as actions from "../store/Action";
import moment from "moment/moment";
import { toast } from "react-toastify";
import RotateLoading from "./RotateLoading";
import { useLocation } from "react-router-dom";

const {
  AiOutlineHeart,
  AiFillHeart,
  HiOutlineDotsHorizontal,
  FiRepeat,
  RxShuffle,
  BiSkipNext,
  BiSkipPrevious,
  BsPauseCircle,
  BsPlayCircle,
  BsMusicNoteList,
  HiVolumeOff,
  HiVolumeUp,
} = icons;

const Player = ({ setToggleSidebarRight, toggleSidebarRight }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();
  const volumeTrackRef = useRef();
  let intervalId;
  const { curSongID, isPlaySong, songs } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [secondsSong, setSecondsSong] = useState(0);
  const [isLoadedSong, setIsLoadedSong] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isHeart, setIsHeart] = useState(false);
  const [isHideProgressVolume, setIsHideProgressVolume] = useState(false);

  useEffect(() => {
    const fetchInfoSong = async () => {
      setIsLoadedSong(true);

      if (curSongID) {
        const [response1, response2] = await Promise.all([
          apis.getApiInfoSong(curSongID),
          apis.getApiCurSong(curSongID),
        ]);
        if (response1.data.err === 0) {
          const infoSongAPI = response1.data.data;
          if (songInfo?.encodeId === infoSongAPI?.encodeId) {
            setIsLoadedSong(false);
            return;
          }
          setSongInfo(infoSongAPI);
          dispatch(actions.setCurSongData(infoSongAPI));
        }
        if (response2.data.err === 0) {
          audio?.pause();
          const pathMusic = response2?.data.data["128"];
          if (pathMusic) {
            setAudio(new Audio(pathMusic));
          }
          setIsLoadedSong(false);
        } else {
          audio?.pause();
          thumbRef.current.style.right = "100%";
          setSecondsSong(0);
          setAudio(new Audio());
          dispatch(actions.isPlaySong(false));
          toast.error(response2?.data.msg);
          setIsLoadedSong(false);
        }
      } else {
        audio?.pause();
        setIsLoadedSong(false);
      }
    };
    fetchInfoSong();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongID, audio, songInfo]);

  useEffect(() => {
    if (location.state && songs.length > 0) {
      handleShuffle();
      setIsShuffle(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio?.pause();
    // audio?.load();
    if (isPlaySong) {
      audio?.play();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      intervalId = setInterval(() => {
        const percentProgress =
          Math.round((audio?.currentTime * 10000) / songInfo?.duration) / 100;
        thumbRef.current.style.right = `${100 - percentProgress}%`;
        setSecondsSong(Math.round(audio?.currentTime));
      }, 10);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [audio, isPlaySong]);

  useEffect(() => {
    const handleEndSong = () => {
      // dispatch(actions.setRecentSong(songInfo));
      if (isRepeat && isShuffle === false) {
        handleRepeat();
      } else if (isShuffle && isRepeat === false) {
        handleShuffle();
      } else {
        handleClickNextSong();
      }
    };
    audio?.addEventListener("ended", handleEndSong);
    return () => {
      audio?.removeEventListener("ended", handleEndSong);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRepeat, isShuffle, audio]);

  const handleToglePlayMusic = () => {
    if (!curSongID) return;
    if (isPlaySong) {
      dispatch(actions.isPlaySong(false));
      audio.pause();
    } else {
      dispatch(actions.isPlaySong(true));
    }
  };
  const handleClickProgressBar = (e) => {
    const { left, width } = trackRef.current.getBoundingClientRect();
    const percentProgressBar =
      Math.round(10000 * ((e.clientX - left) / width)) / 100;

    thumbRef.current.style.right = ` ${100 - percentProgressBar}%`;
    audio.currentTime = Math.round(
      (percentProgressBar * songInfo?.duration) / 100
    );
    setSecondsSong(Math.round((percentProgressBar * songInfo?.duration) / 100));
  };

  const getIndexCurSong = () => {
    let indexCurSong;
    songs.length > 0 &&
      songs.forEach((song, index) => {
        if (song.encodeId === songInfo.encodeId) indexCurSong = index;
      });
    return indexCurSong;
  };

  const handleClickNextSong = () => {
    if (!curSongID) return;
    if (!songs?.length) return;
    dispatch(actions.setRecentSong(songInfo));
    if (isRepeat && isShuffle === false) {
      handleRepeat();
    } else if (isShuffle && isRepeat === false) {
      handleShuffle();
    } else {
      let indexCurSong = getIndexCurSong();
      if (indexCurSong === songs?.length - 1) indexCurSong = 0;
      else indexCurSong += 1;
      const idNextSong = songs[indexCurSong]?.encodeId || songs[0]?.encodeId;
      dispatch(actions.setCurSongID(idNextSong));
      dispatch(actions.isPlaySong(true));
      setSecondsSong(0);
    }
  };

  const handleClickPrevSong = () => {
    if (!curSongID) return;
    if (!songs?.length) return;
    dispatch(actions.setRecentSong(songInfo));
    if (isRepeat && isShuffle === false) {
      handleRepeat();
    } else if (isShuffle && isRepeat === false) {
      handleShuffle();
    } else {
      let indexCurSong = getIndexCurSong();
      if (indexCurSong === 0) indexCurSong = songs?.length;
      else indexCurSong -= 1;
      dispatch(actions.setCurSongID(songs[indexCurSong].encodeId));
      dispatch(actions.isPlaySong(true));
      setSecondsSong(0);
    }
  };

  const handleShuffle = () => {
    const indexSongRandom = Math.round(Math.random() * (songs?.length - 1));
    dispatch(actions.setCurSongID(songs[indexSongRandom]?.encodeId));
    dispatch(actions.isPlaySong(true));
  };
  const handleRepeat = () => {
    dispatch(actions.isPlaySong(false));
    const indexCurSong = getIndexCurSong();
    dispatch(actions.setCurSongID(songs[indexCurSong].encodeId));
    dispatch(actions.isPlaySong(true));
    audio.currentTime = 0;
    audio.load();
    audio.play();
  };
  const handleClickRangeVolumn = (e) => {
    const valueRange = e.target.value;
    if (valueRange === 0) {
      setVolume(0);
      audio.volume = 0;
    } else {
      setVolume(valueRange);
      audio.volume = valueRange / 100;
    }
  };
  const handleClickVolume = () => {
    if (+volume === 0) {
      setVolume(70);
      audio.volume = 0.7;
      volumeTrackRef.current.style.right = `${100 - 70}%`;
    } else {
      setVolume(0);
      volumeTrackRef.current.style.right = "100%";
      audio.volume = 0;
    }
  };
  const mouseEnterVolume = () => {
    setIsHideProgressVolume(true);
  };
  const mouseLeaveVolume = () => {
    setIsHideProgressVolume(false);
    volumeTrackRef.current.style.right = `${100 - volume}%`;
  };

  return (
    <div className="bg-main-100 px-[25px] h-full flex items-center gap-[6px] w-full">
      <div className="w-[30%] h-full flex gap-3">
        <div className="flex items-center ">
          <img
            src={
              songInfo?.thumbnail ||
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            }
            alt="thumbnail of song"
            className="max-w-[70px] max-h-[70px] rounded-md cursor-pointer"
          />
        </div>
        <div className="flex justify-center flex-col">
          <h4 className="text-white-100 text-[14px] font-semibold">
            {songInfo?.title || "Hien tai chua co bai hat"}
          </h4>
          <span className="text-white-300 text-[12px]">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span
            className={`${
              isHeart ? "text-main-500" : "text-white-100"
            } px-1 cursor-pointer w-[30px] h-[30px] rounded-full hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center`}
            onClick={() => setIsHeart((prev) => !prev)}
          >
            {isHeart ? (
              <AiFillHeart size={20}></AiFillHeart>
            ) : (
              <AiOutlineHeart size={20}></AiOutlineHeart>
            )}
          </span>

          <span className="px-1 cursor-pointer  w-[30px] h-[30px] rounded-full hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center">
            <HiOutlineDotsHorizontal size={24}></HiOutlineDotsHorizontal>
          </span>
        </div>
      </div>
      <div className="flex-auto h-full flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <button
            className={`p-1 ${
              isShuffle ? "text-main-500" : ""
            } h-[32px] w-[32px] rounded-[999px] hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center`}
            title="bật phát ngẫu nhiên"
            onClick={() => setIsShuffle((prev) => !prev)}
          >
            <RxShuffle size={16}></RxShuffle>
          </button>
          <button
            className=" h-[32px] w-[32px] rounded-[999px] hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center"
            onClick={handleClickPrevSong}
          >
            <BiSkipPrevious size={32}></BiSkipPrevious>
          </button>
          <div
            onClick={(e) => handleToglePlayMusic(e)}
            className="flex items-center justify-center px-1"
          >
            {isLoadedSong ? (
              <RotateLoading></RotateLoading>
            ) : isPlaySong ? (
              <button className="hover:text-main-500">
                <BsPauseCircle size={38}></BsPauseCircle>
              </button>
            ) : (
              <button className="hover:text-main-500">
                <BsPlayCircle size={38}></BsPlayCircle>
              </button>
            )}
          </div>
          <button
            className={`${
              !!songs ? "cursor-pointer" : "text-gray-500"
            } h-[32px] w-[32px] rounded-[999px] hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center`}
            onClick={handleClickNextSong}
          >
            <BiSkipNext size={32}></BiSkipNext>
          </button>
          <button
            onClick={() => setIsRepeat((prev) => !prev)}
            className={`p-1 h-[32px] w-[32px] rounded-[999px] hover:bg-[rgba(255,255,255,0.1)] flex justify-center items-center ${
              isRepeat ? "text-main-500" : ""
            }`}
            title="bật phát lại tất cả"
          >
            <FiRepeat size={16}></FiRepeat>
          </button>
        </div>
        <div className="w-full flex gap-2 text-xs items-center select-none font-bold">
          <span className="text-white-300">
            {secondsSong
              ? moment.utc(secondsSong * 1000).format("mm:ss")
              : "00:00"}
          </span>
          <div
            ref={trackRef}
            onClick={handleClickProgressBar}
            className="w-[85%] h-[4px] relative bg-[rgba(225,225,255,0.1)] cursor-pointer  rounded-[999px] hover:h-[7px]"
          >
            <div
              ref={thumbRef}
              className="absolute left-0 top-0 bottom-0 bg-[rgba(225,225,255)] h-full rounded-[999px]"
            ></div>
          </div>
          <span>
            {songInfo?.duration
              ? moment.utc(songInfo?.duration * 1000).format("mm:ss")
              : "00:00"}
          </span>
        </div>
      </div>
      <div className="w-[30%] h-full flex items-center justify-end gap-10 px-10 select-none">
        <div className="flex justify-center items-center gap-4">
          <span
            onClick={handleClickVolume}
            className=" w-[30px] h-[30px] rounded-[999px] hover:bg-[rgba(255,255,255,.1)] flex justify-center items-center cursor-pointer"
          >
            {+volume === 0 ? (
              <HiVolumeOff size={16}></HiVolumeOff>
            ) : (
              <HiVolumeUp size={16}></HiVolumeUp>
            )}
          </span>
          <div
            className="relative w-[100px] flex-auto"
            onMouseEnter={mouseEnterVolume}
            onMouseLeave={mouseLeaveVolume}
          >
            <div
              className={`absolute left-0 right-0 w-full h-[4px] bg-white-300 rounded-full cursor-pointer transition-all ${
                isHideProgressVolume ? "hidden" : ""
              }`}
            >
              <div
                ref={volumeTrackRef}
                className={` absolute left-0 right-0 h-[4px] bg-white-100 rounded-full`}
              ></div>
            </div>
            <input
              type="range"
              value={volume}
              step={1}
              min={0}
              max={100}
              onChange={(e) => handleClickRangeVolumn(e)}
              className={` ${
                isHideProgressVolume ? "block opacity-100" : "hidden opacity-0"
              } h-[4px] rounded-full cursor-pointer select-none w-full bg-whit absolute left-0 right-0 transition-opacity duration-1000 `}
            />
          </div>
        </div>
        <span
          onClick={() => setToggleSidebarRight((prev) => !prev)}
          className={`text-white cursor-pointer ${
            toggleSidebarRight && "bg-main-500"
          } w-[30px] px-1 h-[30px] flex justify-center items-center rounded-md`}
        >
          <BsMusicNoteList size={20}></BsMusicNoteList>
        </span>
      </div>
    </div>
  );
};

export default Player;
