import { useEffect, useState } from "react";
import clock from "/assets/clock.svg";

type Props = {
  name: string;
  id: string;
  timestamp: string;
  timer: boolean;
  setTimeOut: any;
};

const RequestDetail = ({ name, id, timestamp, timer, setTimeOut }: Props) => {
  // const fluctuateAnimationCSS = `
  //   /* Define the fluctuate animation */
  //   @keyframes fluctuate {
  //     0% {
  //       transform: scale(1); /* Normal size */
  //     }
  //     50% {
  //       transform: scale(1.1); /* Slightly larger */
  //     }
  //     100% {
  //       transform: scale(1); /* Back to normal size */
  //     }
  //   }

  //   /* Apply fluctuate animation to the timer text when the fluctuate class is present */
  //   .fluctuate-animation {
  //     animation: fluctuate 0.5s ease-in-out infinite; /* Apply the fluctuate animation infinitely */
  //   }
  // `;

  const dateObject = new Date(timestamp);

  let time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObject);

  const initialTime = parseInt("3") * 60; // Convert minutes to seconds

  const timestampInSeconds = new Date(timestamp).getTime() / 1000;
  const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  const elapsedTime = currentTimeInSeconds - timestampInSeconds;
  const calculatedInitialTime = Math.max(initialTime - elapsedTime, 0);

  const [timeLeft, setTimeLeft] = useState(calculatedInitialTime);

  // const [timerColor, setTimerColor] = useState("black");
  // const [fluctuate, setFluctuate] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const endTime = timestampInSeconds + initialTime;

      const remainingTime = Math.max(endTime - currentTime, 0);

      // if (remainingTime <= 10) {
      //   setFluctuate(true);
      //   setTimerColor("red");
      // } else {
      //   setFluctuate(false);
      //   setTimerColor("black");
      // }
      remainingTime === 0 && setTimeOut(true);
      return remainingTime;
    };

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const remainingSecondsStr = remainingSeconds.toFixed(0).padStart(2, "0");
    return `${minutes.toString().padStart(2, "0")}:${remainingSecondsStr}`;
  };

  return (
    <div className="w-full flex justify-between items-end text-[#A2A3A4] text-[9px] leading-tight tracking-wide">
      <div
        className={`flex justify-center items-center gap-[1.5px] font-NeueMontreal font-semibold `}
      >
        <img
          src={clock}
          className="aspect-square h-[10px] font-NeueMontreal font-semibold"
        />
        <div className={`leading-none`}>
          {timer ? formatTime(timeLeft) : time}{" "}
        </div>
      </div>
      <div className="w-[120px] flex flex-col items-end justify-center">
        <div className="w-full text-start truncate font-NeueMontreal font-semibold">
          Request Id: {id}
        </div>
        <div className="w-full text-start truncate font-NeueMontreal font-semibold">
          Request from: {name}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
