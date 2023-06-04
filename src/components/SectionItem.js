import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import icon from "../Utils/icon";
import { useRef } from "react";

const SectionItem = ({ item, data, artists }) => {
  const navigate = useNavigate();
  const [isHoverImage, setIsHoverImage] = useState(false);
  const { BsFillPlayFill, AiOutlineHeart, HiOutlineDotsHorizontal } = icon;
  const imageRef = useRef();

  const handleClickAlbum = (item) => {
    let path = item.link.split(".")[0].split("/");
    const pathAlbum = `/album/${path[path.length - 2]}/${
      path[path.length - 1]
    }`;
    navigate(pathAlbum);
  };

  const handleClickPlayAlbum = (item, event) => {
    event.stopPropagation();
    let path = item.link.split(".")[0].split("/");
    const pathAlbum = `/album/${path[path.length - 2]}/${
      path[path.length - 1]
    }`;
    navigate(pathAlbum, { state: true });
  };

  const handleHoverImage = () => {
    imageRef.current.classList.remove("animate-scale-up-center");
    imageRef.current.classList.add("animate-scale-up-image");
    setIsHoverImage(true);
  };
  const handleHoverImageLeave = () => {
    imageRef.current.classList.remove("animate-scale-up-image");
    imageRef.current.classList.add("animate-scale-up-center");

    setIsHoverImage(false);
  };
  return (
    <div
      key={crypto.randomUUID()}
      className="w-full aspect-square px-3 flex flex-col gap-3 cursor-pointer "
      onClick={() => handleClickAlbum(item)}
    >
      <div
        className="w-full rounded-md relative overflow-hidden z-10"
        onMouseEnter={handleHoverImage}
        onMouseLeave={handleHoverImageLeave}
      >
        {isHoverImage && (
          <div className="z-10 delay-200 transition-all absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center gap-10">
            <span className="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-[rgba(255,255,255,0.2)] transition-all">
              <AiOutlineHeart size={20}></AiOutlineHeart>
            </span>
            <span
              className="w-[45px] h-[45px] border border-white rounded-full flex justify-center items-center hover:bg-[rgba(255,255,255,0.1)] transition-all"
              onClick={(e) => handleClickPlayAlbum(item, e)}
            >
              <BsFillPlayFill size={36}></BsFillPlayFill>
            </span>
            <span className="w-[30px] h-[30px] rounded-full flex justify-center items-center hover:bg-[rgba(255,255,255,0.2)] transition-all">
              <HiOutlineDotsHorizontal size={20}></HiOutlineDotsHorizontal>
            </span>
          </div>
        )}
        <img
          src={item.thumbnailM}
          alt="thumbnail"
          className="w-full h-auto object-fill rounded-md "
          ref={imageRef}
        />
      </div>
      <div className="flex flex-col gap-1 text-[14px]">
        <span
          className="hover:text-main-500 hover:underline font-bold
    whitespace-nowrap text-ellipsis overflow-hidden"
        >
          <NavLink to={() => handleClickAlbum(item)}>{item.title}</NavLink>
        </span>
        {!artists ? (
          <span className="text-white-300 font-bold">
            {data?.sectionId === "h100"
              ? item.artistsNames
              : item.sortDescription.charAt(42)
              ? `${item.sortDescription.slice(0, 42)}...`
              : `${item.sortDescription}`}
          </span>
        ) : (
          <span className="text-white-300 font-bold">
            {item.artists
              ?.reduce((accumlator, curItem, index) => {
                return [...accumlator, curItem.alias.replaceAll("-", " ")];
              }, [])
              ?.toString()
              .charAt(20)
              ? `${item.artists
                  ?.reduce((accumlator, curItem, index) => {
                    return [...accumlator, curItem.alias.replaceAll("-", " ")];
                  }, [])
                  .toString()
                  .slice(0, 20)}...`
              : item.artists
                  ?.reduce((accumlator, curItem, index) => {
                    return [...accumlator, curItem.alias.replaceAll("-", " ")];
                  }, [])
                  .toString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default SectionItem;
