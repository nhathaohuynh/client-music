import React from "react";
import { useState } from "react";
import * as apis from "../Apis";
import icon from "../Utils/icon";
import { useDispatch } from "react-redux";
import * as actions from "../store/Action";
import { useNavigate, createSearchParams } from "react-router-dom";
import path from "../Utils/path";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const { CiSearch, IoCloseSharp } = icon;

const Search = () => {
  const inputRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const dispatch = useDispatch();

  const handlePressEnter = (e) => {
    if (e.keyCode === 13 && keywords) {
      dispatch(actions.search(keywords));
      navigate({
        pathname: `/${path.SEARCH}/${path.SEARCHSONGALL}`,
        search: createSearchParams({
          q: keywords,
        }).toString(),
      });
    }
  };
  const handleClickIconSearch = () => {
    if (keywords) {
      dispatch(actions.search(keywords));
      navigate({
        pathname: `/${path.SEARCH}/${path.SEARCHSONGALL}`,
        search: createSearchParams({
          q: keywords,
        }).toString(),
      });
    }
  };
  const handleClickDeleteKeyWords = () => {
    if (inputRef) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    if (params) {
      inputRef.current.value ="";
      setKeywords("");
    }
  }, [params]);
  return (
    <div className="w-full flex items-center">
      <button
        className="h-10 px-4 flex items-center bg-[rgba(255,255,255,0.1)] rounded-l-[999px] pr-0 hover:bg-[rgba(255,255,255,0.2)]"
        onClick={handleClickIconSearch}
      >
        <CiSearch size={24}></CiSearch>
      </button>
      <input
        ref={inputRef}
        type="text"
        className={`outline-none bg-[rgba(255,255,255,0.1)] px-4 py-2 h-10 w-full text-white-200 placeholder:text-white-200 pl-2 placeholder:font-normal text-sm font-medium ${
          !keywords && "rounded-r-full"
        }`}
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onChange={(e) => setKeywords(e.target.value)}
        onKeyUp={handlePressEnter}
      />
      {keywords && (
        <button
          className="h-10 px-2 flex items-center text-white-200 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] rounded-r-[999px]"
          onClick={() => setKeywords(handleClickDeleteKeyWords)}
        >
          <IoCloseSharp size={22}></IoCloseSharp>
        </button>
      )}
    </div>
  );
};
export default Search;
