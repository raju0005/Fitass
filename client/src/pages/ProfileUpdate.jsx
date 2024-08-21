import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserNinja } from "react-icons/fa";
import { useUpdateUserMutation } from "../redux/apis/userApiSlice";
import { useTotalstepsMutation } from "../redux/apis/stepSlice"; // Correct import path
import { setWeight } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePageTitle from "../components/usePageTitle";

const ProfileUpdate = () => {
  const { userInfo } = useSelector((state) => state.auth);
  usePageTitle("Update Your Profile");
  const dispatch = useDispatch();

  const [updateUser] = useUpdateUserMutation();
  const [addSteps] = useTotalstepsMutation();

  const [stepGoal, setStepGoal] = useState(userInfo.stepGoal || "");
  const [weight, setWeightValue] = useState(userInfo.weight || "");
  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    if (weight) {
      try {
        await updateUser({ userId: userInfo._id, weight });
        dispatch(setWeight(weight));
        toast.success("Weight updated successfully");
      } catch (error) {
        toast.error(`Failed to update weight: ${error.message}`);
      }
    } else {
      toast.error("Enter Your Weight");
    }
  };

  const handleStepGoal = async (e) => {
    e.preventDefault();
    if (stepGoal) {
      try {
        await addSteps({ userId: userInfo._id, stepsToAdd: stepGoal });
        toast.success("Step Goal updated successfully");
      } catch (error) {
        toast.error(`Failed to update step goal: ${error.message}`);
      }
    } else {
      toast.error("Enter Your Step Goal");
    }
  };

  return (
    <div className="px-2 h-[85vh] w-full flex flex-col justify-center items-center uppercase">
      <div className="md:w-[50%] w-[80%] text-white flex flex-col justify-around gap-7 items-center px-1 py-5 border border-white rounded-lg  bg-black/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="flex w-full justify-center items-center gap-3">
          <FaUserNinja size={25} />
          <h1 className="md:text-[40px] text-[30px] text-center">{userInfo.username}</h1>
        </div>

        <form onSubmit={handleStepGoal} className="w-[70%] ">
          <div className="mb-2 ">
            <label htmlFor="stepgoal" className="block md:text-[30px] text-[20px] text-white">
              Step Goal
            </label>
            <input
              type="number"
              id="stepgoal"
              className="mt-1 p-2 font-custom  border rounded w-full text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 "
              value={stepGoal}
              onChange={(e) => setStepGoal(e.target.value)}
              placeholder="Enter your step goal"
            />
          </div>
          <button
            type="submit"
            className=" bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded hover:scale-105 tranform transition-transform cursor-pointer mt-3 uppercase"
          >
            Set Goal
          </button>
        </form>

        <form onSubmit={handleWeightSubmit} className="w-[70%]">
          <div className="mb-4">
            <label htmlFor="weight" className="block md:text-[30px] text-[20px] text-white">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              className="mt-1 p-2 font-custom border rounded w-full text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 "
              value={weight}
              onChange={(e) => setWeightValue(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>

          <button
            type="submit"
            className=" bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105 tranform transition-transform cursor-pointer uppercase"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
