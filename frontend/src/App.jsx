import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Attendance from "./pages/Attendance";
import Homepage from "./pages/Homepage";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/attendance" element={<Attendance />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;