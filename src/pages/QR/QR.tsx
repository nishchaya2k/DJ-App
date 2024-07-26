import QrCode from "../../components/features/QrCode/QrCode";
import Sidebar from "../../components/features/sidebar/sideBar";
import NavBar from "../../components/navBar/navBar";


const QR = () => {
  return (
    <div>
      <div>
        <div className="w-full h-dvh  bg-[#1A1C1E] max-lg:hidden flex">
          <Sidebar />
          <div className="w-full h-full overflow-y-scroll scroll-smooth flex flex-col">
            <NavBar isMobile={false} />
            <QrCode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;
