import React, { useState, useEffect } from "react";
import { GetStudents, SubmitAttendance } from "../api";

function Attendance() {
    const [students, setStudents] = useState([]);
    const [studentID, setStudentID] = useState("");
    const [status, setStatus] = useState("present");

    // Load students on page load
    useEffect(() => {
        GetStudents().then((data) => setStudents(data));
    }, []);

    // Submit attendance
    const handleAttendance = async () => {
        if (!studentID) {
            alert("Please select a student!");
            return;
        }

        const data = {
            student_id: Number(studentID),
            status: status
        };

        const result = await SubmitAttendance(data);
        alert("Attendance submitted!");
        setStudentID("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center p-6">
    <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-2xl shadow-2xl p-8 border border-white/40 hover:shadow-yellow-300/40 transition duration-300">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Student Attendance
      </h1>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Student:
      </label>
      <select
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition bg-white"
      >
        <option value="">Choose a student</option>
        {students.map((student) => (
          <option key={student.ID} value={student.ID}>
            {student.name}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Attendance Status:
      </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition bg-white"
      >
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>

      <button
        type="button"
        onClick={handleAttendance}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-[1.02] active:scale-95 text-black py-2.5 rounded-lg font-semibold shadow-md hover:shadow-orange-400/50 transition duration-300"
      >
        Submit Attendance
      </button>
    </div>
  </div>
);
}

export default Attendance;