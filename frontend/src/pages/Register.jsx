import React, { useState } from "react";
import { API_URL } from "../api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        const response = await fetch(API_URL + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        // Read server message (handles both text and JSON without error)
        const msg = await response.text();
        alert(msg);

        // Clear input
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/40 hover:shadow-blue-300/40 transition duration-300">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
      Student Registration
    </h1>

    <input
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
    />

    <input
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
    />

    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition"
    />

    <button
      type="button"
      onClick={handleRegister}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-[1.02] active:scale-95 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-blue-400/50 transition duration-300"
    >
      Register
    </button>
  </div>
);
}
export default Register;