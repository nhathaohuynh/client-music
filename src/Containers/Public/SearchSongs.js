import React from "react";
import { useSelector } from "react-redux";
import * as apis from "../../Apis";
import { useEffect, useState } from "react";
import { List } from "../../components";
import { v4 as uuidv4 } from "uuid";

const SearchSongs = () => {
  const { search, curSongData } = useSelector((state) => state.music);
  const [artistSongs, setArtistSongs] = useState();
  useEffect(() => {
    const fectchingData = async () => {
      const res = await apis.apiGetArtistSongs(
        search?.top?.id || search?.artists[0]?.id
      );
      console.log(res);
      if (res?.data?.err === 0) {
        if (res.data.data?.items.length <= 1) {
          setArtistSongs(search.songs);
        } else {
          setArtistSongs(res.data.data?.items);
        }
        return true;
      } else {
        setArtistSongs(search.songs);
        return false;
      }
    };
    fectchingData();
  }, []);
  return (
    <div className="px-[59px]">
      <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
        Bài Hát
      </h3>
      <div className="flex flex-col">
        {artistSongs &&
          artistSongs?.map((song) => (
            <List
              key={uuidv4()}
              songData={song}
              isHideNote
              songPlaying={song.encodeId === curSongData.encodeId}
              isShowTitle
            ></List>
          ))}
      </div>
    </div>
  );
};

export default SearchSongs;
