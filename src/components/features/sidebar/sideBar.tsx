// import React, { useState } from "react";
import Earning from "./earning";
import Request from "./request";
import Money from "./money";
import MyWallet from "./myWallet";
import TipzyWallet from "./tipzyWallet";
import Settings from "./setting";
import HelpFaq from "./helpFaq";
// import DarkMode from "./darkMode";
import { useLocation } from "react-router-dom";
import PublishPlaylist from "./publishPlaylist";
import QR from "./qr";
import tipzy from "/assets/tipzy.svg";

const Sidebar = () => {
  // const [clicked, setClicked] = useState("true");
  const location = useLocation();

  const activeRoute = location.pathname.substring(1);

  return (
    <div className="w-[20%] min-w-[250px] sticky left-0 overflow-scroll overscroll-contain scroll-smooth bg-black flex-shrink-0">
      <div className="aspect-square h-20 my-2 ml-6">
        <img src={tipzy} className="h-full" />
      </div>
      <div className="w-full px-6 m-auto rounded-3xl flex flex-col">
        <div className="w-full">
          <Earning />
          <PublishPlaylist activeRoute={activeRoute} />
          <QR activeRoute={activeRoute} />

          <div className="w-full h-[1px] mt-2 bg-zinc-400"></div>
          <Request activeRoute={activeRoute} />
          <Money activeRoute={activeRoute} />

          <div className="w-full h-[1px] mt-2 bg-zinc-400"></div>

          <MyWallet />
          <TipzyWallet />

          <div className="w-full h-[1px] mt-2 bg-zinc-400"></div>
          <Settings />
          <HelpFaq />
          {/* <DarkMode /> */}
        </div>

        {/* <SignOut /> */}
      </div>
    </div>
  );
};

export default Sidebar;
