import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Artist, List } from "../../components";
import SectionItem from "../../components/SectionItem";
import * as actions from "../../store/Action";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const SearchSongAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { curSongID, search } = useSelector((state) => state.music);
  const convertNumber = (number) => {
    const formater = Intl.NumberFormat("en", { notation: "compact" });
    return formater.format(number);
  };
  const handleClickSong = (encodeId) => {
    dispatch(actions.isPlaySong(false));
    dispatch(actions.setCurSongID(encodeId));
    dispatch(actions.isPlaySong(true));
  };

  const handleClickSingerOrSong = (isSong, encodeId = "", nameSinger = "") => {
    if (isSong) {
      handleClickSong(encodeId);
    } else {
      const path = `/ca-si/${nameSinger.replace(" ", "-")}`;
      navigate(path);
    }
    console.log(isSong, encodeId);
  };
  const isCheckEmptyObject = (object) => {
    for (let prop in object) return false;
    return true;
  };
  console.log(search);
  return (
    <>
      {!isCheckEmptyObject(search) && (
        <div className="px-[58px]">
          {search?.top && (
            <div>
              <h3 className="text-[21px] mb-5 text-white-100 capitalize font-bold">
                Nổi bật
              </h3>
              <div className="flex gap-4">
                {search?.top && (
                  <div className="w-[33%] p-[10px] bg-[rgba(255,255,255,0.1)] rounded-md hover:bg-[rgba(255,255,255,0.2)] cursor-pointer transition-all">
                    <div
                      className="flex gap-4 items-center"
                      onClick={() =>
                        handleClickSingerOrSong(
                          search?.top?.objectType === "song",
                          search?.top?.encodeId,
                          search?.top?.artists[0].alias
                        )
                      }
                    >
                      <img
                        src={
                          search?.top?.objectType !== "song"
                            ? search?.artists[0]?.thumbnailM
                            : search?.top?.thumbnail
                        }
                        alt="avatar"
                        className={`w-[84px] h-[84px] object-cover  ${
                          search?.top.objectType !== "song"
                            ? "rounded-full"
                            : "rounded-md"
                        }`}
                      />
                      <div className="flex flex-col text-[13px] text-white-300 font-semibold">
                        <span className="mb-[4px]">
                          {search?.top.objectType !== "song"
                            ? "Nghệ sĩ"
                            : "Bài hát"}
                        </span>
                        <span className="text-[15px] font-bold text-white-100 hover:text-main-500 hover:underline transition-all">
                          {search?.top.objectType !== "song"
                            ? search?.top.artistsNames || search?.top.name
                            : search?.top.title}
                        </span>
                        {search?.top.objectType !== "song" ? (
                          <span className="mt-[1px]">
                            {convertNumber(
                              search?.artists[0].totalFollow || 1e9
                            )}{" "}
                            quan tâm
                          </span>
                        ) : (
                          <span className="mt-[1px]">
                            {search.top.artistsNames}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {search?.songs &&
                  search?.songs
                    ?.filter((song, index) => {
                      if (search?.top.objectType === "song") {
                        return index > 0 && index <= 2;
                      }

                      return index >= 0 && index < 2;
                    })
                    .map((song) => (
                      <div
                        key={crypto.randomUUID()}
                        className="w-[33%] p-[10px] bg-[rgba(255,255,255,0.1)] rounded-md hover:bg-[rgba(255,255,255,0.2)] cursor-pointer transition-all"
                        onClick={() => handleClickSong(song.encodeId)}
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={song.thumbnail}
                            alt="avatar"
                            className={`w-[84px] h-[84px] object-cover  ${"rounded-md"}`}
                          />
                          <div className="flex flex-col text-[13px] text-white-300 font-semibold">
                            <span className="mb-[4px]">Bài hát</span>
                            <span className="text-[15px] font-bold text-white-100 hover:text-main-500 hover:underline transition-all">
                              {song.title.charAt(20)
                                ? `${song.title.slice(0, 22)}...`
                                : song.title}
                            </span>
                            <span className="mt-[1px]">
                              {search.top.artistsNames || search?.top.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          )}

          {search?.songs && (
            <div>
              <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                Bài Hát
              </h3>
              <div className="grid grid-cols-2 gap-x-8">
                {search?.songs &&
                  search.songs
                    .filter((song, index) => index < 6)
                    .map((song) => {
                      return (
                        <List
                          key={uuidv4()}
                          songData={song}
                          isHideAlbum
                          isHideNote
                          songPlaying={song.encodeId === curSongID}
                        ></List>
                      );
                    })}
              </div>
            </div>
          )}

          {search?.playlists && (
            <div>
              <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                Playlist/Album
              </h3>
              <div className="grid grid-cols-5 gap-x-1">
                {search?.playlists?.length &&
                  search?.playlists.map((item, index) => {
                    if (index > 4) {
                      return <></>;
                    }
                    return (
                      <SectionItem
                        item={item}
                        key={crypto.randomUUID()}
                        artists
                      ></SectionItem>
                    );
                  })}
              </div>
            </div>
          )}

          {search?.artists && (
            <div>
              <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
                Nghệ sĩ /OA
              </h3>
              <div className="grid grid-cols-5 gap-x-1">
                {search?.artists?.length &&
                  search?.artists.map((artist, index) => {
                    if (index > 4) {
                      return <></>;
                    }
                    return <Artist artist={artist} key={uuidv4()}></Artist>;
                  })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchSongAll;
