import missingCases from "../../assets/data/Data";

const Notify = () => {

  const handleNotifyPolice = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/missingcases/notify/${id}/`, {
        method: "POST",
      });
  
      if (response.ok) {
        alert(`Police notified successfully for case ID: ${id}`);
      } else {
        alert(`Failed to notify police. Please try again.`);
      }
    } catch (error) {
      console.error("Error notifying police:", error);
      alert("Network error. Check console for details.");
    }
  };
  
  return (
    <div className="missing-cases-admin-container">
      <h1 className="page-title">Missing Cases - Admin Panel</h1>

      {/* Table for displaying missing cases */}
      <table className="missing-cases-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Last Seen</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missingCases.map((caseItem) => (
            <tr key={caseItem.id}>
              <td>
                <img
                  src={caseItem.imageSrc}
                  alt={caseItem.name}
                  className="case-image"
                />
              </td>
              <td>{caseItem.name}</td>
              <td>{caseItem.age}</td>
              <td>{caseItem.gender}</td>
              <td>{caseItem.lastSeen}</td>
              <td>{caseItem.contact}</td>
              <td>
                <button
                  className="action-button notify-button"
                  onClick={() => handleNotifyPolice(caseItem.id)}
                >
                  Notify Police
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );



  
};

export default Notify;