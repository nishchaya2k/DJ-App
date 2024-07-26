// import earningCurve from "../../../assets/Line.png";
import coin from "/assets/coin.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiArrowUpFill } from "react-icons/ri";
import EarningChart from "./earningChart";
import { useState, useEffect } from "react";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";

const Earning = () => {
  const [active, setActive] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleCard = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    if (active) {
      // Delay showing the content after 300ms
      const timeout = setTimeout(() => {
        setShowContent(true);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      setShowContent(false);
    }
  }, [active]);

  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      onClick={() => handleCard()}
      className={`w-full ${
        active ? "h-40 bg-[#3F444E]" : "h-[54px]"
      } flex flex-col justify-between py-4 active:scale-[0.98] rounded-3xl hover:bg-[#3F444E] transition-all duration-200 ease-in-out`}
    >
      <div className="w-11/12 h-5 mx-auto flex justify-between items-center text-white">
        <div className="h-full flex justify-center items-center text-[15px] gap-2 font-NeueMontreal font-semibold tracking-wider">
          <img src={coin} className="h-full ml-1" />
          Current Earning
        </div>

        <div className="h-full flex items-center cursor-pointer">
          <MdOutlineKeyboardArrowDown className="h-full w-full" />
        </div>
      </div>
      {showContent && (
        <div className="relative w-full aspect-square mt-2">
          <div className="py-1 pl-3 px-4 flex justify-center transition-all ease-in-out duration-200">
            <EarningChart />
          </div>
          <div className="absolute bottom-0 left-0 right-4 w-[full] mx-auto flex items-end transition-all ease-in-out duration-200 justify-end">
            <div className="flex flex-col">
              <div className=" text-[#EFEFEF] text-[12px] font-NeueMontreal font-semibold text-opacity-90 tracking-wide">
                Balance
              </div>
              <div className="w-max h-max p-1 rounded-full bg-[#70CD97]">
                <RiArrowUpFill />
              </div>
            </div>

            <div className="text-white font-extrabold text-lg tracking-wide font-NeueMontreal-Bold text-opacity-75">
              ₹21,533.10
            </div>
          </div>
        </div>
      )}
      <Ripple />
    </button>
  );
};

export default Earning;
