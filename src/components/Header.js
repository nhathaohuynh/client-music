import React from "react";
import icon from "../Utils/icon";
import Search from "./Search";
import { useNavigate } from "react-router-dom";

const { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } = icon;
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-between items-center">
      <div className="flex items-center gap-x-5 w-full">
        <div className="flex gap-x-4">
          <button
            className=" flex justify-center items-center outline-none hover:text-[#dadada] hover:bg-[rgba(255,2552,255,0.1)] rounded-[999px] w-[40px] h-[40px]"
            onClick={() => navigate(-1)}
          >
            <HiOutlineArrowNarrowLeft size={24}></HiOutlineArrowNarrowLeft>
          </button>
          <button
            className="flex justify-center items-center w-[40px] h-[40px] outline-none hover:text-[#dadada] hover:bg-[rgba(255,2552,255,0.1)] rounded-[999px]"
            onClick={() => navigate(1)}
          >
            <HiOutlineArrowNarrowRight size={24}></HiOutlineArrowNarrowRight>
          </button>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div className="w-[40px] h-[40px] rounded-full">
        <img
          src="https://s120.avatar.talk.zdn.vn/4/d/7/9/3/120/a3f1bfc477488dc8bd3b2b04846bc98a.jpg"
          alt="avatar"
          className="width-full height-full rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;
