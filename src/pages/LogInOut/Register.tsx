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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/spinner/Loader";

// import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/signup`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
          },
          body: JSON.stringify({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          }),
        }
      );

      if (response.ok) {
        navigate("/artist/login");
        toast.success("Registration Successful");
      } else {
        const data = await response.json();
        if (data.message === "User already exists with this email id")
          toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading === true) {
      register();
    }
  }, [isLoading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  };

  return (
    <div
      className="w-full min-h-dvh "
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

            <div className="w-4/6 relative mb-2 my-10 flex gap-6 text-white">
              <div
                className="p-3 mb-[2px] cursor-pointer font-NeueMontreal tracking-wide"
                onClick={() => navigate("/artist/login")}
              >
                Sign in
              </div>
              <div className="p-3 mb-[2px] font-bold border-b-4 border-gray-200 rounded cursor-pointer font-NeueMontreal tracking-wide">
                Register
              </div>
              {/* <div className="h-1 w-[5rem] absolute bottom-0 rounded left-[6.1rem] bg-gray-200" /> */}
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-10 mb-6 flex flex-col items-start gap-6"
            >
              <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                <label
                  htmlFor="email"
                  className="text-white block sm:hidden font-NeueMontreal tracking-wide"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  placeholder="Email (e.g., johndoe@gmail.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white font-NeueMontreal tracking-wide placeholder:text-[14px]"
                />
              </div>
              <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                <label
                  htmlFor="firstName"
                  className="text-white block sm:hidden font-NeueMontreal tracking-wide"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first"
                  pattern="^[a-zA-Z]+$"
                  placeholder="First Name (e.g., John)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white font-NeueMontreal tracking-wide placeholder:text-[14px]"
                />
              </div>
              <div className=" w-full flex flex-col items-start gap-2 font-NeueMontreal tracking-wide">
                <label
                  htmlFor="lastName"
                  className="text-white block sm:hidden font-NeueMontreal tracking-wide"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last"
                  pattern="^[a-zA-Z]+$"
                  placeholder="Last Name (e.g., Doe)"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white font-NeueMontreal tracking-wide placeholder:text-[14px]"
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
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  placeholder="Password (e.g., John@123 - min. 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 rounded-xl outline-none bg-white placeholder:text-[14px]"
                />
              </div>
              <button
                className="w-full h-14 hover:bg-black/80 transition-all duration-200 ease-linear text-white flex justify-center items-center gap-2 rounded-xl outline-none max-sm:bg-themePrimary cursor-pointer bg-black font-NeueMontreal font-semibold tracking-wide"
                type="submit"
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    Register
                    <div className="text-xl max-sm:hidden">
                      <HiArrowUpRight />
                    </div>
                  </>
                )}
              </button>
            </form>

            {/* <div className="w-full h-[29px] mb-6 flex items-center justify-between">
              <div className="w-full h-[1px] bg-opacity-70 bg-[#CFDFE2]"></div>
              <div className="mx-2 text-white text-[14px] font-NeueMontreal">
                OR
              </div>
              <div className="w-full h-[1px] bg-opacity-70 bg-[#CFDFE2] "></div>
            </div> */}

            {/*Big Screens */}
            {/* <div className="w-full flex gap-[13px] text-white max-sm:hidden">
              <button className="h-[43px] p-2 text-[14px] flex flex-grow hover:bg-black/10 transition-all duration-200 ease-linear items-center justify-center gap-3 rounded-xl overflow-hidden bg-black border font-NeueMontreal">
                <div className="text-[20px]">
                  <RiGoogleFill />
                </div>
                Login with Google
              </button>

              <button className="h-[43px] text-[14px] flex flex-grow hover:bg-black/10 transition-all duration-200 ease-linear items-center justify-center gap-3 rounded-xl overflow-hidden bg-black border font-NeueMontreal font-semibold tracking-wide">
                <div className="text-[24px] ">
                  <RiFacebookFill />
                </div>
                Login with Facebook
              </button>
            </div> */}

            {/*Small Screens */}
            {/* <div className="w-full flex flex-col gap-[13px] text-black sm:hidden">
              <button className="h-[43px] p-2 text-[14px] flex flex-grow items-center justify-center gap-3 rounded-xl overflow-hidden bg-white border font-NeueMontreal font-semibold tracking-wide">
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

export default Register;
