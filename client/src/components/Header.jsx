import React from "react";
import { FaUserNinja } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineLeaderboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/apis/userApiSlice";
import { logout } from "../redux/features/auth/authSlice";
import logo from "../assets/logo1.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full h-[12vh] flex justify-between items-center sticky top-0 z-50 px-4">
      <div className="flex-shrink-0">
        <img className="w-[180px] md:w-[250px]" src={logo} alt="Logo" />
      </div>

      {!userInfo ? (
        <div className="flex gap-3">
          <button
            className="bg-white text-black text-sm md:text-base px-3 py-2 uppercase rounded-lg hover:scale-105 transform transition-transform"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
          <button
            className="bg-white text-black text-sm md:text-base px-3 py-2 uppercase rounded-lg hover:scale-105 transform transition-transform"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4 uppercase">
          <div
            className="text-white text-base md:text-lg flex items-center gap-2 hover:scale-110 transform transition-transform cursor-pointer"
            onClick={() => navigate("/leaderboard")}
          >
            <MdOutlineLeaderboard size={25} />
            <span className="hidden md:inline">Leaderboard</span>
          </div>
          <div
            className="text-white text-base md:text-lg flex items-center gap-2 hover:scale-110 transform transition-transform cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <FaUserNinja size={25} />
            <span className="hidden md:inline">{userInfo.username}</span>
          </div>
          <div
            className="text-white text-base md:text-lg flex items-center gap-2 hover:scale-110 transform transition-transform cursor-pointer"
            onClick={logoutHandler}
          >
            <FiLogOut size={25} />
            <span className="hidden md:inline">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
