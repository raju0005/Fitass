import React from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowBigRight } from "react-icons/lu";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[85vh] flex justify-center flex-col items-center gap-4">
      <h1 className="text-white uppercase text-[60px]">Fit Ass</h1>
      <p className="text-white text-[30px]">Be a Badass</p>
      <button
        className="bg-white uppercase text-black text-[20px] px-3 py-2 mt-[30px] flex justify-center items-center rounded-lg hover:scale-105 tranform transition-transform"
        onClick={() => navigate("/register")}
      >
        Get Started <span><LuArrowBigRight/></span>
      </button>
    </div>
  );
};

export default Welcome;
