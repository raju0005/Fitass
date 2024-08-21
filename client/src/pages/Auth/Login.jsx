import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/apis/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import loginlogo from "../../assets/LoginLogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
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
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login Successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center p-4">
      <div className="hidden md:flex w-1/2 justify-center items-center mb-4 md:mb-0">
        <img src={loginlogo} alt="Login Logo" className="max-w-full" />
      </div>
      <div className="flex flex-col justify-center items-center max-w-lg w-full">
        <h1 className="text-2xl md:text-3xl text-white">SIGN IN</h1>

        <form onSubmit={submitHandler} className="w-full max-w-lg">
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xl md:text-2xl text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xl md:text-2xl text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full text-white bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 font-custom"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-black text-lg md:text-xl px-4 py-2 rounded-lg hover:scale-105 transform transition-transform cursor-pointer uppercase"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-white text-lg mt-4 md:mt-0">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-blue-500 hover:underline ml-1 text-lg uppercase"
              >
                Register
              </Link>
            </p>
          </div>
          {isLoading && <Loader />}
        </form>
      </div>
    </section>
  );
};

export default Login;
