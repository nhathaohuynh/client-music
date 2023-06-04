import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../Apis";
import icon from "../../Utils/icon";
import * as fcSupport from "../../Utils/fcSupported";
import { v4 as uuidv4 } from "uuid";
import { Artist, List, SectionItem } from "../../components";
import { useSelector } from "react-redux";

const { BsFillPlayFill, AiOutlineUserAdd } = icon;

const Singer = () => {
  const { name } = useParams();
  const { curSongID } = useSelector((state) => state.music);
  const [infoSinger, setInfoSinger] = useState();

  useEffect(() => {
    const fetchingDataSinger = async () => {
      const res = await apis.apiGetArtist(name);
      if (res.data.err === 0) {
        setInfoSinger(res.data.data);
        return true;
      } else {
        setInfoSinger({});
        return false;
      }
    };
    fetchingDataSinger();
  }, [name, curSongID]);
  console.log(infoSinger);
  console.log(curSongID);
  return (
    <div className="w-full">
      <div className="relative aspect-[3/1] height-[400px]">
        <img
          src={infoSinger?.cover}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-[1]  "></div>
        <div className="absolute bottom-[24px] left-[48px] z-20">
          <div className="flex items-center gap-5 justify-start mb-3">
            <h1 className="capitalize text-[60px] font-bold">
              {infoSinger?.name || "No name"}
            </h1>
            <span className="cursor-pointer w-[60px] h-[60px] rounded-full text-main-500 bg-white-100 hover:bg-main-500 hover:text-white-100 transition-all flex justify-center items-center">
              <BsFillPlayFill size={36}></BsFillPlayFill>
            </span>
          </div>
          <div className="flex gap-5 items-center justify-start">
            <span className="text-[14px] text-white-100">
              {infoSinger?.totalFollow
                ? fcSupport.dotAfterThreeDigits(
                    infoSinger?.totalFollow?.toString()
                  )
                : "1000"}{" "}
              người quan tâm
            </span>
            <button className="flex items-center border border-white-200 px-5 py-1 bg-[rgba(255,255,255,0.1)] rounded-full gap-2 font-semibold uppercase text-[12px] hover:bg-[rgba(255,255,255,0.2)] text-white-100 transtion-all">
              <span>
                <AiOutlineUserAdd size={20}></AiOutlineUserAdd>
              </span>
              Quan Tâm
            </button>
          </div>
        </div>
      </div>
      <div className="px-[48px] mt-[48px]">
        {infoSinger &&
          infoSinger?.sections?.map((section) => {
            if (section?.sectionType === "song") {
              const songs = section.items;
              return (
                <div key={uuidv4()} className="mb-20">
                  <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4">
                    {songs?.length &&
                      songs.map((song, index) => {
                        if (index > 9) {
                          return <></>;
                        }
                        return (
                          <List
                            songData={song}
                            isHideNote
                            isHideAlbum
                            songPlaying={song?.encodeId === curSongID}
                            key={uuidv4()}
                          ></List>
                        );
                      })}
                  </div>
                </div>
              );
            } else if (section?.sectionType === "playlist") {
              const playlists = section.items;
              return (
                <div className="mb-10">
                  <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-5">
                    {playlists?.length &&
                      playlists.map((item, index) => {
                        if (index > 4) {
                          return <></>;
                        }
                        return (
                          <SectionItem
                            item={item}
                            key={uuidv4()}
                            artists
                          ></SectionItem>
                        );
                      })}
                  </div>
                </div>
              );
            } else if (section?.sectionType === "artist") {
              const artists = section.items;
              return (
                <div>
                  <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-5 gap-x-1">
                    {artists?.length &&
                      artists.map((artist, index) => {
                        if (index > 4) {
                          return <></>;
                        }
                        return <Artist artist={artist} key={uuidv4()}></Artist>;
                      })}
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
      {infoSinger?.biography && (
        <div className="px-[48px] mt-[48px]">
          <div>
            <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
              Về {infoSinger?.name}
            </h3>
          </div>
          <div className="flex gap-5">
            <div className="w-[40%] h-[270px] rounded-md ">
              <img
                src={infoSinger?.thumbnailM}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between items-start pb-[32px] w-[50%]">
              <p
                className="text-white-300 font-semibold text-[16px] hideText"
                dangerouslySetInnerHTML={{
                  __html: infoSinger?.biography.replace(/\n/g, "<br />"),
                }}
              ></p>
              <div className="flex flex-col gap-2">
                <span className="text-[24px] font-bold">
                  {infoSinger?.totalFollow
                    ? fcSupport.dotAfterThreeDigits(
                        infoSinger?.totalFollow?.toString()
                      )
                    : "1000"}{" "}
                </span>
                <span className="text-white-300 font-semibold text-[16px]">
                  Người quan tâm
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Singer;
