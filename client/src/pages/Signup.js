import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user_name and user_email cookies are not set
    const userName = Cookies.get("user_name");
    const userEmail = Cookies.get("user_email");

    if (userName || userEmail) {
      // Redirect to the login page if cookies are not set
      navigate("/dashboard");
    }
  }, [navigate]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/signup", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/Dashboard");
      } else {
        // Handle unexpected status code
        setErrorMessage("An unexpected error occurred");
      }
    } catch (error) {
      // Handle errors that occurred during the API call
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen py-2">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-center text-gray-800 text-2xl font-semibold uppercase">
          Signup
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800"
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-red-600 mb-4">{errorMessage}</div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSignup}
          >
            Create Account
          </button>
          <Link
            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-300"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
