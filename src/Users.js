import student from "./images/student.png";
import admin from "./images/admin.png";
import faculty from "./images/teacher.png";
import { useState } from "react";
import AuthForm from "./AuthForm";

function Users() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div
      className="text-center p-4"
      style={{
        backgroundColor: "#D9415D",
        color: "white",
        textShadow: "1.5px 1.5px black",
        height: "100vh",
      }}
    >
      <h1 className="mb-4">Choose Account Type</h1>
      <div className="d-flex justify-content-around">
        {[
          { role: "student", img: student, label: "Student" },
          { role: "faculty", img: faculty, label: "Faculty" },
          { role: "admin", img: admin, label: "Admin" },
        ].map(({ role, img, label }) => (
          <div
            key={role}
            onClick={() => setSelectedRole(role)}
            style={{
              border:
                selectedRole === role
                  ? "3px solid white"
                  : "2px solid transparent",
              padding: "15px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",
              backgroundColor:
                selectedRole === role ? "#B03050" : "transparent",
            }}
            className="user-card"
          >
            <img
              src={img}
              alt={label}
              style={{ width: "12rem", borderRadius: "8px" }}
            />
            <h4 className="mt-2">{label}</h4>
          </div>
        ))}
      </div>

      <AuthForm selectedRole={selectedRole} />
    </div>
  );
}

export default Users;