import { useState } from "react";
// import Card1 from "../../../assets/Card1.svg";
import Card2 from "/assets/Card2.svg";
import Card3 from "/assets/Card3.svg";
import Card4 from "/assets/Card4.svg";
import Card5 from "/assets/Card5.svg";

const WithdrawalMethod = () => {
  const [addupi, setAddupi] = useState(false);

  const handlePop = () => {
    setAddupi(!addupi);
    document.body.style.overflow = addupi ? "auto" : "hidden"; //to avoid scrolling for popup
  };
  return (
    <>
      <div className="w-full h-[130px] bg-[#c8c8ca] overflow-hidden rounded-[7px] ">
        <div className="w-full h-full flex flex-col justify-between items-start ">
          <div className="w-full flex px-[20px] pt-4 pb-2 justify-between items-center  ">
            <span className="text-[18px] font-NeueMontreal-Med leading-[25px] text-[#222222]">
              Withdrawal Method
            </span>
            <span
              className="px-[7px] border-2 border-[#413B89] text-[#413B89] text-xl leading-tight rounded-full cursor-pointer"
              onClick={handlePop}
            >
              +
            </span>
          </div>
          <div className="w-full h-full px-[20px] flex justify-start items-center font-NeueMontreal opacity-60 text-[16px] leading-[25px] text-[#222222] bg-[#F5F6F8] rounded-3xl border-gray-400 py-2">
            No withdrawal method added...
          </div>
        </div>
      </div>

      {addupi && (
        <div className="flex justify-center items-center backdrop-blur-sm backdrop-brightness-50 absolute z-50 inset-0 overflow-hidden">
          <div
            className="w-[540px] h-96 p-8 flex flex-col justify-around gap-4 bg-black rounded-lg border-b-[0.5px] border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-10 flex justify-start items-center font-NeueMontreal text-[16px] border-gray-400 leading-tight">
              <div className="text-xl font-NeueMontreal-Med text-white opacity-80 tracking-wide">
                Add a withdrawal method
              </div>
            </div>

            <div className="flex justify-between">
              <div className="relative w-[70%]">
                <div
                  className={`z-[10] flex relative transition-all duration-200 ease-in-out flex-col justify-between bg-[#c8c8ca] h-[12rem] overflow-hidden rounded-[14.26px]`}
                >
                  <div className="flex flex-col justify-between text-white font-NeueMontreal px-6 py-4">
                    <div className="ml-2 mr-2">
                      <input
                        className="w-full h-10 px-3 text-[16px] leading-[25px] text-black placeholder:text-[black]  outline-none border-b-2 border-black bg-[#c8c8ca] font-NeueMontreal font-semibold text-lg placeholder:font-NeueMontreal placeholder:font-thin placeholder:text-sm"
                        placeholder="Enter UPI ID . . ."
                      />
                    </div>
                  </div>

                  <div className="absolute left-[99.66px]">
                    <img src={Card2} />
                  </div>

                  <div className="absolute left-0 bottom-0">
                    <img src={Card3} />
                  </div>

                  <div className="absolute right-0 top-0">
                    <img src={Card4} />
                  </div>

                  <div className="absolute right-10 bottom-8">
                    <img src={Card5} />
                  </div>
                </div>
              </div>

              <div className=" flex justify-start items-end">
                <button
                  className=" py-2 px-8 border-[0.5px] border-gray-500 text-white op-80 font-NeueMontreal-Med bg-black rounded-lg"
                  onClick={handlePop}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawalMethod;
