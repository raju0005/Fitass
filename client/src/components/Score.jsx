import React, { useEffect } from "react";
import { useAddScoreMutation } from "../redux/apis/userApiSlice";
import { useSelector } from "react-redux";

const Score = ({ stepsDone = 0, stepGoal = 1, activeMinutes = 0 }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const [addScore] = useAddScoreMutation();

    const calculatePoints = (stepsDone, stepGoal, activeMinutes) => {
        if (isNaN(stepsDone) || isNaN(stepGoal) || isNaN(activeMinutes) || stepGoal === 0) {
            return 0; 
        }
        const stepPoints = Math.min((stepsDone / stepGoal) * 100, 100);
        const activeMinutesPoints = activeMinutes * 2;
        return stepPoints + activeMinutesPoints;
    };

    const totalPoints = calculatePoints(stepsDone, stepGoal, activeMinutes);

    useEffect(() => {
        const updateScore = async () => {
            if (!isNaN(totalPoints) && totalPoints > 0 && userInfo?._id) {
                try {
                    await addScore({ userId: userInfo._id, score: totalPoints }).unwrap();
                } catch (error) {
                    console.error("Error adding score:", error);
                }
            }
        };

        updateScore();
    }, [totalPoints, userInfo?._id, addScore]);

    return (
        <div className="min-w-[70%] flex flex-col justify-center items-center gap-3 mt-6 text-white px-10 py-3 border border-white rounded-lg bg-black/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-center">
            <h2 className="text-[25px] text-center">Total Points</h2>
            <h3 className="text-[30px] font-custom">{isNaN(totalPoints) ? '0' : totalPoints}</h3>
        </div>
    );
};

export default Score;
