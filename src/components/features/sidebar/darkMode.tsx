import darkModeIcon from "/assets/darkModeIcon.svg";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";

const DarkMode = () => {
  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className="w-full h-14 mt-2 flex flex-col justify-center rounded-2xl transition-all duration-100 ease-in-out"
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-white">
        <div className="h-1/2 flex items-center gap-2 ">
          <div className="w-6 h-6 ">
            <img src={darkModeIcon} className="h-full" />
          </div>

          <div className="text-[#A2A3A4] tracking-wide text-sm font-NeueMontreal font-semibold">
            Dark Mode
          </div>
        </div>

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div className="relative w-[34px] h-4 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#9A9A9A] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[6px] after:bg-white after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-white peer-checked:after:bg-[#5C42FF] "></div>
        </label>
      </div>
      <Ripple />
    </button>
  );
};

export default DarkMode;
