export const API_URL = "http://localhost:8080/api";

// Get all students
export async function GetStudents() {
    const response = await fetch(API_URL + "/students");
    return await response.json();
}

// Submit attendance
export async function SubmitAttendance(data) {
    const response = await fetch(API_URL + "/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return await response.json();
}