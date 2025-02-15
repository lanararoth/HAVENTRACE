import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => { 
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/users"); // Redirect to login if no token
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/users/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized (token expired or invalid), logout user
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
