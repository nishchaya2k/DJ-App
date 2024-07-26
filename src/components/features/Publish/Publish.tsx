import { useEffect, useState } from "react";
import { selectToken } from "../../../store/reducer/signInReducer";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  playlistAdded,
  selectPlaylist,
} from "../../../store/reducer/publishPlaylistReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import cat from "/assets/cat.png";
import { useNavigate } from "react-router-dom";
import { Ripple } from "react-ripple-click";
import "react-ripple-click/dist/index.css";
import { HiRefresh } from "react-icons/hi";

interface Props {
  isMobile: boolean;
}

const Publish = ({ isMobile }: Props) => {
  const navigate = useNavigate();
  const authToken = useSelector(selectToken);
  const dispatch = useDispatch();
  const playlistData = useSelector(selectPlaylist);
  const [playlistId, setPlaylistId] = useState<any>("");
  const [urlInput, setUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaylistArtist = async () => {
    setIsLoading(true);
    try {
      const playlistResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/getPlaylistArtist`,
        {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: authToken,
          },
        }
      );

      if (!playlistResponse.ok) {
        const errorData = await playlistResponse.json();
        console.log("Error response data:", errorData);
        if (
          playlistResponse.status === 401 ||
          playlistResponse.status === 403
        ) {
          navigate("/");
          return;
        }

        if (errorData.message === "Internal Server Error") {
          dispatch(playlistAdded([]));
        }
        throw new Error(
          `Error ${playlistResponse.status}: ${errorData.message}`
        );
      }

      const finalPlaylistData = await playlistResponse.json();
      dispatch(playlistAdded(finalPlaylistData.data));
      localStorage.setItem("hasFetchData", "true");
    } catch (error) {
      console.log("Error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractPlaylistId = (url: string) => {
    try {
      const urlObj = new URL(url);
      const playlistId = urlObj.searchParams.get("list");

      if (!playlistId) {
        return null;
      }

      return playlistId;
    } catch (error) {
      // If the URL is invalid, return null
      return null;
    }
  };

  const handleVideoLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const extractedid = extractPlaylistId(urlInput);

    if (!extractedid) {
      toast.error("Invalid URL: Could not extract playlist ID");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/publishPlaylist`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: authToken,
          },
          body: JSON.stringify({
            playlistLink: extractedid,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate("/");
          return;
        }
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }
      setIsLoading(false);
      setPlaylistId(extractedid);
      localStorage.setItem("hasFetchData", "false");
    } catch (error) {
      console.error("Error occurred:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hasFetchData = localStorage.getItem("hasFetchData");
    console.log(hasFetchData);
    if (!hasFetchData || hasFetchData === "false") {
      fetchPlaylistArtist();
    }
  }, [playlistId]);

  return (
    <div
      className={`w-full ${
        isMobile ? "" : "h-dvh px-6 pt-8 overflow-y-scroll scroll-smooth"
      }`}
    >
      <div
        className={` h-full flex flex-col justify-stat items-start pb-[56px]   ${
          isMobile ? "w-full gap-8 py-[34px]" : "w-[89%] gap-12 py-12"
        }`}
      >
        {/* Publish PLaylist*/}
        <div className={`w-full flex flex-col ${isMobile ? "gap-2" : "gap-6"}`}>
          {/* <div
            className={`font-NeueMontreal font-semibold leading-[25px] text-white  tracking-wide ${
              isMobile
                ? "text-[18px] font-NeueMontreal-Med  tracking-normal "
                : "text-[20px] opacity-80"
            }`}
          >
            {isMobile ? "" : "Publish Playlist"}
          </div> */}
          <form
            onSubmit={handleVideoLink}
            className={` w-full flex justify-between items-center ${
              isMobile ? "gap-3" : "pt-2"
            }`}
          >
            <input
              type="url"
              required
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className={`border w-3/4 px-2  rounded-[8px] outline-none tracking-wider placeholder:font-NeueMontreal placeholder:text-md  focus:opacity-7 ${
                isMobile ? "h-[35px]" : "h-12"
              }`}
              placeholder={`Enter the playlist URL`}
            />
            <button
              type="submit"
              style={{
                position: "relative",
                overflow: "hidden",
                isolation: "isolate",
              }}
              className={`bg-[#5C42FF] h-12 flex justify-center items-center rounded-[8px] text-white font-NeueMontreal font-semibold tracking-wide text-[18px] hover:border-gray-100 ${
                !urlInput
                  ? "bg-[#9A88FF] active:scale-[0.98] bg-opacity-70 text-opacity-85"
                  : ""
              }  ${isMobile ? "w-[100px] h-[35px]" : "w-1/5"}`}
              disabled={!urlInput}
            >
              <IoCloudUploadOutline className="text-3xl" />
              <Ripple />
            </button>
          </form>
        </div>

        {/* Playlist Songs */}
        <div
          className={`w-full flex flex-col shrink-0  ${
            isMobile ? "gap-2" : "gap-6"
          }`}
        >
          <div className="flex justify-between items-center">
            <div
              className={`font-NeueMontreal font-semibold leading-[25px] text-white tracking-wide shrink-0  ${
                isMobile
                  ? "text-[18px] font-NeueMontreal-Med  tracking-normal"
                  : "text-[20px] opacity-80"
              }`}
            >
              Playlist Songs
            </div>
            <HiRefresh
              size={isMobile ? 20 : 24}
              onClick={isLoading ? () => {} : () => fetchPlaylistArtist()}
              className={`aspect-square cursor-pointer transform scaleX(-1) text-white ${
                isLoading ? "animate-spin" : ""
              }`}
            />
          </div>

          {isLoading ? (
            <div className="flex flex-col scroll-smooth gap-4 items-center overflow-y-scroll pb-6 h-[calc(100vh-236px)]">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-lg shadow-md w-full hover:scale-[0.99] transition-all duration-500 ease-in-out animate-pulse bg-neutral-900"
                >
                  <div className="flex overflow-hidden rounded-lg p-2 space-x-16">
                    <div className="flex-shrink-0 w-[5.4rem] h-16 blur-[32px] bg-zinc-600"></div>
                    <div className="flex-1 py-2 space-y-4">
                      <div className="w-full h-4 rounded bg-zinc-600"></div>
                      <div className="w-5/6 h-3 rounded bg-zinc-600"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {playlistData?.length > 0 ? (
                <div
                  className={`w-full flex flex-col gap-4 py-2 overflow-y-scroll ${
                    isMobile
                      ? "h-svh scroll-smooth pb-[16rem] overscroll-contain"
                      : "h-[calc(100vh-15rem)]"
                  }`}
                >
                  {playlistData?.map((listItem) => {
                    return (
                      <>
                        {!isMobile && (
                          <div
                            key={listItem.videoId}
                            className="w-full h-28 rounded-xl cursor-pointer box-border flex justify-between items-center hover:scale-[0.99] transition-all duration-300 ease-in-out"
                            onClick={() =>
                              window.open(
                                `https://www.youtube.com/watch?v=${listItem.videoId}`,
                                `_blank`
                              )
                            }
                          >
                            <div className="flex justify-start items-center gap-6">
                              <div className="w-[180px] h-[90px] box-content flex justify-center items-center">
                                <div className="relative w-full h-full ">
                                  <img
                                    src={
                                      listItem?.thumbnails?.maxres?.url ||
                                      listItem?.thumbnails?.standard?.url ||
                                      listItem?.thumbnails?.high?.url ||
                                      listItem?.thumbnails?.medium?.url ||
                                      listItem?.thumbnails?.default?.url
                                    }
                                    alt="thumbnail"
                                    className="w-full h-full relative rounded-l-xl"
                                  />
                                  <div className="absolute -inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1d1d1d]"></div>
                                </div>
                              </div>
                              <div className="w-max h-full flex flex-col gap-3 justify-center">
                                {/* title */}
                                <div className="max-w-[600px] max-h-max  text-[18px] text-white opacity-80 font-NeueMontreal font-semibold leading-tight text-left tracking-wider truncate overflow-hidden">
                                  {listItem?.title
                                    ?.split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                    )
                                    .join(" ")}
                                </div>
                                {/* channelName */}
                                <div className="max-w-[600px] max-h-max text-[14px] text-[#828282] text-left opacity-80 font-NeueMontreal font-semibold leading-tight tracking-wide truncate overflow-hidden ">
                                  {listItem?.channelName?.toUpperCase()}
                                </div>
                              </div>
                            </div>

                            <div className="text-[14px] text-[#828282]">
                              {listItem.videoLength}
                            </div>
                          </div>
                        )}
                        {isMobile && (
                          <div
                            className="w-full h-24 border-[0.5px] border-[#4C4C4C] shadow-2x rounded-xl cursor-pointer box-border hover:scale-[0.99] transition-all duration-500 ease-in-out"
                            onClick={() =>
                              window.open(
                                `https://www.youtube.com/watch?v=${listItem.videoId}`,
                                `_blank`
                              )
                            }
                          >
                            <div className="w-full h-full pr-[6px] pl-[10px] py-[6px] flex items-start justify-between rounded-lg">
                              <div className="w-full h-full flex items-center gap-2 ">
                                <div
                                  className="flex-shrink-0 w-[55px] h-[55px] box-content flex justify-center items-center"
                                  style={{
                                    borderWidth: "3px",
                                    borderRadius: "100%",
                                    borderColor: "transparent",
                                    backgroundImage: `radial-gradient(circle at center, #8673FD 11.35%, #5C42FF 86.53%)`,
                                    borderImageSlice: "1",
                                  }}
                                >
                                  <div
                                    className="w-full h-full rounded-full"
                                    style={{
                                      backgroundImage: `url(${
                                        listItem?.thumbnails?.maxres?.url ||
                                        listItem?.thumbnails?.standard?.url ||
                                        listItem?.thumbnails?.high?.url ||
                                        listItem?.thumbnails?.medium?.url ||
                                        listItem?.thumbnails?.default?.url
                                      })`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                    }}
                                  ></div>
                                </div>

                                <div className="w-full h-full  flex justify-between items-center text-white">
                                  <div className=" flex flex-col justify-center items-center">
                                    <div className="w-[180px] text-[15px] font-NeueMontreal-Med truncate tracking-wide">
                                      {listItem?.title
                                        ?.split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1).toLowerCase()
                                        )
                                        .join(" ")}
                                    </div>
                                    <div className="w-[180px] truncate text-[11px] tracking-wide text-[#828282]">
                                      {listItem?.channelName?.toUpperCase()}
                                    </div>
                                  </div>

                                  <div className="text-[12px] pr-1 text-[#828282]">
                                    {listItem.videoLength}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              ) : (
                <div className="h-[calc(100vh-15rem)] flex flex-col  justify-center items-center text-white text-xl font-NeueMontreal pb-12">
                  <img src={cat} className="aspect-square h-32" />
                  <div className="text-lg tracking-wide font-NeueMontreal">
                    No Data Found!
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publish;

/*
style={{
  boxShadow: "rgba(0, 0, 0, 0.25) 1px 1px 4px 0px",
}}
*/
