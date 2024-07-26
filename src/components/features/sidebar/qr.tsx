import { useNavigate } from "react-router-dom";
import { MdQrCodeScanner } from "react-icons/md";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";
interface Props {
  activeRoute: string;
}

const QR = ({ activeRoute }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
      className={`w-full h-14 mt-2 flex flex-col justify-center rounded-2xl cursor-pointer hover:bg-[#3F444E] transition-all duration-100 ease-in-out ${
        activeRoute === "artist/qr" ? "bg-[#3F444E]" : "null"
      }`}
      onClick={() => navigate("/artist/qr")}
    >
      <div className="w-11/12 h-full mx-auto flex justify-between items-center text-white">
        <div className="h-1/2 flex items-center gap-2">
          <div className="w-[24px] h-[24px] flex justify-center items-center">
            <MdQrCodeScanner className="h-full w-full" />
          </div>

          <div className="text-[#A2A3A4] tracking-wide text-sm font-NeueMontreal font-semibold">
            Show My QR
          </div>
        </div>
      </div>
      <Ripple />
    </button>
  );
};

export default QR;
