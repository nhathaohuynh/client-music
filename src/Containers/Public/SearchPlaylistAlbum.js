import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as apis from "../../Apis";
import { SectionItem } from "../../components";
import { v4 as uuidv4 } from "uuid";

const SearchPlaylistAlbum = () => {
  const [playlist, setPlaylist] = useState();
  const { search } = useSelector((state) => state.music);
  useEffect(() => {
    const featchingData = async () => {
      const res = await apis.apiGetArtist(
        search?.top?.alias || search?.top?.artists[0]?.alias
      );
      if (res.data.err === 0) {
        setPlaylist(res.data.data.sections[1].items); 
        return true;
      }
      else {
        setPlaylist(search.playlists)
        return false;
      }
    };
    featchingData();
  }, []);
  console.log(playlist);
  return (
    <div className="px-[58px]">
      <h3 className="text-[21px] my-5 text-white-100 capitalize font-bold">
        Bài Hát
      </h3>
      <div className="grid grid-cols-5">
        {playlist?.length &&
          playlist.map((item) => {
            return (
              <SectionItem item={item} key={uuidv4()} artists></SectionItem>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPlaylistAlbum;
