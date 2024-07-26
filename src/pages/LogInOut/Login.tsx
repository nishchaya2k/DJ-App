//import { RiGoogleFill } from "react-icons/ri";
//import { RiFacebookFill } from "react-icons/ri";
import { HiArrowUpRight } from "react-icons/hi2";
//import { FcGoogle } from "react-icons/fc";
//import { SiFacebook } from "react-icons/si";
import Applogo from "/assets/tipzy.svg";
import bgLogin1 from "/assets/bgLogin1.svg";
import bgLogin3 from "/assets/bgLogin3.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  tokenAdded,
  usernameAdded,
  passwordAdded,
  artistIdAdded,
} from "../../store/reducer/signInReducer";
import Loader from "../../components/spinner/Loader";
import { fetchArtistInfo } from "../../utils/api/getInfoArtist";
import {
  firstNameAdded,
  gstNumberAdded,
  incorporationNumberAdded,
  lastNameAdded,
  phoneNumberAdded,
} from "../../store/reducer/profileReducer";
import { playlistAdded } from "../../store/reducer/publishPlaylistReducer";
import { earningAdded, lossAdded } from "../../store/reducer/paymentReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaylistArtist = async (token: string) => {
    try {
      const playlistResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/getPlaylistArtist`,
        {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: token,
          },
        }
      );

      if (!playlistResponse.ok) {
        const errorData = await playlistResponse.json();
        console.log("Error response data:", errorData);
        if (errorData.message === "Internal Server Error") {
          dispatch(playlistAdded([]));
        }
        throw new Error(
          `Error ${playlistResponse.status}: ${errorData.message}`
        );
      }

      const finalPlaylistData = await playlistResponse.json();
      dispatch(playlistAdded(finalPlaylistData.data));
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const fetchArtistInformation = async (token: string) => {
    if (token) {
      const artistDetails = async () => {
        try {
          const data = await fetchArtistInfo(token);
          console.log(data);
          const artistData = data?.artistData;
          if (artistData) {
            console.log(artistData);
            dispatch(firstNameAdded(artistData.firstName));
            dispatch(lastNameAdded(artistData.lastName));
            dispatch(earningAdded(data.TotalEarnings));
            dispatch(lossAdded(data.TotalLoss));

            !artistData.gstNumber
              ? dispatch(gstNumberAdded(""))
              : dispatch(gstNumberAdded(artistData.gstNumber));

            !artistData.incorporationNumber
              ? dispatch(incorporationNumberAdded(""))
              : incorporationNumberAdded(artistData.incorporationNumber);

            !artistData.mobileNumber
              ? dispatch(phoneNumberAdded(0))
              : dispatch(phoneNumberAdded(artistData.mobileNumber));
          }
        } catch (err) {
          console.log(err);
        }
      };
      artistDetails();
    }
  };

  const signIn = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}v1/signIn`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json);
        if (json.status === 4001) toast.error("Email or Password Incorrect");
        else if (json.status === 4004) toast.error("User not found");

        // if (json.status === 4000) toast.error("Required Parameters Not Sent!");
      } else {
        dispatch(usernameAdded(email));
        dispatch(passwordAdded(password));
        dispatch(tokenAdded(json.data.token));
        dispatch(artistIdAdded(json.data._id));
        dispatch(playlistAdded([])); //to reset playlist, fetchPlaylistArtist may not work
        toast.success("Login Successful");

        json.data.firstLoggin
          ? navigate("/artist/gst")
          : navigate("/artist/request");

        const authToken = json.data.token;
        await Promise.all([
          fetchArtistInformation(authToken),
          fetchPlaylistArtist(authToken),
        ]);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading((prev) => !prev);
    }
  };

  useEffect(() => {
    if (isLoading === true) signIn();
  }, [isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
          <div className="w-full h-full py-10 ">
            <div className="w-1/3 max-sm:w-1/3 mx-auto">
              <img src={Applogo} alt="Tipzy App" className="w-full h-full" />
            </div>

            <div className="w-4/6 mb-2 relative my-10 flex gap-6 text-white">
              <div className="p-3 mb-[2px] font-bold border-b-4 border-gray-200 rounded cursor-pointer font-NeueMontreal tracking-wide">
                Sign In
              </div>
              <div
                className="p-3 mb-[2px] cursor-pointer font-NeueMontreal tracking-wide"
                onClick={() => navigate("/artist/register")}
              >
                Register
              </div>
              {/* <div className="h-1 w-[4.5rem] absolute rounded bottom-0 left-0 bg-gray-200" /> */}
            </div>

            <form
              onSubmit={handleSubmit}
              // onSubmit={handleSubmit}
              className="mt-10 flex flex-col items-start gap-6"
            >
              <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                <label
                  htmlFor="email"
                  className="text-white block sm:hidden font-NeueMontreal tracking-wide"
                >
                  Username
                </label>
                <input
                  type="email"
                  id="email"
                  // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white font-NeueMontreal tracking-wide"
                />
              </div>

              <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                <label htmlFor="pass" className="text-white block sm:hidden">
                  Password
                </label>
                <input
                  type="password"
                  id="pass"
                  name="password"
                  placeholder="Password"
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white"
                />
              </div>

              <div className="w-full text-white max-sm:text-sm flex justify-between items-center">
                <div className="flex capitalize justify-center items-center gap-1 font-NeueMontreal tracking-wide">
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    className="cursor-pointer font-NeueMontreal tracking-wide"
                  />
                  Keep me signed in
                </div>
                <div className="cursor-pointer hover:text-blue-500 transition-all duration-200 ease-linear font-NeueMontreal tracking-wide">
                  Lost Your Password?
                </div>
              </div>

              <button
                className={`w-full capitalize h-14 mt-6 text-white flex justify-center items-center gap-2  rounded-xl outline-none max-sm:bg-themePrimary  bg-black hover:bg-black/80 transition-all duration-200 ease-linear font-NeueMontreal font-semibold tracking-wide`}
                type="submit"
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    Log in
                    <div className="text-xl max-sm:hidden">
                      <HiArrowUpRight />
                    </div>
                  </>
                )}
              </button>
            </form>

            {/* <div className="w-full h-[29px] my-12 max-sm:my-6 flex items-center justify-between">
              <div className="w-full h-[1px] bg-opacity-70 bg-[#CFDFE2]"></div>
              <div className="mx-2 text-white text-[14px] font-NeueMontreal">
                OR
              </div>
              <div className="w-full h-[1px] bg-opacity-70 bg-[#CFDFE2] "></div>
            </div> */}

            {/*Big Screens */}
            {/* <div className="w-full flex gap-[13px] text-white max-sm:hidden">
              <button className="h-[43px] p-2 hover:bg-black/10 transition-all duration-200 ease-linear capitalize text-[14px] flex flex-grow items-center justify-center gap-3 rounded-xl overflow-hidden bg-black border font-NeueMontreal">
                <div className="text-[20px]">
                  <RiGoogleFill />
                </div>
                Login with Google
              </button>

              <button className="h-[43px] text-[14px] hover:bg-black/10 transition-all duration-200 ease-linear capitalize flex flex-grow items-center justify-center gap-3 rounded-xl overflow-hidden bg-black border font-NeueMontreal font-semibold tracking-wide">
                <div className="text-[24px] ">
                  <RiFacebookFill />
                </div>
                Login with Facebook
              </button>
            </div> */}

            {/*Small Screens */}
            {/* <div className="w-full flex flex-col gap-[13px] text-black sm:hidden">
              <button className="h-[43px] p-2  text-[14px] flex flex-grow items-center justify-center gap-3 rounded-xl overflow-hidden bg-white border font-NeueMontreal font-semibold tracking-wide">
                <div className="text-[24px]">
                  <FcGoogle className="bg-white" />
                </div>
                Sign in with Google
              </button>

              <button className="h-[43px] p-2 text-[14px] flex flex-grow items-center justify-center gap-3 rounded-xl overflow-hidden bg-white  border font-NeueMontreal font-semibold tracking-wide">
                <div className="text-[24px] text-blue-600 ">
                  <SiFacebook className="bg-white" />
                </div>
                Sign in with Facebook
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
