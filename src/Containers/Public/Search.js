import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import path from "../../Utils/path";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const [active, setActive] = useState(1);
  const [searchParams] = useSearchParams();
  // console.log(searchParams.entries());
  useEffect(() => {
    for (const entry of searchParams.entries()) {
      if (entry.length) {
        setActive(1);
      }
    }
  }, [searchParams]);
  return (
    <div className="mt-[90px]">
      <div className="w-full border-b border-[rgba(255,255,255,0.1)] flex items-center px-[58px] mb-10">
        <h3 className="text-[24px] font-bold pr-[20px] capitalize border-r border-[rgba(255,255,255,0.1)]">
          Kết quả tìm kiếm
        </h3>
        <ul className="uppercase flex gap-10 text-[14px] font-semibold ml-5 text-white-200">
          <NavLink to={path.SEARCHSONGALL}>
            <li
              className={`tracking-wider py-[14px] cursor-pointer hover:text-white-100 transition-all ${
                active === 1
                  ? " border-main-500 text-white-100"
                  : "border-b-transparent"
              } border-b-2 `}
              onClick={() => setActive(1)}
            >
              Tất cả
            </li>
          </NavLink>
          <NavLink to={path.SEARCHSONG}>
            <li
              className={`tracking-wider py-[14px] cursor-pointer hover:text-white-100 transition-all ${
                active === 2
                  ? " border-main-500 text-white-100"
                  : "border-b-transparent"
              } border-b-2 `}
              onClick={() => setActive(2)}
            >
              Bài hát
            </li>
          </NavLink>
          <NavLink to={path.SEARCH_PLAYLIST_ALBUM}>
            <li
              className={`tracking-wider py-[14px] cursor-pointer hover:text-white-100 transition-all border-b-2  ${
                active === 3
                  ? "border-main-500 text-white-100"
                  : "border-b-transparent"
              } `}
              onClick={() => setActive(3)}
            >
              Playlist/Album
            </li>
          </NavLink>
          <NavLink to={path.SEARCH_ARTIST}>
            <li
              className={`tracking-wider py-[14px] cursor-pointer hover:text-white-100 transition-all ${
                active === 4
                  ? " border-main-500 text-white-100"
                  : "border-b-transparent"
              } border-b-2 `}
              onClick={() => setActive(4)}
            >
              Nghệ sĩ/OA
            </li>
          </NavLink>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Search;
