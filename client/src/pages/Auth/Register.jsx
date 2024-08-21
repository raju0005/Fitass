import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/apis/userApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerlogo from "../../assets/RegisterLogo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/dashboard";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          username,
          email,
          password,
          age,
          gender,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/dashboard");
        toast.success("User Successfully Registered");
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center p-4">
      <div className="flex flex-col justify-center items-center max-w-lg w-full">
        <h1 className="text-[28px] text-white mb-6">REGISTER</h1>

        <form onSubmit={submitHandler} className="w-full">
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="name" className="block text-[25px] text-white mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-[25px] text-white mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full p-2 border rounded text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="age" className="block text-[25px] text-white mb-2">
                Age
              </label>
              <input
                type="text"
                id="age"
                className="w-full p-2 border rounded text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="gender" className="block text-[25px] text-white mb-2">
                Gender
              </label>
              <select
                id="gender"
                className="w-full p-2 border rounded text-white bg-transparent bg-clip-padding backdrop-filter backdrop-blur-sm font-custom"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label htmlFor="password" className="block text-[25px] text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border rounded text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="confirmpassword" className="block text-[25px] text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="w-full p-2 border rounded text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-black text-lg md:text-xl px-4 py-2 rounded-lg hover:scale-105 transform transition-transform cursor-pointer uppercase"
            >
              {isLoading ? "Registering...." : "Register"}
            </button>
            <p className="text-white text-[20px]">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-blue-500 hover:underline uppercase"
              >
                Login
              </Link>
            </p>
          </div>

          {isLoading && <Loader />}
        </form>
      </div>

      <div className="hidden md:flex w-[500px] ml-4">
        <img src={registerlogo} alt="Register Logo" className="w-full" />
      </div>
    </section>
  );
};

export default Register;
