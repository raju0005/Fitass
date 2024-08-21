import React from "react";
import { useGetLeaderboardQuery } from "../redux/apis/lbSlice.js";
import goldMedal from "../assets/gold-medal.png"
import silverMedal from "../assets/silver-medal.png";
import bronzeMedal from "../assets/bronze-medal.png";


const getMedalImage = (rank) => {
    switch (rank) {
        case 1:
            return goldMedal;
        case 2:
            return silverMedal;
        case 3:
            return bronzeMedal;
        
    }
};

const Leaderboard = () => {
    const { data, error, isLoading } = useGetLeaderboardQuery(undefined);

    if (isLoading) return <div>Loading...</div>;

    if (error) {
        const errorMessage = error?.message || 'An unknown error occurred';
        return <div>Error loading leaderboard: {errorMessage}</div>;
    }

    if (!data || !Array.isArray(data)) {
        return <div>No leaderboard data available.</div>;
    }

    return (
        <div className="p-4 h-[80vh] w-full flex flex-col justify-start items-center gap-[30px] uppercase">
            <h2 className="text-[40px] text-white mb-4">Leaderboard</h2>
            <div className="flex justify-around md:flex-row flex-col items-center gap-10">
                {data.map((user, index) => (
                    <div key={user._id} className="w-[80%] flex  justify-around items-center  rounded-lg p-4 md:w-full sm:w-1/2 lg:w-1/3">
                        <div className="flex items-center mb-4">
                            <img
                                src={getMedalImage(index + 1)}
                                alt={`Medal for rank ${index + 1}`}
                                className="w-[100px] mr-4"
                            />
                            <div>
                                <h3 className="text-[30px] text-white text-center"> {user.username}</h3>
                                <p className="text-gray-600 text-center">Score: <span className="font-custom">{user.score}</span></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
