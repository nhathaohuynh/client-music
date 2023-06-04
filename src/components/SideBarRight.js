import React from "react";
import icon from "../Utils/icon";
import { useState } from "react";
import SongItem from "./SongItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import * as actions from "../store/Action";

const { RxTrash } = icon;
const SideBarRight = () => {
  const dispatch = useDispatch();
  let { curSongData, nextSongs, curSongID, recentSong, songs } = useSelector(
    (state) => state.music
  );
  const [isActive, setIsActive] = useState(true);
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    let indexNextSong;
    if (!nextSongs?.length) {
      nextSongs = songs;
    }
    const playlistSort = nextSongs.reduce((acumulator, song, index) => {
      if (song.encodeId === curSongData.encodeId) {
        if (index === nextSongs?.length - 1) {
          indexNextSong = 0;
        } else {
          indexNextSong = index + 1;
        }
        return [nextSongs[indexNextSong], ...acumulator];
      }
      if (index === nextSongs?.length - 1) {
        indexNextSong = indexNextSong || 0;
      }
      return [...acumulator, song];
    }, []);

    const shuffleArray = (array) => {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    };
    const playlistShulffle = nextSongs.length
      ? [nextSongs[indexNextSong], ...shuffleArray(playlistSort)]
      : [...shuffleArray(playlistSort)];
    setPlaylist([...new Set(playlistShulffle)]);
  }, [nextSongs, curSongData, curSongID]);

  const handleRemoveList = () => {
    if (isActive) dispatch(actions.removePlaylist());
    else dispatch(actions.removeRecentSongs());
  };
  return (
    <div className="bg-main-300 h-full w-full border-l border-[rgba(255,2552,255,0.1)] text-sm">
      <div className="h-[70px] w-full py-[14px] pl-2 pr-5  flex items-center justify-between">
        <div className="flex p-[3px] bg-[rgba(255,255,255,0.1)] rounded-full flex-1 items-center text-[12px]">
          <span
            className={`py-[5px] cursor-pointer rounded-full font-medium flex items-center grow justify-center ${
              isActive && "bg-[rgba(255,255,255,0.2)]"
            }`}
            onClick={() => setIsActive(true)}
          >
            Danh sách phát
          </span>
          <span
            className={`flex items-center py-[5px] cursor-pointer font-medium grow rounded-full justify-center
            ${!isActive && "bg-[rgba(255,255,255,0.2)]"}`}
            onClick={() => setIsActive(false)}
          >
            Nghe gần đây
          </span>
        </div>
        <span
          className="ml-10 w-[36px] h-[36px] cursor-pointer flex justify-center items-center rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
          onClick={handleRemoveList}
        >
          <RxTrash size={20}></RxTrash>
        </span>
      </div>
      <Scrollbars
        style={{ width: "calc(100% - 5px)", height: "calc(100% - 5px)" }}
        autoHide={true}
        autoHeightMin={300}
        autoHeightMax={100}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
        renderView={(props) => <div {...props} className="view" />}
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
      >
        {isActive && (
          <div className="px-[8px]">
            {curSongID && (
              <>
                <div className="pt-[8px] pr-[12px] pb-3">
                  <SongItem
                    thumbnail={curSongData.thumbnailM}
                    title={curSongData.title}
                    artistsNames={curSongData.artistsNames}
                    sm
                    custom="bg-main-500"
                  ></SongItem>
                </div>
                <span className="font-bold text-sm pb-3">Tiếp theo</span>
              </>
            )}
            <div className="pt-[8px] pr-[12px]">
              {playlist &&
                playlist?.map((song) => (
                  <SongItem
                    key={crypto.randomUUID()}
                    encodeId={song?.encodeId}
                    thumbnail={song?.thumbnailM}
                    title={song?.title}
                    artistsNames={song?.artistsNames}
                    sm
                  ></SongItem>
                ))}
            </div>
          </div>
        )}
        {!isActive && (
          <div className="pt-[8px] pr-[12px] px-[8px]">
            {recentSong &&
              [...new Set(recentSong)]?.map((song) => (
                <SongItem
                  key={crypto.randomUUID()}
                  encodeId={song?.encodeId}
                  thumbnail={song?.thumbnailM}
                  title={song?.title}
                  artistsNames={song?.artistsNames}
                  sm
                ></SongItem>
              ))}
          </div>
        )}
        <div className="h-[170px] w-full"></div>
      </Scrollbars>
    </div>
  );
};
export default SideBarRight;
