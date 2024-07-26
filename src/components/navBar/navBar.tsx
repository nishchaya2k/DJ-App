// import React, { Component } from "react";
import tipzy from "/assets/tipzy.svg";
// import { FaSearch } from "react-icons/fa";
// import searchIcon from "../../assets/searchIcon.png";
// import searchIcon from "../../assets/searchIcon.png";
import messageIcon from "/assets/messageIcon.svg";
import notificationIcon from "/assets/notificationIcon.svg";
import Picture from "/assets/DefaultUserImage.svg";
import { useNavigate } from "react-router-dom";
import SignOut from "../features/sidebar/signOut";
interface Props {
  isMobile: boolean;
}

const NavBar = ({ isMobile }: Props) => {
  const navigate = useNavigate();
  return !isMobile ? (
    <div className="w-[79.99%] h-[56px] fixed top-0 z-50 bg-black">
      <div className="w-[96.5%] h-full mx-auto flex items-center justify-end">
        <div className="flex justify-center items-center gap-4 lg:gap-8">
          {/* <div className="text-[#A2A3A4] flex justify-center items-center gap-2 lg:gap-4">
            <div className="text-[17px] font-NeueMontreal">Closed</div>

            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[34px] h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#9A9A9A] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[6px] after:bg-white after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-white peer-checked:after:bg-[#5C42FF] "></div>
            </label>

            <div className="text-[17px] font-NeueMontreal">Live</div>
          </div> */}

          <div className="aspect-square h-[22px] w-[24px] cursor-pointer">
            <img src={messageIcon} />
          </div>
          <div className="aspect-square h-[22px]  flex justify-center items-center cursor-pointer">
            <img src={notificationIcon} />
          </div>
          <div
            onClick={() => navigate("/artist/profile")}
            className="cursor-pointer rounded-[10px]"
          >
            <img
              src={Picture}
              alt="icon"
              className="aspect-square rounded-[10px] h-[22px] object-cover"
            />
          </div>
          <SignOut />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full fixed top-0 z-50 flex justify-center bg-black">
      <div className="w-11/12 h-[70px] flex py-[21px] justify-between">
        <img src={tipzy} className="w-[77px] h-[39px]" />

        <div
          onClick={() => navigate("/artist/profile")}
          className="w-[38px] h-[38px] rounded-full"
        >
          <img
            src={Picture}
            className="w-full object-cover rounded-full h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
