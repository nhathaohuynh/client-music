import React from "react";
import { memo } from "react";
import SectionItem from "./SectionItem";

const Section = ({ data }) => {
  return (
    <div className="mt-[48px] px-[46px]">
      <h3 className="text-[20px] mb-[20px] capitalize font-bold pl-3 select-none">
        {data?.title}
      </h3>
      <div className="grid grid-cols-5">
        {data?.items?.length &&
          data?.items?.map((item, index) => {
            if (index > 4) {
              return <></>;
            }
            return (
              <SectionItem
                data={data}
                item={item}
                key={crypto.randomUUID()}
              ></SectionItem>
            );
          })}
      </div>
    </div>
  );
};

export default memo(Section);
