import NavBar from "../../components/navBar/navBar.tsx";
import Sidebar from "../../components/features/sidebar/sideBar.tsx";
import BottomBar from "../../components/mobileBottomBar/bottomBar.tsx";
import Payment from "../../components/features/Payments/payment.tsx";
import { useEffect, useState } from "react";

const Money = () => {
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
      {/* Desktop view */}
      {windowWidth > 1024 && (
        <div className="w-full h-dvh  scroll-smooth bg-[#1A1C1E] max-lg:hidden flex">
          <Sidebar />
          <div className="w-full h-full overflow-y-scroll scroll-smooth flex flex-col">
            <NavBar isMobile={false} />
            <Payment isMobile={false} />
          </div>
        </div>
      )}
      {/* Mobile view */} {/* earlier w-[90%] */}
      {windowWidth <= 1024 && (
        <div className="w-full h-full bg-black lg:hidden">
          <div className="w-11/12 m-auto flex flex-col items-center justify-start gap-6">
            <NavBar isMobile={true} />
            <div className="w-full my-[90px] flex flex-col gap-6">
              <div className="w-full text-left text-[18px] font-bold leading-[22px] text-[#FFFFFF] font-NeueMontreal-Med tracking-wide">
                Money
              </div>
              <Payment isMobile={true} />
            </div>
            <BottomBar />
          </div>
        </div>
      )}
    </>
  );
};

export default Money;
