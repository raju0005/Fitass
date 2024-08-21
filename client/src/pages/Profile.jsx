import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserNinja } from "react-icons/fa";
import { useGetProfileQuery } from "../redux/apis/userApiSlice";
import { useGetTotalstepsQuery } from "../redux/apis/stepSlice";
import maleAvatar from "../assets/maleAvatar.png";
import femaleAvatar from "../assets/femaleAvatar.png";
import otherAvatar from "../assets/otherAvatar.png";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
  } = useGetProfileQuery(userInfo._id);
  const {
    data: totalSteps,
    error: stepsError,
    isLoading: stepsLoading,
  } = useGetTotalstepsQuery(userInfo._id);

  if (profileLoading || stepsLoading) return <div>Loading...</div>;
  if (profileError)
    return <div>Error fetching profile data: {profileError.message}</div>;
  if (stepsError)
    return <div>Error fetching steps data: {stepsError.message}</div>;

  const totalStepsCount = totalSteps?.TotalSteps || 0;

  const getAvatar = () => {
    switch (profile?.gender) {
      case "Male":
        return maleAvatar;
      case "Female":
        return femaleAvatar;
      default:
        return otherAvatar;
    }
  };

  return (
    <div className="px-2 h-[85vh] w-full flex justify-center gap-[50px] items-center uppercase relative ">
      <div className="w-[300px] md:hidden flex absolute">
      <img
            src={getAvatar()}
            alt="User Avatar"
            className="object-fill rounded-full "
          />
      </div>
      <div className="text-white flex flex-col justify-center items-center px-8 border border-white rounded-lg bg-black/20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="flex flex-col justify-center items-center gap-3 m-7">
          <h1 className="text-[35px] text-center">{userInfo.username}</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 ">
          <h2 className="text-[25px] ">
            Age: <span className="mx-6 font-custom">{profile?.age || "N/A"}</span>
          </h2>
          <h2 className="text-[25px]">
            Gender: <span className="mx-6">{profile?.gender || "N/A"}</span>
          </h2>
          <h2 className="text-[25px]">
            Weight: <span className="mx-6 font-custom">{profile?.weight || "N/A"}</span>
          </h2>
          <h2 className="text-[25px]">
            Step Goal: <span className="mx-6 font-custom">{totalStepsCount}</span>
          </h2>

          <button
            onClick={() => navigate("/update")}
            className="bg-blue-800 hover:bg-blue-700 text-white text-[20px] py-2 px-4 rounded m-10 hover:scale-105 tranform transition-transform cursor-pointer uppercase"
          >
            Update
          </button>
        </div>
      </div>
      <div className="w-[300px] md:flex hidden">
      <img
            src={getAvatar()}
            alt="User Avatar"
            className="object-fill rounded-full "
          />
      </div>
    </div>
  );
};

export default Profile;
