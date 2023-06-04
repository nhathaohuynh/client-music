import React from "react";
import Artist from "../../components/Artist";
import { useSelector } from "react-redux";
import * as fcSupport from "../../Utils/fcSupported";

const SearchArtists = () => {
  const { search } = useSelector((state) => state.music);
  return (
    <>
      {search && (
        <div className="grid grid-cols-5 gap-x-2 gap-y-14 px-[59px]">
          {!fcSupport.isCheckEmptyObject(search?.artists) &&
            search?.artists.map((artist) => (
              <Artist artist={artist} key={crypto.randomUUID()}></Artist>
            ))}
        </div>
      )}
    </>
  );
};

export default SearchArtists;
