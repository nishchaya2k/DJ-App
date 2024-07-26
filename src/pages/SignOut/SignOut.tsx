import NavBar from "../../components/navBar/navBar.tsx";
import Sidebar from "../../components/features/sidebar/sideBar.tsx";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  return (
    <>
      {/* Desktop view */}
      <div className="w-full h-dvh lmax-lg:hidden bg-[#1A1C1E] flex">
        <Sidebar />
        <div className="w-full h-full flex flex-col">
          <NavBar isMobile={false} />
          <div className="w-full h-dvh text-white px-6 flex flex-col gap-12 py-[56px]">
            <div className="flex flex-col gap-8 justify-center h-full items-center">
              <h1 className="text-[24px] text-stone-300 tracking-wider font-NeueMontreal-Bold ">
                Signing out of Tipzy?
              </h1>
              <p className="text-[16px] text-zinc-300 text-center font-NeueMontreal">
                You won’t get personalised recommendations and all your profile
                records and <br /> action history won’t be accessible.
              </p>
              <div className="flex gap-12">
                <button
                  onClick={() => navigate("/artist/request")}
                  className="text-[16px] text-neutral-200 font-NeueMontreal tracking-wide rounded-[7px] bg-indigo-600 py-2 px-4"
                >
                  Keep Enjoying
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="text-[16px] text-neutral-200 font-NeueMontreal tracking-wide rounded-[7px]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignOut;
