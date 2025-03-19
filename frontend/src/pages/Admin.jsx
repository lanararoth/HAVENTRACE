import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";
const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Hardcoded Admin Credentials (Replace with API)
  const adminCredentials = {
    username: "Admin",
    password: "123@Admin@HT",
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    if (username === adminCredentials.username && password === adminCredentials.password) {
      window.open("http://localhost:3001/", "_blank"); // Opens the admin panel in a new tab/window
    } else {
      setError("Invalid username or password");
    }
  };
  

  return (
    <div className="admin-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              className="admin-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
