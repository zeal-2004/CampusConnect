import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthForm({ selectedRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New State
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setMessage("Please select a role first.");
      return;
    }
    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post("http://localhost:5020/login", {
          username,
          password,
          role: selectedRole,
        });
        setMessage(response.data.message);
        if (
          response.data.message === "Login successful" &&
          selectedRole === "faculty"
        ) {
          navigate("/faculty/dashboard", { state: { username } });
        }
      } else {
        // Signup logic
        const response = await axios.post("http://localhost:5020/signup", {
          username,
          password,
          role: selectedRole,
        });
        setMessage(response.data.message);
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-3">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", textShadow: "0px 0px" }}
      >
        <h2 className="text-center mb-3">
          {isLogin
            ? `Login as ${selectedRole || "?"}`
            : `Sign up as ${selectedRole || "?"}`}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-3">
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Sign up."
              : "Have an account? Login."}
          </span>
        </p>
        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
