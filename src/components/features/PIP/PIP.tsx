import { useSelector } from "react-redux";
import { selectPendingPlayist } from "../../../store/reducer/bidListReducer";
import cartoon2 from "/assets/cartoon2.png";

const PIP = () => {
  const pendingPlaylist = useSelector(selectPendingPlayist);
  document.pictureInPictureElement;

  console.log(pendingPlaylist);
  return (
    <div className="h-dvh w-full pt-20 pb-10 px-6 ">
      <div className="flex flex-col items-start gap-10 h-full w-full ">
        {pendingPlaylist.map((listItem, index) => {
          return (
            <div
              className={`flex justify-between gap-40 hover:scale-[0.99] transition-all duration-500 ease-in-out ${
                index === 0
                  ? "w-[77.1%] pl-4 rounded-xl overflow-hidden mb-12"
                  : "w-3/4 pl-4 rounded-xl overflow-hidden"
              }`}
              style={{
                boxShadow: "rgba(0, 0, 0, 0.4) 1px 1px 60px 0px",
              }}
            >
              <div
                className={`w-full flex flex-col justify-center gap-4 text-white  ${
                  index === 0
                    ? "h-40 text-2xl font-NeueMontreal font-semibold"
                    : " h-28 text-lg font-NeueMontreal"
                }`}
              >
                <div
                  className={`w-full tracking-wide ${index === 0 ? "" : ""}`}
                >
                  {listItem?.userData?.name === "string"
                    ? listItem?.userData?.name
                    : "Unknown"}
                </div>
                <div className=" tracking-wide">Rs. {listItem.bidAmount}</div>
              </div>
              <div
                className={`h-full border-white bg-[#A9F000] ${
                  index === 0 ? "w-64" : " w-40"
                }`}
              >
                {" "}
                <img src={cartoon2} className="h-full w-full" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PIP;
