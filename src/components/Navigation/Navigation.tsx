import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
}

export function Navigation(props: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="py-6" >
      <div
        role="button"
        onClick={handleClick}
        className="z-[100] font-NeueMontreal flex flex-row items-center gap-x-4  sticky w-fit left-0 top-0"
      >
        <div className="text-lg">
          <svg
            width="10"
            height="15"
            viewBox="0 0 10 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.06 0L0 7.061L7.06 14.122L9.182 12L4.242 7.061L9.182 2.122L7.06 0Z"
              fill="white"
            />
          </svg>
        </div>

        <h1 role="button" className="text-white font-bold leading-[21.6px] text-lg">
          {props.title}
        </h1>
      </div>
    </div>
  );
}
