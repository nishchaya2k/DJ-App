// // import React from "react";
// // import { useEffect, useState } from "react";
// // import useSound from "use-sound";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
// import { IconContext } from "react-icons";

// const MusicPlayer = () => {
//   // const [isPlaying, setIsPlaying] = useState(false);
//   // const [play, { pause, duration, sound }] = useSound(
//   //   "https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg"
//   // );

//   // const playingButton = () => {
//   //   if (isPlaying) {
//   //     pause(); // this will pause the audio
//   //     setIsPlaying(false);
//   //   } else {
//   //     play(); // this will play the audio
//   //     setIsPlaying(true);
//   //   }
//   // };
//   return (
//     <div>
//       <div className="mt-8 flex justify-center">
//         <button className="">
//           <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
//             <BiSkipPrevious />
//           </IconContext.Provider>
//         </button>
//         {!isPlaying ? (
//           <button className="">
//             <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
//               <AiFillPlayCircle />
//             </IconContext.Provider>
//           </button>
//         ) : (
//           <button className="">
//             <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
//               <AiFillPauseCircle />
//             </IconContext.Provider>
//           </button>
//         )}
//         <button className="">
//           <IconContext.Provider value={{ size: "2em", color: "#27AE60" }}>
//             <BiSkipNext />
//           </IconContext.Provider>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicPlayer;
