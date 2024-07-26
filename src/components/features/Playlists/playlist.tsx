import { lazy, useState, Suspense } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../../store/reducer/signInReducer";
import {
  totalCountPendingAdded,
  totalCountAcceptedAdded,
  pendingPlayistAdded,
  readyPlaylistAdded,
} from "../../../store/reducer/bidListReducer";

// import PlaylistStatus from "./playlistStatus";
// import MobilePlaylistStatus from "../mobilePlaylist/mobilePlaylistStatus";

import {
  selectTotalCountPending,
  selectTotalCountAccepted,
  selectPendingPlayist,
  selectReadyPlayist,
} from "../../../store/reducer/bidListReducer";
import Spinner from "../../spinner/Spinner";
import ShimmerRequest from "../../Shimmer/ShimmerRequest";
// import { Stats } from "webpack";

const MobilePlaylistStatus = lazy(
  () => import("../mobilePlaylist/mobilePlaylistStatus")
);
const PlaylistStatus = lazy(() => import("./playlistStatus"));

interface Props {
  isMobile: boolean;
}

const Playlist = ({ isMobile }: Props) => {
  const dispatch = useDispatch();
  const authToken = useSelector(selectToken);
  const pendingPlaylists = useSelector(selectPendingPlayist);
  const readyPlaylists = useSelector(selectReadyPlayist);
  const totalCountPending = useSelector(selectTotalCountPending);
  const totalCountAccepted = useSelector(selectTotalCountAccepted);
  const [pendingPageSize, setPendingPageSize] = useState<number>(6);
  const [readyPageSize, setReadyPageSize] = useState<number>(6);
  // const [isReadyLoading, setIsReadyLoading] = useState(false);
  // const [isPendingLoading, setIsPendingLoading] = useState(false);
  // const [page, setPage] = useState<number>(1);
  const page = 1;

  const fetchPendingPlaylist = async () => {
    // console.log(pendingPageSize);
    // setIsPendingLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }v1/bidListArtists?pageSize=${pendingPageSize}&page=${page}&status=${"pending"}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        if (errorData.message === "No bids found for the artist") {
          dispatch(pendingPlayistAdded([]));
          dispatch(totalCountPendingAdded(0));
        }
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      // console.log("Pending Playlist: ", data.data);
      dispatch(pendingPlayistAdded(data.data));
      dispatch(totalCountPendingAdded(data.totalCount));
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      // setIsPendingLoading(false);
    }
  };

  const fetchReadyPlaylist = async () => {
    // setIsReadyLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }v1/bidListArtists?pageSize=${readyPageSize}&page=${page}&status=${"accepted"}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(readyPlaylistAdded([]));
        dispatch(totalCountAcceptedAdded(0));
        console.error("Error response data:", errorData);
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      // console.log("Ready Playlist ", data.data);
      dispatch(readyPlaylistAdded(data.data));
      dispatch(totalCountAcceptedAdded(data.totalCount));
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      // setIsReadyLoading(false);
    }
  };

  useEffect(() => {
    if (pendingPageSize > 0) {
      fetchPendingPlaylist();
    }
  }, [pendingPageSize]);

  //we need to think about this logic for dependency totalCountPending
  useEffect(() => {
    if (readyPageSize > 0) {
      fetchReadyPlaylist();
    }
  }, [readyPageSize]); //on bid action we need to update readyplaylist

  // if (!isReadyLoading) return <ShimmerRequest />;
  // if (!isPendingLoading) return <ShimmerRequest />;

  return (
    <Suspense fallback={<ShimmerRequest />}>
      {!isMobile ? (
        <div className="w-full h-dvh overflow-scroll overflow-y-scroll scroll-smooth py-[16px] flex flex-col gap-5 pt-[74px]">
          <PlaylistStatus
            heading="Ready to Play"
            displayList={readyPlaylists}
            setPageSize={setReadyPageSize}
            totalCount={totalCountAccepted}
            fetchPendingPlaylist={fetchPendingPlaylist}
            fetchReadyPlaylist={fetchReadyPlaylist}
          />
          <PlaylistStatus
            heading="Pending Request"
            displayList={pendingPlaylists}
            setPageSize={setPendingPageSize}
            totalCount={totalCountPending}
            fetchPendingPlaylist={fetchPendingPlaylist}
            fetchReadyPlaylist={fetchReadyPlaylist}
          />
        </div>
      ) : (
        <Suspense fallback={<Spinner />}>
          <div className="w-full">
            <MobilePlaylistStatus
              displayReadyList={readyPlaylists}
              displayPendingList={pendingPlaylists}
              setReadyPageSize={setReadyPageSize}
              setPendingPageSize={setPendingPageSize}
              fetchPendingPlaylist={fetchPendingPlaylist}
              fetchReadyPlaylist={fetchReadyPlaylist}
            />
          </div>
        </Suspense>
      )}
    </Suspense>
  );
};

export default Playlist;
