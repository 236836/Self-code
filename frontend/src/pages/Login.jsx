import React, { useState } from "react";
import { API_URL } from "../api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Read server message
        const msg = await response.text();
        alert(msg);
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/40 hover:shadow-green-300/40 transition duration-300">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Student Login
    </h1>

    <input
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
    />

    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition"
    />

    <button
      type="button"
      onClick={handleLogin}
      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:scale-[1.02] active:scale-95 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-green-400/50 transition duration-300"
    >
      Login
    </button>
  </div>
);
}
export default Login;