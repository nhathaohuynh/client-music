import React from "react";
import { logo } from "../assets";
import menuSideBarLeft from "../Utils/menu";
import { NavLink } from "react-router-dom";

const notActiveStyle =
  "py-2 px-[25px] font-bold flex items-center gap-3 text-[14px] text-white-200 border border-[#231b2e] border-[3px] hover:text-[#fff]";
const activeStyle =
  "py-2 px-[25px] font-bold flex items-center gap-3 text-[14px] text-[#ffffff] border border-[3px] border-l-[#9b4de0] border-transparent bg-[#dadada]/10";
const SideBarLeft = () => {
  return (
    <div className="bg-main-400 h-full">
      <div className="h-[70px] w-full px-[25px] py-[25px] flex justify-start items-center mb-4">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-[120px] h-[40px]" />
        </NavLink>
      </div>
      <div className="flex flex-col">
        {menuSideBarLeft.map((item) => (
          <NavLink
            to={item.path}
            key={crypto.randomUUID()}
            end={item.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBarLeft;
