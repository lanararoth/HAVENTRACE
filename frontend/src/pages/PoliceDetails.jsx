import React from "react";
import { useParams } from "react-router-dom";
import "../styles/PoliceDetails.css"; // Ensure you have styles

const policeStations = [
  { id: 1, name: "Fort Police Station", district: "Thiruvananthapuram", contact: "+91 471 2338100" },
  { id: 2, name: "Aluva Police Station", district: "Ernakulam", contact: "+91 484 2621100" },
  { id: 3, name: "Kasaba Police Station", district: "Kozhikode", contact: "+91 495 2721234" },
  // Add more police stations as needed
];

const PoliceDetails = () => {
  const { id } = useParams();
  const station = policeStations.find((station) => station.id === parseInt(id));

  if (!station) {
    return <div>Station not found</div>;
  }

  return (
    <div className="police-details-page">
      <h1>{station.name}</h1>
      <p><strong>District:</strong> {station.district}</p>
      <p><strong>Contact:</strong> {station.contact}</p>
      <Link to="/police-stations" className="back-link">
        Back to List
      </Link>
    </div>
  );
};

export default PoliceDetails;