import tipzyWalletIcon from "/assets/tipzyWalletIcon.svg";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";
import coming from "/comingsoon.gif";

const TipzyWallet = () => {
  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className="w-full h-14 mt-2 flex flex-col justify-center rounded-2xl cursor-pointer hover:bg-[#3F444E] transition-all duration-100 ease-in-out"
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-white ">
        <div className="h-1/2 flex items-center gap-2 w-full">
          <div className="w-6 h-6 ">
            <img src={tipzyWalletIcon} className="h-full" />
          </div>
          <div className="text-[#A2A3A4] text-sm flex justify-between items-center w-full tracking-wide font-NeueMontreal font-semibold">
            Tipzy Wallet
            <img src={coming} className="aspect-square h-[2.5rem]" />
          </div>
        </div>
      </div>
      <Ripple />
    </button>
  );
};

export default TipzyWallet;
