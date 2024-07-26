import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgLogin1 from "/assets/bgLogin1.svg";
import bgLogin3 from "/assets/bgLogin3.svg";
import Applogo from "/assets/tipzy.svg";
import { HiArrowUpRight } from "react-icons/hi2";
import { selectToken } from "../../store/reducer/signInReducer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/spinner/Loader";
import {
  gstNumberAdded,
  incorporationNumberAdded,
} from "../../store/reducer/profileReducer";

const GST = () => {
  const authToken = useSelector(selectToken);
  const [hasGstin, setHasGstin] = useState<any>(null);

  const [gstNumber, setGstNumber] = useState<any>();
  const [incorporationNumber, setIncorporationNumber] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateGst = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}v1/addGSTnumber`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
        body: JSON.stringify({
          gstNumber: gstNumber,
          IncorporationNumber: incorporationNumber,
        }),
      });

      if (response.ok) {
        toast.success("Details Updated");
        dispatch(gstNumberAdded(gstNumber));
        dispatch(incorporationNumberAdded(incorporationNumber));
        navigate("/artist/request");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong: Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading === true) updateGst();
  }, [isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasGstin === false) {
      navigate("/artist/request");
    } else if (hasGstin === true) {
      setIsLoading(true);
    }
  };

  return (
    <div
      className="w-full min-h-dvh"
      style={{
        backgroundImage: `url(${bgLogin1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        touchAction: "none",
      }}
    >
      <div
        className="w-full min-h-dvh "
        style={{
          backgroundImage: `url(${bgLogin3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          touchAction: "none",
        }}
      >
        <div className=" max-md:w-11/12 md:w-1/2 lg:w-2/5 m-auto h-full font-NeueMontreal">
          <div className="w-full h-screen flex flex-col justify-between py-10 ">
            <div className="w-1/3 max-sm:w-1/3 mx-auto">
              <img src={Applogo} alt="Tipzy App" className="w-full h-full" />
            </div>

            <div className=" w-full h-full mt-10 flex flex-col items-center">
              <div
                className={`text-center my-10 w-full flex items-center gap-8 max-sm:gap-4 font-NeueMontreal tracking-wide ${
                  hasGstin !== null ? "justify-start" : "justify-center"
                }`}
              >
                <label
                  // htmlFor="gstin"
                  className="text-white text-lg font-NeueMontreal font-semibold flex flex-col items-start gap-1 max-sm:text-[16px]"
                >
                  Do you have GST number ?
                  <span className="w-[80%] border-[0.5px] border-white rounded-sm"></span>
                </label>

                <label className="text-white flex justify-center items-center gap-1 text-lg max-sm:text-[16px] font-NeueMontreal font-semibold">
                  <input
                    type="radio"
                    value="yes"
                    name="gstin"
                    checked={hasGstin === true}
                    onChange={() => setHasGstin(true)}
                    className="cursor-pointer "
                  />
                  Yes
                </label>

                <label className="text-white flex justify-center items-center gap-1 text-lg max-sm:text-[16px] font-NeueMontreal font-semibold">
                  <input
                    value="no"
                    name="gstin"
                    type="radio"
                    checked={hasGstin === false}
                    onChange={() => setHasGstin(false)}
                    className="cursor-pointer "
                  />
                  No
                </label>
              </div>

              <form onSubmit={handleSubmit} action="" className="w-full ">
                {hasGstin && (
                  <div className={`w-full gap-4 flex flex-col mt-2`}>
                    <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                      <label
                        htmlFor="gstNumber"
                        className="text-white font-NeueMontreal block sm:hidden"
                      >
                        GST Number
                      </label>
                      <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        placeholder="GST Number"
                        value={gstNumber}
                        onChange={(e) => {
                          setGstNumber(e.target.value);
                        }}
                        required
                        className="w-full p-3 rounded-xl outline-none bg-white"
                      />
                    </div>

                    <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                      <label
                        htmlFor="incorporationNumber"
                        className="text-white font-NeueMontreal block sm:hidden"
                      >
                        Incorporation Number
                      </label>
                      <input
                        type="text"
                        id="incorporationNumber"
                        name="incorporationNumber"
                        placeholder="Incorporation Number"
                        value={incorporationNumber}
                        onChange={(e) => {
                          setIncorporationNumber(e.target.value);
                        }}
                        required
                        className="w-full p-3 rounded-xl outline-none bg-white"
                      />
                    </div>
                  </div>
                )}
                {/* <div className=""> */}
                <button
                  type="submit"
                  className={`w-full h-14 my-10 text-white flex justify-center items-center gap-2 rounded-xl outline-none max-sm:bg-themePrimary cursor-pointer bg-black font-NeueMontreal font-semibold tracking-wide ${
                    hasGstin !== null
                      ? hasGstin === true
                        ? "visible"
                        : "visible mt-10"
                      : "invisible"
                  }`}
                >
                  {hasGstin === true ? (
                    isLoading ? (
                      <Loader />
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        Submit
                        <div className="text-xl max-sm:hidden">
                          <HiArrowUpRight />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      Next
                      <div className="text-xl max-sm:hidden">
                        <HiArrowUpRight />
                      </div>
                    </div>
                  )}
                </button>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GST;
