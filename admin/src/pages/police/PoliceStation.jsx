import { useState } from "react";
import "./PoliceStation.css";

const policeStations = [
  { id: 1, name: "Fort Police Station", district: "Thiruvananthapuram", place: "Thampanoor", contact: "+91 471 2338100" },
        { id: 2, name: "Nedumangad Police Station", district: "Thiruvananthapuram", place: "Nedumangad", contact: "+91 471 2808100" },
      
        { id: 3, name: "Kollam East Police Station", district: "Kollam", place: "Chinnakada", contact: "+91 474 2744100" },
        { id: 4, name: "Kottarakkara Police Station", district: "Kollam", place: "Kottarakkara", contact: "+91 474 2452200" },
      
        { id: 5, name: "Alappuzha North Police Station", district: "Alappuzha", place: "Vellakinar", contact: "+91 477 2253200" },
        { id: 6, name: "Cherthala Police Station", district: "Alappuzha", place: "Cherthala", contact: "+91 477 2812200" },
      
        { id: 7, name: "Kottayam West Police Station", district: "Kottayam", place: "Kanjikuzhy", contact: "+91 481 2580200" },
        { id: 8, name: "Pala Police Station", district: "Kottayam", place: "Pala", contact: "+91 482 2121100" },
      
        { id: 9, name: "Thodupuzha Police Station", district: "Idukki", place: "Thodupuzha", contact: "+91 486 2223200" },
        { id: 10, name: "Munnar Police Station", district: "Idukki", place: "Munnar", contact: "+91 486 5233200" },
      
        { id: 11, name: "Aluva Police Station", district: "Ernakulam", place: "Aluva", contact: "+91 484 2621100" },
        { id: 12, name: "Fort Kochi Police Station", district: "Ernakulam", place: "Fort Kochi", contact: "+91 484 2213200" },
      
        { id: 13, name: "Thrissur East Police Station", district: "Thrissur", place: "Chembukkavu", contact: "+91 487 2332200" },
        { id: 14, name: "Guruvayur Police Station", district: "Thrissur", place: "Guruvayur", contact: "+91 487 2556200" },
      
        { id: 15, name: "Palakkad Town Police Station", district: "Palakkad", place: "Stadium Bypass", contact: "+91 491 2521100" },
        { id: 16, name: "Ottapalam Police Station", district: "Palakkad", place: "Ottapalam", contact: "+91 491 2442100" },
      
        { id: 17, name: "Manjeri Police Station", district: "Malappuram", place: "Manjeri", contact: "+91 483 2763200" },
        { id: 18, name: "Tirur Police Station", district: "Malappuram", place: "Tirur", contact: "+91 494 2422200" },
      
        { id: 19, name: "Kasaba Police Station", district: "Kozhikode", place: "Nadakkavu", contact: "+91 495 2721234" },
        { id: 20, name: "Vadakara Police Station", district: "Kozhikode", place: "Vadakara", contact: "+91 495 2511100" },
      
        { id: 21, name: "Kalpetta Police Station", district: "Wayanad", place: "Kalpetta", contact: "+91 493 6202200" },
        { id: 22, name: "Sulthan Bathery Police Station", district: "Wayanad", place: "Sulthan Bathery", contact: "+91 493 6203200" },
      
        { id: 23, name: "Kannur Town Police Station", district: "Kannur", place: "Kannur Town", contact: "+91 497 2703200" },
        { id: 24, name: "Thalassery Police Station", district: "Kannur", place: "Thalassery", contact: "+91 497 2341100" },
      
        { id: 25, name: "Payyanur Police Station", district: "Kasargod", place: "Payyanur", contact: "+91 499 2202100" },
        { id: 26, name: "Kanhangad Police Station", district: "Kasargod", place: "Kanhangad", contact: "+91 499 2303100" },
];

const PoliceStation = () => {
  const [stations, setStations] = useState(policeStations);
  const [showForm, setShowForm] = useState(false);
  const [currentStation, setCurrentStation] = useState(null);

  const handleDelete = (id) => {
    const updatedStations = stations.filter((station) => station.id !== id);
    setStations(updatedStations);
  };

  const handleAdd = () => {
    setCurrentStation(null); // Reset the form for adding a new station
    setShowForm(true);
  };

  const handleEdit = (station) => {
    setCurrentStation(station); // Set the station details for editing
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, district, contact } = event.target.elements;

    if (currentStation) {
      // Edit existing station
      const updatedStations = stations.map((station) =>
        station.id === currentStation.id
          ? { ...station, name: name.value, district: district.value, contact: contact.value }
          : station
      );
      setStations(updatedStations);
    } else {
      // Add new station
      const newStation = {
        id: stations.length + 1, // Generate a new ID
        name: name.value,
        district: district.value,
        contact: contact.value,
      };
      setStations([...stations, newStation]);
    }

    setShowForm(false);
    setCurrentStation(null); // Clear the form
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentStation(null);
  };

  return (
    <div className="admin-police-stations">
      <h1 className="heading">Manage Police Stations</h1>
      <table className="stations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>District</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>{station.name}</td>
              <td>{station.district}</td>
              <td>{station.contact}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(station)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(station.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-button" onClick={handleAdd}>
        Add New Station
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{currentStation ? "Edit Police Station" : "Add New Police Station"}</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Station Name:</label>
            <input
              id="name"
              name="name"
              defaultValue={currentStation ? currentStation.name : ""}
              required
            />

            <label htmlFor="district">District:</label>
            <input
              id="district"
              name="district"
              defaultValue={currentStation ? currentStation.district : ""}
              required
            />

            <label htmlFor="contact">Contact Number:</label>
            <input
              id="contact"
              name="contact"
              defaultValue={currentStation ? currentStation.contact : ""}
              required
            />

            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {currentStation ? "Update" : "Add"}
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PoliceStation;
