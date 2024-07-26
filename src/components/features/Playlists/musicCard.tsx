import cartoon from "/assets/cartoon.svg";
import coin from "/assets/coin.svg";
import RequestDetail from "./requestDetail";
import play from "/assets/play.svg";
import { useSelector } from "react-redux";
import { selectToken } from "../../../store/reducer/signInReducer";
import { useEffect, useState } from "react";

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

type Thumbnails = {
  maxres?: Thumbnail;
  standard?: Thumbnail;
  high?: Thumbnail;
  medium?: Thumbnail;
  default?: Thumbnail;
};

type PlaylistProps = {
  heading: string;
  title: string;
  channelName: string;
  bidAmount: number;
  id: string;
  name: string;
  thumbnails: Thumbnails;
  timestamp: string;
  videoId: string;
  fetchPendingPlaylist: any;
  fetchReadyPlaylist: any;
};

const MusicCard = ({
  heading,
  title,
  channelName,
  bidAmount,
  id,
  thumbnails,
  name,
  timestamp,
  videoId,
  fetchPendingPlaylist,
  fetchReadyPlaylist,
}: PlaylistProps) => {
  const [timeOut, setTimeOut] = useState(false);

  let componentToRender;
  switch (heading) {
    case "Pending Request":
      componentToRender = (
        <RequestDetail
          name={name}
          id={id}
          timestamp={timestamp}
          timer={true}
          setTimeOut={setTimeOut}
        />
      );
      break;
    case "Ready to Play":
      componentToRender = (
        <RequestDetail
          name={name}
          id={id}
          timestamp={timestamp}
          timer={false}
          setTimeOut={setTimeOut}
        />
      );
      break;

    default:
      componentToRender = (
        <RequestDetail
          name={name}
          id={id}
          timestamp={timestamp}
          timer={false}
          setTimeOut={setTimeOut}
        />
      );
  }

  const removePlayedSong = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/playedAction`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: authToken,
          },
          body: JSON.stringify({
            bidId: id,
            action: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update bid played status");
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
      fetchReadyPlaylist();
    } catch (err) {
      console.error(err);
    }
  };

  const getThumbnail = (thumbnails: Thumbnails) => {
    if (thumbnails.maxres && thumbnails.maxres.url) return thumbnails.maxres;
    if (thumbnails.standard && thumbnails.standard.url)
      return thumbnails.standard;
    if (thumbnails.high && thumbnails.high.url) return thumbnails.high;
    if (thumbnails.medium && thumbnails.medium.url) return thumbnails.medium;

    return thumbnails.default;
  };

  const thumbnail = getThumbnail(thumbnails);

  // const dispatch = useDispatch();
  const authToken = useSelector(selectToken);

  const handleBidAction = async (bidAction: boolean, id: string) => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}v1/bidAction`;
      const requestBody = {
        bidId: id,
        action: bidAction,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
      if (bidAction) {
        // dispatch(earningsAdded(bidAmount));
        fetchPendingPlaylist();
        fetchReadyPlaylist();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (timeOut && heading === "Pending Request") {
      handleBidAction(false, id);
    }
  }, [timeOut]);
  // w-[208px] h-[328px]
  return (
    <div>
      <div className="w-[208px] h-[300px] rounded-3xl overflow-hidden hover:scale-[0.97] transition-all duration-500 ease-in-out">
        <div
          className={`w-full h-1/2 ${
            heading === "Ready to Play" ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            if (heading === "Ready to Play") {
              window.open(
                `https://www.youtube.com/watch?v=${videoId}`,
                "_blank"
              );
              setTimeout(() => {
                removePlayedSong();
              }, 1000);
            }
          }}
        >
          <img src={thumbnail?.url} className="w-full h-full" />
        </div>
        <div className="w-full h-1/2 px-[6px] flex flex-col justify-evenly  bg-[#3F444E] tracking-normal ">
          <div className=" h-max flex justify-between items-center">
            <div className="w-32 text-white">
              <div className="w-full text-sm leading-tight font-NeueMontreal-Med truncate tracking-wide">
                {title}
              </div>{" "}
              {/*Song title */}
              <div className="w-full text-[#A2A3A4] text-[10px] leading-tight font-NeueMontreal font-semibold tracking-wide truncate">
                {channelName} {/*Description */}
              </div>
            </div>

            <div className="w-7 h-7  bg-[#A9F000] rounded-lg">
              <img src={cartoon} className="" />
            </div>
          </div>

          {/*Bidding */}
          <div className=" h-max flex justify-between items-center  tracking-normal">
            {" "}
            <div className="text-[#A2A3A4] text-[10px] leading-tight font-NeueMontreal font-semibold tracking-wide">
              Bidding Price
            </div>
            <div className="w-30 text-lg text-white font-bold flex justify-center items-center gap-1 truncate font-NeueMontreal-Bold">
              <img src={coin} className="w-4 h-4" />
              &#x20B9;{bidAmount / 100}
            </div>
          </div>

          <>
            <div className="w-full">{componentToRender}</div>
            {/* Ready to Play Button */}
            {heading === "Ready to Play" && (
              <button
                className="w-full py-2 flex justify-center items-center gap-2 text-xs text-white rounded-3xl bg-[#019107] font-NeueMontreal font-semibold tracking-wide"
                onClick={() => {
                  window.open(
                    `https://www.youtube.com/watch?v=${videoId}`,
                    "_blank"
                  );
                  setTimeout(() => {
                    removePlayedSong();
                  }, 1000);
                }}
              >
                <img src={play} />
                Ready to Play
              </button>
            )}

            {heading === "Pending Request" && (
              <div className="w-full py-1 flex justify-center items-center gap-2 bg-white rounded-3xl">
                <button
                  className="w-[45%] py-0.5 text-xs text-black rounded-3xl bg-[#DDD7FF] font-NeueMontreal font-semibold tracking-wide"
                  onClick={() => handleBidAction(false, id)}
                >
                  Reject
                </button>
                <button
                  className="w-[45%] py-0.5 text-xs text-white rounded-3xl bg-[#5C42FF] font-NeueMontreal font-semibold tracking-wide"
                  onClick={() => handleBidAction(true, id)}
                >
                  Accept
                </button>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
