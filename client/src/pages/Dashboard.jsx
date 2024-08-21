import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetTotalstepsQuery,
  useAddstepsMutation,
} from "../redux/apis/stepSlice";
import { MdDeleteOutline } from "react-icons/md";
import {
  useGetActivitiesQuery,
  useDeleteActivityMutation,
} from "../redux/apis/activitySlice";
import PieChart from "../components/PieChart";
import Score from "../components/Score";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import usePageTitle from "../components/usePageTitle";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  usePageTitle("Dashboard");
  const {
    data: Steps,
    error: stepsError,
    isLoading: stepsLoading,
    refetch: refetchSteps,
  } = useGetTotalstepsQuery(userInfo._id);
  const {
    data: activities = [],
    error: activitiesError,
    isLoading: activitiesLoading,
    refetch: refetchActivities,
  } = useGetActivitiesQuery(userInfo._id);
  const [addSteps, { isLoading: addingSteps, error: addStepsError }] =
    useAddstepsMutation();
  const [deleteActivity] = useDeleteActivityMutation();

  const [stepsToAdd, setStepsToAdd] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    refetchSteps();
    refetchActivities();
  }, []);

  if (stepsLoading || activitiesLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (stepsError)
    return <div className="text-white font-custom">Error fetching steps data: {stepsError.message}</div>;
  if (activitiesError)
    return <div className="text-white font-custom">Error fetching activities: {activitiesError.message}</div>;

  const totalSteps = Steps?.TotalSteps || 0;
  const stepsDone = Steps?.stepsDone || 0;
  const activeMinutes = activities.reduce(
    (total, activity) => total + activity.duration,
    0
  );

  const handleAddSteps = async () => {
    try {
      await addSteps({ userId: userInfo._id, stepsToAdd }).unwrap();
      setStepsToAdd(0);
      setShowInput(false);
      refetchSteps();
    } catch (error) {
      console.error("Error adding steps:", error);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await deleteActivity(activityId).unwrap();
      refetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="w-full text-white flex flex-col justify-center items-center px-8 mt-2 uppercase">
      <h1 className="text-[50px] mb-10">Dashboard</h1>
      <div className="h-full w-full text-white flex md:flex-row flex-col justify-around items-center px-8 mt-2 gap-[60px] md:gap-5">
        <div className="h-full flex flex-col justify-center items-center gap-6">
          <h2 className="text-[28px]">Steps</h2>
          <PieChart totalSteps={totalSteps} stepsDone={stepsDone} />
          <h2 className="text-[30px] text-center">
            Total Steps: <span className="mx-6 font-custom">{totalSteps}</span>
          </h2>
          <div className="flex flex-col justify-center items-center gap-3">
            <h2 className="text-[30px] text-center">
              Steps Done: <span className="mx-6 font-custom">{stepsDone}</span>
            </h2>
            <button
              className={`${
                !showInput ? "flex" : "hidden"
              } bg-blue-800 hover:bg-blue-700 text-white text-[20px] px-3 py-2 rounded uppercase m-5 hover:scale-110 transform transition-transform cursor-pointer`}
              onClick={() => setShowInput(true)}
            >
              Add Steps
            </button>
            {showInput && (
              <div className="flex flex-col justify-center items-center gap-3 mt-4">
                <input
                  type="number"
                  value={stepsToAdd}
                  onChange={(e) => setStepsToAdd(Number(e.target.value))}
                  className="text-black px-2 py-1 rounded"
                  placeholder="Enter steps to add"
                />
                <button
                  className="bg-blue-800 hover:bg-blue-700 text-white text-[20px] px-3 py-2 rounded uppercase m-5 hover:scale-110 transform transition-transform cursor-pointer"
                  onClick={handleAddSteps}
                  disabled={addingSteps}
                >
                  {addingSteps ? "Adding..." : "Submit"}
                </button>
              </div>
            )}
            {addStepsError && (
              <div>Error adding steps: {addStepsError.message}</div>
            )}
          </div>
        </div>
        <div className="text-white flex flex-col justify-center gap-2 items-center px-8 mt-2">
          <h2 className="text-[30px]">Activity</h2>
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white text-[20px] px-3 py-2 rounded uppercase m-5 hover:scale-110 transform transition-transform cursor-pointer"
            onClick={() => navigate("/add-activity")}
          >
            Add Activity
          </button>
          {activities.length > 0 ? (
            <div className="flex flex-col justify-center items-center m-4">
              {activities.map((activity) => (
                <div
                  className="flex justify-around items-center"
                  key={activity._id}
                >
                  <div className="w-[300px] flex justify-around items-center px-4 py-2 border  bg-black/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  border-white  rounded-xl m-3 gap-3">
                    <div className="flex flex-col items-start justify-around">
                      <h1 className="text-[30px]">{activity.name}</h1>
                      <p className="text-[15px]">{activity.type}</p>
                    </div>
                    <p className="text-[25px]  text-white">
                      {activity.duration} <span>min</span>
                    </p>
                  </div>
                  <button
                    className="text-red-600 text-[18px] ml-4 hover:scale-110 transform transition-transform cursor-pointer"
                    onClick={() => handleDeleteActivity(activity._id)}
                  >
                    <MdDeleteOutline size={40} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No activities available.</div>
          )}
        </div>
      </div>
      <Score
        stepsDone={stepsDone}
        stepGoal={totalSteps}
        activeMinutes={activeMinutes}
        userId={userInfo._id}
      />
    </div>
  );
};

export default Dashboard;
