import { useEffect, useState } from "react";
import Sidebar from "../../components/features/sidebar/sideBar";
import NavBar from "../../components/navBar/navBar";

import Publish from "../../components/features/Publish/Publish";
import BottomBar from "../../components/mobileBottomBar/bottomBar";
// import Spinner from "../../components/spinner/Spinner";

const PublishPlaylist = () => {
  // const [isLoading, setIsLoading] = useState(true);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleSize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  });

  return (
    <>
      {windowWidth > 1024 && (
        <div className="w-full h-dvh bg-[#1A1C1E] flex">
          <Sidebar />
          <div className="w-full h-full overflow-y-scroll scroll-smooth flex flex-col">
            <NavBar isMobile={false} />
            <Publish isMobile={false} />
          </div>
        </div>
      )}

      {windowWidth <= 1024 && (
        <div className="w-full flex flex-col bg-black h-dvh overflow-hidden ">
          <NavBar isMobile={true} />
          <div className="w-11/12 mt-14 mx-auto">
            <Publish isMobile={true} />
            <BottomBar />
          </div>
        </div>
      )}
    </>
  );
};

export default PublishPlaylist;

/*
 style={{
  max-lg:hidden
        borderWidth: "3px",
        borderRadius: "100%",
        borderColor: "transparent",
        backgroundImage: `radial-gradient(circle at center, #8673FD 11.35%, #5C42FF 86.53%)`,
        borderImageSlice: "1",
      }}
*/
