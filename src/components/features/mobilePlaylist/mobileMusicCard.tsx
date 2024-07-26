import { useSelector } from "react-redux";
import { selectToken } from "../../../store/reducer/signInReducer";
import playButton from "/assets/playButton.svg";

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
  videoId: string;
  fetchPendingPlaylist: any;
  fetchReadyPlaylist: any;
  // timestamp: string;
};

const MobileMusicCard = ({
  heading,
  title,
  channelName,
  bidAmount,
  id,
  thumbnails,
  name,
  videoId,
  fetchPendingPlaylist,
  fetchReadyPlaylist,
}: PlaylistProps) => {
  const authToken = useSelector(selectToken);

  const getThumbnail = (thumbnails: Thumbnails) => {
    if (thumbnails.maxres && thumbnails.maxres.url) return thumbnails.maxres;
    if (thumbnails.standard && thumbnails.standard.url)
      return thumbnails.standard;
    if (thumbnails.high && thumbnails.high.url) return thumbnails.high;
    if (thumbnails.medium && thumbnails.medium.url) return thumbnails.medium;

    return thumbnails.default;
  };
  const thumbnail = getThumbnail(thumbnails);

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
        fetchPendingPlaylist();
        fetchReadyPlaylist();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-24 border-[0.5px] border-[#4C4C4C] shadow-2x rounded-xl cursor-pointer box-border">
      <div className="w-full h-full pr-[6px] pl-[10px] pt-[10px] flex items-start justify-between rounded-lg">
        <div className="w-max h-full flex gap-2">
          <div
            className="w-[55px] h-[55px] box-content flex justify-center items-center"
            style={{
              borderWidth: "3px",
              borderRadius: "100%",
              borderColor: "transparent",
              backgroundImage: `radial-gradient(circle at center, #8673FD 11.35%, #5C42FF 86.53%)`,
              borderImageSlice: "1",
            }}
            onClick={() => {
              if (heading === "Ready to play") {
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
            <div
              className="w-full h-full rounded-full"
              style={{
                backgroundImage: `url(${thumbnail?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="min-w-max h-full pt-[6px] text-white flex flex-col justify-start items-start">
            <div className="w-[140px] text-[15px] font-NeueMontreal-Bold tracking-wide leading-[15px] truncate">
              {title}
            </div>
            <div className="w-[110px] py-[6px] text-[#828282] text-[11px] leading-[13px] truncate font-NeueMontreal-Med tracking-wide">
              {channelName}
            </div>
            <div className="w-[110px] text-[#A2A3A4] text-[8px] font-NeueMontreal-Med tracking-wide leading-[10px] truncate">
              Request Id: {id}
            </div>
            <div className="w-[110px] pt-[4px] text-[#A2A3A4] text-[8px] font-NeueMontreal-Med tracking-wide leading-[10px] truncate">
              Request From: {name}
            </div>
          </div>
        </div>
        <div className="h-full pt-[6px] flex flex-col justify-start items-end gap-4">
          <div className="text-transparent bg-gradient-to-r from-[#907EFB] to-[#6E57FF] bg-clip-text text-[21px] font-bold leading-[26px] font-NeueMontreal-Bold tracking-wide">
            &#x20B9;{bidAmount / 100}
          </div>

          {heading === "Ready to play" ? (
            <button
              className="w-[90px]  h-[25px] px-2 py-2 flex justify-around items-center text-[8px] text-white rounded-3xl bg-[#019107] font-NeueMontreal font-semibold tracking-wide leading-[10px]"
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
              <img src={playButton} />
              Ready To Play
            </button>
          ) : (
            <div className="w-[105px] py-1 flex justify-center items-center gap-1 bg-white rounded-3xl">
              <button
                className="w-[45%] py-0.5 text-[10px] text-black rounded-3xl bg-[#DDD7FF] font-NeueMontreal font-semibold tracking-wide"
                onClick={() => handleBidAction(false, id)}
              >
                Reject
              </button>
              <button
                className="w-[45%] py-0.5 text-[10px] text-white rounded-3xl bg-[#5C42FF] font-NeueMontreal font-semibold tracking-wide"
                onClick={() => handleBidAction(true, id)}
              >
                Accept
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MobileMusicCard;
