import React from "react";
import {
  Slider,
  Section,
  ChartSection,
  NewRelease,
  Artist,
} from "../../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuiv4 } from "uuid";

export default function Home() {
  const { friday, autoTheme2, top100, nhacmoi, weekChart, favouriteSinger } =
    useSelector((state) => state.app);

  return (
    <div className="h-full w-full z-10">
      <Slider></Slider>
      <Section data={friday}></Section>
      <Section data={favouriteSinger}></Section>
      <ChartSection></ChartSection>
      <div className=" grid grid-cols-3 px-[46px] mt-12">
        {weekChart?.map((item) => (
          <Link
            to={item?.link.split(".")[0]}
            key={crypto.randomUUID()}
            className="flex-1 px-4"
          >
            <img
              src={item?.cover}
              alt="cover"
              className="w-full object-fill rounded-md"
            />
          </Link>
        ))}
      </div>
      <Section data={autoTheme2}></Section>
      <Section data={top100}></Section>
      <NewRelease></NewRelease>
      <Section data={nhacmoi}></Section>
    </div>
  );
}
