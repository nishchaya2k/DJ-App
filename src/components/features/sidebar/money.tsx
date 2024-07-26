// import React from "react";
import moneyIcon from "/assets/moneyIcon2.svg";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";

interface Props {
  activeRoute: string;
}

const Money = ({ activeRoute }: Props) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className={`w-full h-14 mt-2 flex flex-col justify-center rounded-2xl cursor-pointer hover:bg-[#3F444E] transition-all duration-100 ease-in-out ${
        activeRoute === "artist/money" ? "bg-[#3F444E]" : "null"
      }`}
      onClick={() => navigate("/artist/money")}
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-white">
        <div className="h-1/2 flex items-center gap-2">
          <div className="w-6 h-6">
            <img src={moneyIcon} className="h-full" />
          </div>

          <div className="text-[#A2A3A4] tracking-wide text-sm font-NeueMontreal font-semibold">
            Money
          </div>
        </div>
      </div>
      <Ripple />
    </button>
  );
};

export default Money;
