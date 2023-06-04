import React from "react";

const Button = ({ children, clickButton, isActive, value }) => {
  // console.log(isActive);
  // console.log(children)
  return (
    <button
      type="button"
      onClick={() => clickButton(value)}
      className={`py-1 px-4 rounded-full border uppercase text-[12px] font-medium border-white-300 ${
        isActive ? "bg-main-500" : "ng-transparent"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
