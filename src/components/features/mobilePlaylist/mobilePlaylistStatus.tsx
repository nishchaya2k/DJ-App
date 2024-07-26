import { useState, useEffect } from "react";
import MobileMusicCard from "./mobileMusicCard";
import DropdownSorting from "../dropdownSorting/dropdownSorting";
import Dropdown from "/assets/dropdown.svg";
import cat from "/assets/cat.png";
import {
  selectTotalCountAccepted,
  selectTotalCountPending,
} from "../../../store/reducer/bidListReducer";
import { useSelector } from "react-redux";

interface OptionType {
  value: string;
  label: string;
}
interface BidListArtistItem {
  bidAmount: number;
  musicDetails: {
    channelName: string;
    description: string;
    thumbnails: {
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    videoId: string;
    title: string;
  };
  id: string;
  timestamp: string;
  userData: Record<string, unknown>;
  name: string;
}

type PlaylistProps = {
  displayPendingList: BidListArtistItem[];
  displayReadyList: BidListArtistItem[];
  setReadyPageSize: any;
  setPendingPageSize: any;
  fetchPendingPlaylist: any;
  fetchReadyPlaylist: any;
};

const sortbyStatus: OptionType[] = [
  { value: "newest", label: "Newest" },
  { value: "lowest", label: "Lowest" },
  { value: "highest", label: "Highest" },
];

const MobilePlaylistStatus = ({
  displayReadyList,
  displayPendingList,
  setReadyPageSize,
  setPendingPageSize,
  fetchPendingPlaylist,
  fetchReadyPlaylist,
}: PlaylistProps) => {
  const [selectedList, setSelectedList] = useState("Ready to play");

  const totalCountAccepted = useSelector(selectTotalCountAccepted);
  const totalCountPending = useSelector(selectTotalCountPending);

  const [throttleTimeout, setThrottleTimeout] = useState<any | null>(null);
  const [defaultOption] = sortbyStatus;
  const [sortby, setSortby] = useState<OptionType | null>(defaultOption);
  const [sortedDisplayList, setSortedDisplayList] =
    useState<BidListArtistItem[]>();

  const handleChange = (selectedOption: OptionType | null) => {
    setSortby(selectedOption);
  };

  const handleDisplayList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedList(e.target.value);
  };

  const displayList =
    selectedList === "Ready to play" ? displayReadyList : displayPendingList;

  const handleInfiniteScroll = async () => {
    try {
      if (
        document.documentElement.scrollTop + window.innerHeight + 10 >=
        document.documentElement.scrollHeight
      ) {
        if (!throttleTimeout) {
          if (selectedList === "Ready to play") {
            setReadyPageSize((prev: any) => {
              if (prev >= totalCountAccepted) return prev;
              else {
                const remainingTransaction = totalCountAccepted - prev;
                const increment = Math.min(remainingTransaction, 5);
                return prev + increment;
              }
            });
          } else {
            setPendingPageSize((prev: any) => {
              if (prev >= totalCountPending) return prev;
              else {
                const remainingTransaction = totalCountPending - prev;
                const increment = Math.min(remainingTransaction, 5);
                return prev + increment;
              }
            });
          }

          setThrottleTimeout(
            setTimeout(() => {
              setThrottleTimeout(null);
            }, 800)
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sortDisplayList = () => {
    let sortedList = [...displayList];
    switch (sortby?.value) {
      case "newest":
        sortedList.sort(
          (a: any, b: any) =>
            (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any)
        );
        break;
      case "lowest":
        sortedList.sort((a: any, b: any) => a.bidAmount - b.bidAmount);
        break;

      case "highest":
        sortedList.sort((a: any, b: any) => b.bidAmount - a.bidAmount);
        break;
      default:
        break;
    }
    return sortedList; // Return the sorted list
  };

  useEffect(() => {
    setSortedDisplayList(displayList);
    const sortedList = sortDisplayList();
    setSortedDisplayList(sortedList);
  }, [sortby, displayList]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  });

  //polling
  useEffect(() => {
    if (selectedList === "Pending Request") {
      const interval = setTimeout(() => {
        fetchPendingPlaylist();
      }, 5000);
      return () => clearTimeout(interval);
    } else {
      const interval = setTimeout(() => {
        fetchPendingPlaylist();
      }, 8000);
      return () => clearTimeout(interval);
    }
  });

  return (
    <div className="my-[80px] w-full h-full flex flex-col gap-4 overflow-y-scroll overscroll-contain scroll-smooth">
      <div className=" flex justify-between items-center w-full h-[6%] mt-4">
        <div>
          <select
            name=""
            id=""
            value={selectedList}
            onChange={handleDisplayList}
            style={{
              outline: "none", // Remove focus border
              appearance: "none",
              backgroundColor: "black",
              color: "white",
              fontFamily: "NeueMontreal-Med",
              cursor: "pointer",
              fontSize: "18px",
              backgroundImage: `url(${Dropdown})`,
              backgroundRepeat: "no-repeat", // Ensure the arrow is not repeated
              backgroundPosition: "right 0px center", // Position the arrow to the right
              backgroundSize: "12px", // Increase the size of the arrow
              minWidth: "155px",
              // border: "1px solid blue",
            }}
          >
            <option>Ready to play</option>
            <option>Pending Request</option>
          </select>
        </div>
        <DropdownSorting
          sortbyStatus={sortbyStatus}
          sortby={sortby}
          handleChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        {displayReadyList.length === 0 && selectedList === "Ready to play" ? (
          <div className="h-[calc(100vh-13rem)]  w-full flex flex-col  justify-center items-center text-white text-xl font-NeueMontreal">
            <img src={cat} className="aspect-square h-24" />
            <div className="text-[1rem] tracking-wide font-NeueMontreal">
              No Song Is Ready To Play!
            </div>
          </div>
        ) : null}

        {displayPendingList.length === 0 &&
        selectedList === "Pending Request" ? (
          <div className="h-[calc(100vh-13rem)] w-full flex flex-col  justify-center items-center text-white text-xl font-NeueMontreal">
            <img src={cat} className="aspect-square h-24" />
            <div className="text-[1rem] tracking-wide font-NeueMontreal">
              No Pending Bids!
            </div>
          </div>
        ) : null}

        {sortedDisplayList?.map((listItem) => {
          return (
            <MobileMusicCard
              key={listItem.id}
              heading={selectedList}
              title={listItem.musicDetails?.title}
              channelName={listItem.musicDetails?.channelName}
              bidAmount={listItem.bidAmount}
              id={listItem.id}
              thumbnails={listItem.musicDetails?.thumbnails}
              name={
                typeof listItem?.userData?.name === "string"
                  ? listItem?.userData?.name
                  : ""
              }
              videoId={listItem.musicDetails.videoId}
              fetchPendingPlaylist={fetchPendingPlaylist}
              fetchReadyPlaylist={fetchReadyPlaylist}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MobilePlaylistStatus;
