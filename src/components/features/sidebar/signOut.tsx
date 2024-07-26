// import React from "react";
import signOut from "/assets/signout.svg";
import { useNavigate } from "react-router-dom";
const SignOut = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/artist/signout")}
      className="aspect-square h-[22px] flex flex-col justify-center rounded-2xl cursor-pointer"
    >
      <div className=" mx-auto flex justify-between items-center text-[#A2A3A4]">
        <div className="flex items-center gap-2">
          <img src={signOut} className="h-full" />

          {/* <div>Sign Out</div> */}
        </div>
      </div>
    </div>
  );
};

export default SignOut;
