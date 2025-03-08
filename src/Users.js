import { useState } from "react";

function Users() {
  //const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRoleSelect = (role) => {
    setRole(role);
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Basic validation for empty fields
    if (!username || !password || !role) {
      alert("Please provide username, password, and role.");
    }

    // Send POST request to backend to save the user data
    const response = await fetch("http://localhost:5003/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });

    const data = await response.text();
    alert(data);
  };

  return (
    <>
      <h1>Select your role</h1>
      <div
        className={`role ${role === "Admin" ? "selected" : ""}`}
        onClick={() => handleRoleSelect("Admin")}
      >
        <h3>Admin</h3>
        <p>The admin oversees the entire working of this system.</p>
      </div>
      <div
        className={`role ${role === "Student" ? "selected" : ""}`}
        onClick={() => handleRoleSelect("Student")}
      >
        <h3>Student</h3>
        <p>
          The student is able to browse through necessary events and
          participate.
        </p>
      </div>
      <div
        className={`role ${role === "Faculty" ? "selected" : ""}`}
        onClick={() => handleRoleSelect("Faculty")}
      >
        <h3>Faculty</h3>
        <p>The faculty is responsible for creating events.</p>
      </div>
      <div>
        <h2>Sign Up</h2>
        <p>
          Selected Role: <strong>{role || "None"}</strong>
        </p>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignup}>Sign Up</button>
        <a>Already have an account? Login</a>
      </div>
    </>
  );
}

export default Users;
