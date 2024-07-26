import NavBar from "../../components/navBar/navBar.tsx";
import Sidebar from "../../components/features/sidebar/sideBar.tsx";
import Picture from "/assets/DefaultUserImage.svg";
import Upload from "/UploadImage.png";
import { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
// import { TfiEmail } from "react-icons/tfi";
import { Navigation } from "../../components/Navigation/Navigation.tsx";
import {
  selectPassword,
  selectToken,
  selectUsername,
} from "../../store/reducer/signInReducer/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  firstNameAdded,
  gstNumberAdded,
  incorporationNumberAdded,
  lastNameAdded,
  phoneNumberAdded,
  selectFirstName,
  selectGSTNumber,
  selectIncorporationNumber,
  selectLastName,
  selectPhoneNumber,
} from "../../store/reducer/profileReducer/index.tsx";

function Profile() {
  const dispatch = useDispatch();
  const email = useSelector(selectUsername);
  const authToken = useSelector(selectToken);
  const password = useSelector(selectPassword);
  const firstName = useSelector(selectFirstName);
  const lastName = useSelector(selectLastName);
  const phoneNumber = useSelector(selectPhoneNumber);
  const gst = useSelector(selectGSTNumber);
  const incorporation = useSelector(selectIncorporationNumber);
  const [gstNumber, setGstNumber] = useState<string>("");
  const [incorporationNumber, setIncorporationNumber] = useState<string>("");

  const [formData, setFormData] = useState({
    firstname: firstName,
    lastname: lastName,
    phone: phoneNumber ? phoneNumber.toString() : "",
    email: email,
    password: password,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form data on submit:", formData);
  };

  const handleSaveProfile = async () => {
    const requestBody = {
      firstName: formData.firstname,
      lastName: formData.lastname,
      email: formData.email,
      mobileNumber: Number(formData.phone),
      password: formData.password,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/updateInfoArtist`,
        {
          method: "PUT",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: authToken,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        dispatch(firstNameAdded(formData.firstname));
        dispatch(lastNameAdded(formData.lastname));
        dispatch(phoneNumberAdded(Number(formData.phone)));
        console.log("Profile updated successfully:", responseData);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleGst = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}v1/addGSTnumber`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            Authorization: authToken,
          },
          body: JSON.stringify({
            gstNumber: gstNumber,
            IncorporationNumber: incorporationNumber,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message);
      } else {
        dispatch(gstNumberAdded(gstNumber));
        dispatch(incorporationNumberAdded(incorporationNumber));
        toast.success("Taxation Details Updated");
      }
    } catch (err) {}
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: email,
      password: password,
    }));

    if (gst) setGstNumber(gst);
    if (incorporation) setIncorporationNumber(incorporation);
  }, []);

  return (
    <>
      {/* Desktop view */}
      <div className="w-full h-dvh flex max-lg:hidden bg-[#1A1C1E]">
        <Sidebar />
        <div className="w-full h-full overflow-y-scroll scroll-smooth flex flex-col ">
          <NavBar isMobile={false} />
          <div className="w-full overflow-y-scroll scroll-smooth text-white px-6 flex flex-col gap-12 pt-20 pb-8">
            <div className="font-NeueMontreal-Med text-[18px]">
              Edit Profile
            </div>
            <div className="w-full flex gap-8 justify-start items-center">
              <div className="w-[150px] h-[150px] rounded-[20px]">
                <img src={Picture} className="w-full h-full object-cover" />
              </div>
              <div className="w-[150px] h-[150px] rounded-[20px]">
                <label htmlFor="image">
                  <img
                    src={Upload}
                    className="w-full h-full cursor-pointer object-cover"
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  hidden
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full relative grid grid-cols-2 gap-8"
            >
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="firstname">First Name*</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="lastname">Last Name*</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4 text-white text-opacity-60"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="phone">Phone No*</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4"
                />
              </div>
              <div className="w-full flex flex-col gap-4">
                <label htmlFor="password">Password*</label>
                <input
                  readOnly
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4 text-white text-opacity-60"
                />
              </div>
              <button
                type="button"
                className="w-[200px] absolute -bottom-12 right-0 h-12 bg-[#5C42FF] rounded-[20px]"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </form>

            <div className="font-NeueMontreal-Med text-[18px] mt-12">
              Taxation Details
            </div>

            <form
              onSubmit={handleGst}
              className="flex flex-col items-end gap-16"
            >
              <div className="w-full flex justify-between gap-8">
                <div className="w-full font-NeueMontreal ">
                  <label className="flex flex-col gap-4">
                    GST Number*
                    <input
                      type="text"
                      name="gstNumber"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="GST Number"
                      className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4"
                    />
                  </label>
                </div>
                <div className="w-full font-NeueMontreal">
                  <label className="flex flex-col gap-4">
                    Incorporation Number*
                    <input
                      type="text"
                      name="incorporationNumber"
                      value={incorporationNumber}
                      onChange={(e) => setIncorporationNumber(e.target.value)}
                      placeholder="Incorporation Number"
                      className="w-full h-12 bg-[#2B2C2E] border outline-none on-focus:outline-none rounded-[20px] px-4"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-[200px] h-12 bg-[#5C42FF] rounded-[20px]"
              >
                Save Tax Details
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="bg-black h-dvh text-white lg:hidden overflow-hidden">
        <div className="flex relative flex-col pb-12 px-6 pt-4 gap-6 h-full">
          <Navigation title="Edit Profile" />
          <div className="flex flex-col gap-2 -mt-8 justify-center items-center">
            <div className="relative rounded-full w-[93.5px] h-[93.5px]">
              <img
                src={Picture}
                alt="icon"
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
              <label htmlFor="image">
                <CiImageOn
                  size={28}
                  className="absolute cursor-pointer rounded-md border-2 border-white bg-lime-400 p-1 top-[70px] text-black left-[60px]"
                />
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                hidden
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-white leading-[22.12px] text-center font-bold font-NeueMontreal text-[18.44px]">
              UserName
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex mt-4 h-full flex-col justify-between gap-8 overflow-y-scroll"
          >
            <div className="flex flex-col gap-8">
              <input
                type="text"
                id="name"
                required
                placeholder="First Name"
                value={formData.firstname}
                onChange={(e) =>
                  setFormData({ ...formData, firstname: e.target.value })
                }
                className="w-full text-black outline-none focus:outline-none appearance-none rounded-full border border-gray-300 px-4 p-2"
              />
              <input
                type="text"
                id="lastnameMobile"
                required
                placeholder="Last Name"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({ ...formData, lastname: e.target.value })
                }
                className="w-full text-black outline-none focus:outline-none appearance-none rounded-full border border-gray-300 px-4 p-2"
              />
              <input
                type="email"
                id="emailMobile"
                required
                placeholder="Email"
                value={formData.email}
                className="w-full text-black outline-none focus:outline-none appearance-none rounded-full border border-gray-300 px-4 p-2"
              />
              <input
                type="number"
                id="phoneMobile"
                required
                placeholder="Phone No"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full text-black outline-none focus:outline-none appearance-none rounded-full border border-gray-300 px-4 p-2"
              />
              <input
                type="password"
                id="passwordMobile"
                required
                placeholder="Password"
                value={formData.password}
                className="w-full text-black outline-none focus:outline-none appearance-none rounded-full border border-gray-300 px-4 p-2"
              />
            </div>
            <button
              type="button"
              className="w-full h-12 bg-[#5C42FF] rounded-full text-white"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
