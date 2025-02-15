import React, { useState } from "react";
import "../styles/PoliceList.css"; // Ensure you have styles

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
      
      
        const PoliceList = () => {
            const [search, setSearch] = useState("");
          
            // Filtering police stations dynamically
            const filteredStations = policeStations.filter(
              (station) =>
                station.name.toLowerCase().includes(search.toLowerCase()) ||
                station.district.toLowerCase().includes(search.toLowerCase()) ||
                station.place.toLowerCase().includes(search.toLowerCase()) // Search by place
            );
          
            return (
              <div className="police-list-page">
                <h1>Police Stations in Kerala</h1>
          
                {/* Search Bar Container */}
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search by station name, district, or place..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Updates instantly when typing
                    className="search-bar"
                  />
                  <button className="search-button">Search</button> {/* Search Button remains */}
                </div>
          
                {/* Display filtered results */}
                <div className="station-list">
                  {filteredStations.map((station) => (
                    <div key={station.id} className="station-item">
                      <h2>{station.name}</h2>
                      <p><strong>District:</strong> {station.district}</p>
                      <p><strong>Place:</strong> {station.place}</p>
                      {/* Clickable Contact Number */}
                      <p>
                        <strong>Contact:</strong> 
                        <a href={`tel:${station.contact}`} className="call-link">
                          {station.contact}
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          };
          
          export default PoliceList;