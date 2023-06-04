import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as apis from "../../Apis";
import { useState } from "react";
import moment from "moment/moment";
import Lists from "../../components/Lists";
import icon from "../../Utils/icon";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/Action";
import { AudioLoading } from "../../components";
import { AiFillHeart } from "react-icons/ai";

const { BsFillPlayFill, HiOutlineDotsHorizontal, AiOutlineHeart, BsPauseFill } =
  icon;

const Album = () => {
  const dispatch = useDispatch();
  const [isHeart, setIsHeart] = useState(false);
  // console.log(location.state)
  const { pid } = useParams();
  const { isPlaySong } = useSelector((state) => state.music);

  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.getApiDetailPlaylist(pid);
      dispatch(actions.setPlaylist(response.data.data.song.items));
      setPlaylistData(response.data.data);
    };
    fetchDetailPlaylist();
  }, [pid, dispatch]);

  return (
    <div className="w-full">
      <div className="flex pl-[58px] pr-[58px] pt-[130px] pb-[200px] gap-8 w-[100%] select-none h-full">
        <div className="w-[300] flex-none">
          <div className="w-[300px] h-[300px] flex flex-col items-center gap-2">
            <div className="relative cursor-pointer">
              <img
                src={
                  playlistData?.thumbnailM ||
                  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                }
                alt="thumbnail of playlist"
                className={`w-full h-full object-fill  shadow-lg ${
                  isPlaySong
                    ? "rounded-full animate-rotate-center "
                    : "rounded-md animate-rotate-center-pause"
                } shadow-md`}
              />
              <div
                className={`absolute top-0 bottom-0 right-0 left-0 hover:bg-[rgba(0,0,0,.3)] flex justify-center items-center ${
                  isPlaySong && "rounded-full"
                }`}
              >
                {isPlaySong ? (
                  <span className="h-[50px] w-[50px] rounded-full border border-white flex justify-center items-center">
                    <AudioLoading></AudioLoading>
                  </span>
                ) : (
                  <span className="h-[50px] flex w-[50px] rounded-full border border-white  justify-center items-center">
                    <BsFillPlayFill size={30}></BsFillPlayFill>
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap 1">
              <h3 className="text-[20px] font-bold text-white-100 pt-1">
                {playlistData?.title}
              </h3>
              <div className="flex flex-col gap-1 text-[12px] text-white-300 items-center font-semibold">
                <p>
                  {`Cập nhật: ${moment
                    .unix(playlistData?.contentLastUpdate)
                    .format("DD/MM/YYYY")}`}
                </p>
                <span>{playlistData?.artistsNames}</span>
                <span>{`${Math.round(
                  playlistData?.like / 1000
                )}K nguời yêu thích`}</span>
              </div>
              <div className="flex flex-col items-center gap-2 mt-4">
                <div>
                  <button className="bg-main-500 flex px-[24px] py-[9px] items-center justify-center rounded-[999px] outline-none uppercase mb-4 font-medium text-[14px]">
                    <span>
                      {isPlaySong ? (
                        <BsPauseFill size={24}></BsPauseFill>
                      ) : (
                        <BsFillPlayFill size={24}></BsFillPlayFill>
                      )}
                    </span>
                    {isPlaySong ? "Tạm Dừng" : "Phát Ngẫu Nhiên"}
                  </button>
                </div>
                <div className="flex gap-5">
                  <span
                    className={`${
                      isHeart ? "bg-main-500" : "bg-main-400"
                    } w-[40px] h-[40px] flex justify-center items-center rounded-[999px] cursor-pointer transition-all`}
                    onClick={() => setIsHeart((prev) => !prev)}
                  >
                    {isHeart ? (
                      <AiFillHeart size={20}></AiFillHeart>
                    ) : (
                      <AiOutlineHeart size={20}></AiOutlineHeart>
                    )}
                  </span>
                  <span className="bg-main-400 w-[40px] h-[40px] cursor-pointer flex justify-center items-center rounded-[999px]">
                    <HiOutlineDotsHorizontal
                      size={20}
                    ></HiOutlineDotsHorizontal>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-auto text-[14px] h-full">
          <div className="flex gap-1">
            <p>
              <span className=" text-white-300 font-bold">Lời tựa </span>
              {playlistData?.sortDescription}
            </p>
          </div>
          <Lists totalDuration={playlistData?.song?.totalDuration}></Lists>
        </div>
      </div>
      <div className="h-[90px] w-full"></div>
    </div>
  );
};

export default memo(Album);
