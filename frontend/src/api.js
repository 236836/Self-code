import axios from "axios";
export const API_URL = "http://103.172.26.29:8060/api";


// 1. Register User
export async function registerUser(name, email, password) {
  const res = await axios.post(API_URL + "/register", { name, email, password });
  return res.data;
}

// 2. Login User
export async function loginUser(email, password) {
  const res = await axios.post(API_URL + "/login", { email, password });
  return res.data;
}

// 3. Get Students
export async function GetStudents() {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL + "/students", {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
}

// 4. Submit Attendance
export async function SubmitAttendance(data) {
  const token = localStorage.getItem("token");
  const res = await axios.post(API_URL + "/attendance", data, {
    headers: { Authorization: "Bearer " + token },
  });
  return res.data;
}