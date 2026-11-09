import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";

function Homepage() {
    const [loginPage, setLoginPage] = useState(false);
    const [signupPage, setSignupPage] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pageTitle, setPageTitle] = useState("");

    // Check token and set pageTitle text
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token: ", token);

        if (token) {
            setIsLoggedIn(true);
            setSignupPage(false);
            setLoginPage(false);
            setPageTitle("Logout / Welcome");
        } else if (loginPage) {
            setPageTitle("Login");
        } else {
            setSignupPage(true);
            setPageTitle("Register");
        }
    }, [loginPage, signupPage, isLoggedIn]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">

    {/* Title badge */}
    <button className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition duration-300">
      {pageTitle}
    </button>

    {/* Logged In view */}
    {isLoggedIn && (
      <div className="bg-white/90 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl p-8 text-center hover:shadow-indigo-300/50 transition duration-300">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome to the Homepage
        </h1>

        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
              setSignupPage(true);
              setLoginPage(false);
            }
          }}
          className="bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-red-400/50 transition duration-300"
        >
          Logout
        </button>
      </div>
    )}

    {/* Switch buttons */}
    {!isLoggedIn && (
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => {
            setSignupPage(true);
            setLoginPage(false);
          }}
          className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-blue-400/50 transition duration-300"
        >
          Register
        </button>

        <button
          onClick={() => {
            setLoginPage(true);
            setSignupPage(false);
          }}
          className="bg-green-600 hover:bg-green-700 hover:scale-105 active:scale-95 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:shadow-green-400/50 transition duration-300"
        >
          Login
        </button>
      </div>
    )}

    {/* Forms */}
    {!isLoggedIn && signupPage && <Register />}
    {!isLoggedIn && loginPage && <Login />}
  </div>
);
}

export default Homepage;