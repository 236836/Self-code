import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function Attendance() {
  const [page, setPage] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [name, setName] = useState("");
  const [day, setDay] = useState("1");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const days = ["1", "2", "3", "4", "5", "6", "7"];

  // Authorization header
  function getHeaders() {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: "Bearer " + token } };
  }

  // Load students and attendance
  async function loadData() {
    try {
      const res1 = await axios.get(API_URL + "/students", getHeaders());
      setStudents(res1.data || []);

      const res2 = await axios.get(API_URL + "/attendance", getHeaders());
      setAttendanceList(res2.data || []);
    } catch (err) {
      console.log("Error loading data");
    }
  }

  // Add student
  async function addStudent() {
    if (name === "") return alert("Enter student name");
    await axios.post(API_URL + "/students", { name: name }, getHeaders());
    setName("");
    loadData();
  }

  // Update student name
  async function updateStudent(id) {
    if (editName === "") return alert("Name cannot be empty");

    try {
      await axios.put(
        API_URL + "/students/" + id,
        { name: editName },
        getHeaders()
      );
      setEditId(null);
      setEditName("");
      loadData();
    } catch (err) {
      alert("Error updating student name");
    }
  }

  // Delete student
  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;
    await axios.delete(API_URL + "/students/" + id, getHeaders());
    loadData();
  }

  // Mark Present or Absent
  async function mark(id, status) {
    await axios.post(
      API_URL + "/attendance",
      { student_id: Number(id), status: status + "-day" + day },
      getHeaders()
    );
    loadData();
  }

  // Get status (P, A, or -)
  function getStatus(id, d) {
    for (let item of attendanceList) {
      const sid = item.student_id || item.StudentID;
      const st = item.status || "";

      if (Number(sid) === Number(id)) {
        if (st === "present-day" + d) return "P";
        if (st === "absent-day" + d) return "A";
      }
    }
    return "-";
  }

  // ======================
  // 1. DASHBOARD PAGE
  // ======================
  if (page === "dashboard") {
    return (
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Teacher Dashboard</h1>
        <button
          onClick={() => {
            setPage("table");
            loadData();
          }}
          className="bg-orange-600 text-white font-bold px-8 py-4 rounded-lg text-xl shadow-md"
        >
          Attendance
        </button>
      </div>
    );
  }

  // ======================
  // 2. ATTENDANCE TABLE PAGE
  // ======================
  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Attendance Table</h1>
          <button onClick={() => setPage("dashboard")} className="bg-gray-300 px-4 py-2 rounded font-bold">
            Back
          </button>
        </div>

        {/* Add Student */}
        <div className="mb-4 flex gap-3">
          <input
            type="text"
            placeholder="Student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button onClick={addStudent} className="bg-blue-600 text-white px-4 py-2 rounded font-bold">
            + Add
          </button>
        </div>

        {/* Select Day */}
        <div className="mb-6 flex gap-3 items-center">
          <p className="font-bold">Select Day:</p>
          <select value={day} onChange={(e) => setDay(e.target.value)} className="border p-2 rounded">
            {days.map((d) => (
              <option key={d} value={d}>Day {d}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-orange-200">
              <th className="border p-2">Roll No.</th>
              <th className="border p-2">Name</th>
              {days.map((d) => (
                <th key={d} className="border p-2">Day {d}</th>
              ))}
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, index) => {
              const id = s.id || s.ID;
              const studentName = s.name || s.Name;

              return (
                <tr key={index} className="text-center">
                  <td className="border p-2 font-bold">{id}</td>

                  {/* Name or Edit Box */}
                  <td className="border p-2 font-bold">
                    {editId === id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="border p-1 rounded w-32"
                      />
                    ) : (
                      studentName
                    )}
                  </td>

                  {/* Days 1 to 7 */}
                  {days.map((d) => (
                    <td key={d} className="border p-2 font-bold">{getStatus(id, d)}</td>
                  ))}

                  {/* Action Buttons */}
                  <td className="border p-2">
                    {editId === id ? (
                      <button onClick={() => updateStudent(id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-1">
                        Save
                      </button>
                    ) : (
                      <button onClick={() => { setEditId(id); setEditName(studentName); }} className="bg-yellow-400 px-2 py-1 rounded mr-1">
                        ✏️
                      </button>
                    )}

                    <button onClick={() => mark(id, "present")} className="bg-green-500 text-white px-2 py-1 rounded mr-1">
                      P
                    </button>
                    <button onClick={() => mark(id, "absent")} className="bg-red-400 text-white px-2 py-1 rounded mr-1">
                      A
                    </button>
                    <button onClick={() => deleteStudent(id)} className="bg-gray-700 text-white px-2 py-1 rounded">
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Attendance;