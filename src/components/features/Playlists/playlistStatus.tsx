import MusicCard from "./musicCard";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import cat from "/assets/cat.png";

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
    title: string;
    videoId: string;
  };
  id: string;
  timestamp: string;
  userData: Record<string, unknown>;
  name: string;
}

type PlaylistProps = {
  heading: string;
  displayList: BidListArtistItem[];
  setPageSize: any;
  totalCount: number;
  fetchPendingPlaylist: any;
  fetchReadyPlaylist: any;
};

interface OptionType {
  value: string;
  label: string;
}

const sortbyStatus = [
  { value: "newest", label: "Newest" }, //after clicking on the label we send value on the endpoint
  { value: "lowest", label: "Lowest" },
  { value: "highest", label: "Highest" },
];

const PlaylistStatus = ({
  heading,
  displayList,
  setPageSize,
  totalCount,
  fetchPendingPlaylist,
  fetchReadyPlaylist,
}: PlaylistProps) => {
  const [defaultOption] = sortbyStatus;
  // const [turnoff, setTurnoff] = useState<boolean>(false);
  const [sortby, setSortby] = useState<OptionType | null>(defaultOption);
  const musicContainer = useRef<HTMLDivElement | null>(null);
  const [sortedDisplayList, setSortedDisplayList] =
    useState<BidListArtistItem[]>(displayList);

  const handleChange = (selectedOption: OptionType | null) => {
    setSortby(selectedOption);
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
        sortedList.sort((a, b) => a.bidAmount - b.bidAmount);
        break;
      case "highest":
        sortedList.sort((a, b) => b.bidAmount - a.bidAmount);
        break;
      default:
        break;
    }
    return sortedList;
  };

  useEffect(() => {
    const sortedList = sortDisplayList();
    setSortedDisplayList(sortedList);
  }, [sortby, displayList]);

  const scroll = (dir: string) => {
    if (!musicContainer.current) return;
    const container = musicContainer.current;

    // const isAtEnd =
    //   container.scrollLeft + container.clientWidth + 1 >= container.scrollWidth;

    // if (dir === "right") {
    //   setPageSize((prev: number) => {
    //     prev < totalCount && !isAtEnd ? setTurnoff(false) : setTurnoff(true);
    //     return prev < totalCount ? prev + 1 : prev;
    //   });
    // }

    // isAtEnd ? setTurnoff(false) : setTurnoff(true);

    if (dir === "right") {
      setPageSize((prev: number) => {
        return prev < totalCount ? prev + 1 : prev;
      });
    }

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container?.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  //polling
  useEffect(() => {
    const interval = setTimeout(() => {
      fetchPendingPlaylist();
    }, 5000);

    return () => clearTimeout(interval);
  });

  return (
    <div className="w-full h-full  flex justify-center">
      <div className="w-[96%]">
        <div className="flex flex-col justify-between text-white text-lg tracking-wider gap-3  ">
          <div className="leading-none tracking-wide flex justify-between items-center mx-0.5 font-NeueMontreal font-semibold">
            <span className="text-[18px] font-NeueMontreal font-semibold tracking-wide">
              {heading}
            </span>

            <div className="flex items-end">
              <div className="w-[100px] h-full">
                {" "}
                <Select
                  name="sortby"
                  value={sortby}
                  defaultValue={defaultOption} // Set the default option here
                  options={sortbyStatus}
                  onChange={handleChange}
                  isClearable={false}
                  maxMenuHeight={100}
                  className="react-select-container sortbyDD "
                  classNamePrefix="react-select"
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      width: "80px",
                      minHeight: "unset", // Remove the minHeight property
                      height: "25px", // Set the desired height here
                      display: "flex",
                      alignItems: "start", // Vertically center the content
                      justifyContent: "center",
                      backgroundColor: "#FFFFFF1A",
                      borderColor: "#959799",
                      borderRadius: "8px",
                      overflow: "hidden",
                      outline: "none",
                      padding: "0px",
                      margin: "0",

                      boxShadow: "none", // Remove default box shadow
                      "&:hover": {
                        borderColor: "#95979980", // Adjust border color on hover if needed
                      },
                    }),
                    valueContainer: (base) => ({
                      ...base,
                      // border: "1px solid green",
                      padding: "0px",
                      display: "flex",
                      alignItems: "center", // Vertically center the content
                      justifyContent: "center",
                      height: "100%",
                      width: "max-content",
                      margin: "0px",

                      // border: "1px solid blue",
                    }),
                    input: (base) => ({
                      ...base,
                      //to remove blink '|' for input
                      display: "none",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      fontFamily: "NeueMontreal",
                      color: "#FFFFFF", // Color of the selected option
                      fontSize: "11px",
                      margin: "0px",
                      padding: "0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      // border: "1px solid white",
                    }),

                    menu: (base) => ({
                      ...base,
                      margin: "4px 0px 0px 0px",
                      width: "82px",
                      backgroundColor: "#1A1C1E", // Set the background color of the options container
                    }),
                    menuList: (base) => ({
                      ...base,
                      padding: "0px",
                      backgroundColor: "#FFFFFF1A",
                      borderRadius: "4px",
                    }),

                    option: () => ({
                      // ...base,
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "2px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "12px",
                      backgroundColor: "#FFFFFF1A",
                      fontFamily: "NeueMontreal",
                      fontWeight: "800",
                      letterSpacing: "0.1px",
                    }),
                    indicatorsContainer: (base) => ({
                      ...base,
                      width: "25%",
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "start",
                      // border: "1px solid red",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,

                      margin: "0px 0px 60px 0px",
                      padding: "0px",
                      svg: {
                        width: "12px",
                        height: "20px",
                        marginTop: "1px",
                        cursor: "pointer",
                        // border: "1px solid blue",
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: "none", //vertical bar
                    }),
                  }} // Pass the custom styles to the component
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <div
                  className="text-[#959799] px-1 py-0.5 flex justify-center items-center bg-[#1A1C1E] rounded-lg border border-[#959799] cursor-pointer hover:bg-[#95979980]"
                  onClick={() => scroll("left")}
                >
                  <RiArrowLeftSLine />
                </div>
                <div
                  className={`text-[#959799] px-1 py-0.5 flex justify-center items-center  rounded-lg border border-[#959799] cursor-pointer hover:bg-[#95979980]`}
                  onClick={() => scroll("right")}
                >
                  <RiArrowRightSLine />
                </div>
              </div>
            </div>
          </div>

          {/* overflow-x-auto */}
          <div
            className="min-h-60 flex gap-4 overflow-x-auto"
            ref={musicContainer}
          >
            {displayList.length === 0 && heading === "Ready to Play" ? (
              <div className="h-[calc(100vh-30.5rem)] w-full flex flex-col  justify-center items-center text-white text-xl font-NeueMontreal">
                <img src={cat} className="aspect-square h-24" />
                <div className="text-[1rem] tracking-wide font-NeueMontreal">
                  No Song Is Ready To Play!
                </div>
              </div>
            ) : null}

            {displayList.length === 0 && heading === "Pending Request" ? (
              // <div className="w-full min-h-60 flex justify-center items-center text-center text-lg font-NeueMontreal tracking-wide text-white opacity-80">
              //   no pending bid available . . .
              // </div>
              <div className="h-[calc(100vh-30.5rem)] w-full flex flex-col justify-center items-center text-white text-xl font-NeueMontreal">
                <img src={cat} className="aspect-square h-24" />
                <div className="text-[1rem] tracking-wide font-NeueMontreal">
                  No Pending Bids!
                </div>
              </div>
            ) : null}

            {sortedDisplayList?.map((listItem) => {
              return (
                <MusicCard
                  key={listItem.id}
                  heading={heading}
                  title={listItem.musicDetails.title}
                  channelName={listItem.musicDetails.channelName}
                  bidAmount={listItem.bidAmount}
                  id={listItem.id}
                  thumbnails={listItem.musicDetails?.thumbnails}
                  name={
                    typeof listItem?.userData?.name === "string"
                      ? listItem?.userData?.name
                      : ""
                  }
                  timestamp={listItem.timestamp}
                  videoId={listItem.musicDetails?.videoId}
                  fetchPendingPlaylist={fetchPendingPlaylist}
                  fetchReadyPlaylist={fetchReadyPlaylist}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistStatus;

/*
 styles={{
      control: (baseStyles) => ({
        ...baseStyles,
        cursor: "pointer",
        width: "80px",
        minHeight: "unset", // Remove the minHeight property
        height: "25px", // Set the desired height here
        alignItems: "center", // Vertically center the content
        backgroundColor: "#FFFFFF1A",
        borderColor: "#959799",
        borderRadius: "8px",
        overflow: "hidden",
        outline: "none",
        boxShadow: "none", // Remove default box shadow
        "&:hover": {
          borderColor: "#95979980", // Adjust border color on hover if needed
        },
      }),

      menu: (base) => ({
        ...base,

        margin: "4px 0px 0px 0px",
        width: "82px",
        backgroundColor: "#1A1C1E", // Set the background color of the options container
      }),
      menuList: (base) => ({
        ...base,
        padding: "0px",
        backgroundColor: "#FFFFFF1A",
        borderRadius: "4px",
      }),
      singleValue: (base) => ({
        ...base,
        fontFamily: "NeueMontreal",
        color: "#FFFFFF", // Color of the selected option
        fontSize: "11px",
        padding: "0px 0px 12px 0px",
        width: "85px",
        display: "flex",
        justifyContent: "start",
        margin: "0px",
      }),
      indicatorSeparator: () => ({
        display: "none", //vertical bar
      }),
      option: () => ({
        // ...base,
        display: "flex",
        justifyContent: "start",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "12px",
        backgroundColor: "#FFFFFF1A",
      }),
      dropdownIndicator: () => ({
        // ...provided,
        cursor: "pointer",
        svg: {
          border: "1px",
          borderColor: "white",
          padding: "0px 4px 10px 0px",
        },
      }),
    }} // Pass the custom styles to the component

*/
