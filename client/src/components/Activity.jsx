import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddActivityMutation } from "../redux/apis/activitySlice";
import { useSelector } from "react-redux";

const AddActivity = () => {
    const { userInfo } = useSelector((state) => state.auth);

  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const navigate = useNavigate();
  const [addActivity, { isLoading, error }] = useAddActivityMutation();

  const handleSubmit = async () => {
    try {
      await addActivity({userId: userInfo._id, name: activityName, type: activityType ,duration:activityDuration}).unwrap();
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Error adding activity:", err);
    }
  };

  return (
    <div className="w-full h-[85vh] text-white flex flex-col justify-center items-center px-8 gap-3">
      <h1 className="text-[40px] md:text-[50px] m-7 uppercase text-center">Add Activity</h1>
      <div className="flex flex-col justify-center items-center gap-7">
        
        <select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          className="w-[300px] font-custom text-black text-[20px] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-5 py-5 rounded border border-white"
        >
          <option value="" disabled>Select Activity Type</option>
          <option className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10" value="Strength Training">Strength Training</option>
          <option value="Cardio">Cardio</option>
          <option value="Cardio">Sports</option>
        </select>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity Name"
          className="text-white font-custom w-[250px] bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-5 py-5 rounded border border-white text-[20px]"
        />
        <input
          type="text"
          value={activityDuration}
          onChange={(e) => setActivityDuration(e.target.value)}
          placeholder="Duration in Minutes"
          className="text-white w-[250px] font-custom bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-5 py-5 rounded border border-white text-[20px]"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-800 hover:bg-blue-700 text-white text-[20px] px-3 py-2 rounded uppercase m-6 hover:scale-110 transform transition-transform cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Activity"}
        </button>
        {error && <div>Error adding activity: {error.message}</div>}
      </div>
    </div>
  );
};

export default AddActivity;
