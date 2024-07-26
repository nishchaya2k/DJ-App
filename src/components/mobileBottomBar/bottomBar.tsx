import { useNavigate } from "react-router-dom";
import { LuWallet } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdHomeFilled } from "react-icons/md";
import publishPlaylist from "/assets/publishPlaylist.svg";
import { useEffect, useState } from "react";

const BottomBar = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    setActivePage(window.location.pathname);
  }, []);

  const handleClick = (url: string) => {
    setActivePage(url);
    navigate(url);
  };

  const pageNames = [
    "/artist/request",
    "/artist/money",
    "/artist/profile",
    "/artist/publishPlaylist",
  ];

  const getIconStyle = (page: string) => ({
    filter:
      activePage === page
        ? "invert(27%) sepia(100%) saturate(5236%) hue-rotate(253deg) brightness(94%) contrast(106%)"
        : "brightness(0) invert(1)",
  });

  return (
    <div className="w-11/12 flex z-[100] flex-row justify-between text-white items-center fixed -bottom-1 bg-black h-[70px]">
      {pageNames.map((page, index) => (
        <div
          key={index}
          onClick={() => handleClick(page)}
          role="button"
          className={`cursor-pointer ${
            window.location.pathname === page ? "text-indigo-500" : "text-white"
          }`}
        >
          {index === 0 && <MdHomeFilled size={24} />}
          {index === 1 && <LuWallet size={24} />}
          {index === 2 && <CgProfile size={24} />}
          {index === 3 && (
            <img
              src={publishPlaylist}
              className="h-[24px]"
              style={getIconStyle(page)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
