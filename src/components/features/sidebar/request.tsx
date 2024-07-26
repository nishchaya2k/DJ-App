import requestIcon from "/assets/requestIcon.svg";
import requestP1 from "/assets/requestP1.svg";
import requestP2 from "/assets/requestP2.svg";
import requestP3 from "/assets/requestP3.svg";
import { useNavigate } from "react-router-dom";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";

interface Props {
  activeRoute: string;
}

const Request = ({ activeRoute }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className={`w-full h-14 mt-2 flex flex-col justify-center rounded-2xl cursor-pointer text-xs hover:bg-[#3F444E] transition-all duration-100 ease-in-out ${
        activeRoute === "artist/request" ? "bg-[#3F444E]" : ""
      }`}
      onClick={() => navigate("/artist/request")}
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-[#A2A3A4]">
        <div className="h-1/2 flex items-center gap-2">
          <img src={requestIcon} className="h-full" />

          <div className="text-sm font-NeueMontreal font-semibold tracking-wide">
            Requests
          </div>
        </div>
        <div className="w-24 h-8 flex items-center justify-center relative">
          <div className="w-[32px] h-full rounded-lg absolute right-12 top-0 z-20">
            <img src={requestP1} className="w-full h-full  rounded-lg" />
          </div>
          <div className="h-full w-[32px] rounded-lg absolute right-6 top-0 z-10">
            <img src={requestP2} className="w-full h-full" />
          </div>
          <div className="h-full w-[32px] rounded-lg  absolute right-0 top-0 z-2">
            <img src={requestP3} className="w-full h-full" />
          </div>
        </div>
      </div>
      <Ripple />
    </button>
  );
};

export default Request;
// bg-[#3F444E]
