import Landing from "./Landing";
import Users from "./Users";
import FacultyDashboard from "./FacultyDashboard";
import StudentDashboard from "./StudentDashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
