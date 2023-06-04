import React from "react";
import { Outlet } from "react-router-dom";
import { SideBarLeft, SideBarRight, Player, Header } from "../../components";
import { useState, useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function Public() {
  const [toggleSidebarRight, setToggleSidebarRight] = useState(true);
  const bgHeaderRef = useRef();
  const refScroll = useRef();
  const params = useParams();

  const scrollEffectHeader = (e) => {
    if (e.target.scrollTop > 90) {
      bgHeaderRef.current.classList.remove("animate-hide-bg-header");
      bgHeaderRef.current.classList.add("animate-show-bg-header");
    } else {
      bgHeaderRef.current.classList.remove("animate-show-bg-header");
      bgHeaderRef.current.classList.add("animate-hide-bg-header");
    }
  };
  useEffect(() => {
    if (refScroll?.current) {
      refScroll?.current?.scrollToTop({
        top: 100,
        left: 100,
        behavior: 'smooth'
      });
    }
  }, [params]);

  return (
    <div className="flex flex-col min-h-screen bg-main-200 relative overflow-hidden max-w-screen pb-[120px]">
      <div className=" flex w-full h-full flex-auto">
        <div className="w-[240px] h-[calc(100% - 90px)] flex-none fixed bottom-0 left-0 top-0 transition-all z-40 ">
          <SideBarLeft></SideBarLeft>
        </div>
        <div
          className={`flex-auto h-[calc(100% - 90px)] pl-[240px] w-full ${
            toggleSidebarRight ? "pr-[330px]" : "pr-[0px]"
          } transition-all relative duration-200`}
        >
          <Scrollbars
            style={{ width: "calc(101%)", height: "calc(102%)" }}
            autoHide={true}
            autoHeightMin={300}
            autoHeightMax={100}
            ref={refScroll}
            renderTrackHorizontal={(props) => (
              <div {...props} className="track-horizontal" />
            )}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
            renderThumbHorizontal={(props) => (
              <div {...props} className="thumb-horizontal" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
            onScroll={scrollEffectHeader}
            className="transition-all"
          >
            <div
              className={`h-[70px] flex items-center text-[#f5f5f6] pl-[48px] pr-[48px] fixed top-0 left-[240px] ${
                toggleSidebarRight ? "right-[330px]" : "right-[0px]"
              } z-50 transition-all`}
              // ${
              //   isBackgroundHeader ? "bg-main-200" : "bg-transaparent"
              // }
            >
              <Header></Header>
            </div>
            <div
              ref={bgHeaderRef}
              className={` px-[63px] fixed top-0  left-[240px] ${
                toggleSidebarRight ? "right-[330px]" : "right-[0px]"
              } bg-main-200 z-40 `}
            ></div>
            <Outlet />
          </Scrollbars>
        </div>
        {toggleSidebarRight ? (
          <div
            className={`w-[330px] h-[calc(100% - 90px)] flex-none animate-hide-sidebar-right fixed right-0 bottom-0 top-0 z-30`}
          >
            <SideBarRight></SideBarRight>
          </div>
        ) : (
          <div
            className={`w-[330px] h-[calc(100% - 90px)] flex-none animate-show-sidebar-right fixed right-0 bottom-0 top-0 z-30`}
          >
            <SideBarRight></SideBarRight>
          </div>
        )}
      </div>
      <div className="flex-none h-[90px] fixed bottom-0 left-0 right-0 transition-all z-50">
        <Player
          setToggleSidebarRight={setToggleSidebarRight}
          toggleSidebarRight={toggleSidebarRight}
        ></Player>
      </div>
    </div>
  );
}
