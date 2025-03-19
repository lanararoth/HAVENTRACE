import { useEffect, useState } from "react";
import "./Users.css";

const Users = () => {
  const [parents, setParents] = useState([]);
  const [police, setPolice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const parentResponse = await fetch("http://127.0.0.1:8000/api/parents/get/");
        const policeResponse = await fetch("http://127.0.0.1:8000/api/police/get/");
  
        if (!parentResponse.ok || !policeResponse.ok) {
          throw new Error("Failed to fetch users");
        }
  
        const parentData = await parentResponse.json();
        const policeData = await policeResponse.json();
  
        console.log("Parent Data:", parentData);
        console.log("Police Data:", policeData);
  
        // Ensure consistent array handling
        setParents(Array.isArray(parentData) ? parentData : []);
        setPolice(Array.isArray(policeData) ? policeData : policeData?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  

  return (
    <div className="admin-users-container">
      <h1 className="admin-title">USERS</h1>
      {loading && <p className="loading-message">Loading users...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="user-section-title">Parents</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Parent Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Child Name</th>
              </tr>
            </thead>
            <tbody>
              {parents.map((parent) => (
                <tr key={parent.id}>
                  <td>{parent.id}</td>
                  <td>{parent.parent_name}</td>
                  <td>{parent.email}</td>
                  <td>{parent.contact_number}</td>
                  <td>{parent.address}</td>
                  <td>{parent.child_name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="user-section-title">Police</h2>
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Station Name</th>
                <th>Station Address</th>
              </tr>
            </thead>
            <tbody>
              {police.map((officer) => (
                <tr key={officer.id}>
                  <td>{officer.id}</td>
                  <td>{officer.station_name}</td>
                  <td>{officer.station_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Users;
