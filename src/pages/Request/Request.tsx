import Sidebar from "../../components/features/sidebar/sideBar.tsx";
import NavBar from "../../components/navBar/navBar.tsx";
import Playlist from "../../components/features/Playlists/playlist.tsx";
import BottomBar from "../../components/mobileBottomBar/bottomBar.tsx";
import { useEffect, useState } from "react";

// import PlaylistBar from "../../components/request/mobilePlaylistBar/playlistBar.tsx";

const Request = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* desktop view */}
      {windowWidth >= 1024 && (
        <div className="w-full h-dvh flex bg-[#1A1C1E] max-lg:hidden">
          <Sidebar />
          <div className="w-full h-full overflow-y-scroll scroll-smooth flex flex-col ">
            <NavBar isMobile={false} />
            <Playlist isMobile={false} />
          </div>
        </div>
      )}

      {/* mobile view */}
      {windowWidth <= 1024 && (
        <div className="w-full h-screen bg-black lg:hidden">
          <div className="w-11/12 m-auto flex flex-col items-center justify-start gap-6">
            <NavBar isMobile={true} />
            {/* <PlaylistBar /> */}
            <Playlist isMobile={true} />
            <BottomBar />
          </div>
        </div>
      )}
    </>
  );
};

export default Request;
