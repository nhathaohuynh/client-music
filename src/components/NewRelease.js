import React from "react";
import { useState } from "react";
import { memo } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";
import SongItem from "./SongItem";
import { useEffect } from "react";

const NewRelease = () => {
  const { newRelease } = useSelector((state) => state.app);
  const [active, setActive] = useState(0);
  const [caterogy, setCategory] = useState([]);

  useEffect(() => {
    if (active === 0) {
      setCategory(newRelease?.items?.all);
    } else if (active === 1) {
      setCategory(newRelease?.items?.vPop);
    } else {
      setCategory(newRelease?.items?.others);
    }
  }, [active]);
  const handleClickButton = (value) => {
    setActive(value);
  };
  // console.log(newRelease?.items?.all);

  return (
    <div className="mt-[48px] px-[46px]">
      <h3 className="text-[20px] mb-[20px] capitalize font-bold pl-3 select-none">
        {newRelease?.title}
      </h3>
      <div className="flex gap-3 pl-3 mb-[20px]">
        <Button
          clickButton={handleClickButton}
          isActive={active === 0 ? true : false}
          value={0}
        >
          Tất Cả
        </Button>
        <Button
          clickButton={handleClickButton}
          isActive={active === 1 ? true : false}
          value={1}
        >
          Việt Nam
        </Button>
        <Button
          clickButton={handleClickButton}
          isActive={active === 2 ? true : false}
          value={2}
        >
          Quốc Tế
        </Button>
      </div>
      <div className="flex flex-wrap w-full pl-3 gap-2">
        {caterogy?.map((item, index) => {
          if (index > 11) return<></>;
          return (
            <div key={crypto.randomUUID()} className="w-[45%] lg:w-[30%] flex flex-auto">
              <SongItem
                encodeId={item.encodeId}
                thumbnail={item.thumbnail}
                title={item.title}
                artistsNames={item.artistsNames}
                releaseDate={item.releaseDate}
              ></SongItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(NewRelease);
