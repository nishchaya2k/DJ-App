import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
// FaAngleUp;
const PlaylistBar = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const handlePlaylistChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPlaylist(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-[6%] mt-4">
      <div
        className="w-1/2 h-full flex items-center"
        // onClick={toggleDropDown}
      >
        <select
          value={selectedPlaylist}
          onChange={handlePlaylistChange}
          onClick={toggleDropDown}
          className="w-full bg-black text-white text-semibold text-lg text-bold appearance-none outline-none"
        >
          <option value="readyToPlay" selected>
            Ready to Play
          </option>
          <option value="pendingRequest">Pending Requests</option>
        </select>
        {isOpen ? (
          <FaAngleDown className="text-white" />
        ) : (
          <FaAngleDown className="text-white" />
        )}
      </div>
    </div>
  );
};

export default PlaylistBar;
