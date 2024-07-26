import publishPlaylist from "/assets/publishPlaylist.svg";
import { useNavigate } from "react-router-dom";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";

interface Props {
  activeRoute: string;
}
const PublishPlaylist = ({ activeRoute }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className={`w-full h-14 mt-8 flex flex-col justify-center rounded-2xl cursor-pointer hover:bg-[#3F444E] transition-all duration-100 ease-in-out ${
        activeRoute === "artist/publishPlaylist" ? "bg-[#3F444E]" : ""
      }`}
      onClick={() => navigate("/artist/publishPlaylist")}
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-[#A2A3A4]">
        <div className="h-1/2 flex items-center justify-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img
              src={publishPlaylist}
              className="h-[90%]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div className="text-sm font-NeueMontreal font-semibold tracking-wide">
            Publish Playlist
          </div>
        </div>
      </div>
      <Ripple />
    </button>
  );
};

export default PublishPlaylist;
