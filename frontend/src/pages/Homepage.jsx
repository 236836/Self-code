import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import Attendance from "./Attendance";

function Homepage() {
  const [loginPage, setLoginPage] = useState(false);
  const [signupPage, setSignupPage] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pageTitle, setPageTitle] = useState("Register");

  // On initial load, check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setPageTitle("Student Attendance Dashboard");
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setSignupPage(false);
    setLoginPage(false);
    setPageTitle("Student Attendance Dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setSignupPage(true);
    setLoginPage(false);
    setPageTitle("Register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
      
      {/* Title Badge */}
      <div className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-white/30">
        {pageTitle}
      </div>

      {/* When Logged In: Show Attendance + Logout */}
      {isLoggedIn ? (
        <div className="w-full max-w-2xl flex flex-col items-center gap-4">
          <div className="w-full flex justify-end">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium shadow-md transition duration-300"
            >
              Logout
            </button>
          </div>
          <Attendance />
        </div>
      ) : (
        /* When NOT Logged In: Show Switch Buttons + Login/Register Forms */
        <>
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => {
                setSignupPage(true);
                setLoginPage(false);
                setPageTitle("Register");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition duration-300"
            >
              Register
            </button>

            <button
              onClick={() => {
                setLoginPage(true);
                setSignupPage(false);
                setPageTitle("Login");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition duration-300"
            >
              Login
            </button>
          </div>

          {signupPage && <Register switchToLogin={() => { setLoginPage(true); setSignupPage(false); setPageTitle("Login"); }} />}
          {loginPage && <Login onLoginSuccess={handleLoginSuccess} />}
        </>
      )}
    </div>
  );
}

export default Homepage;