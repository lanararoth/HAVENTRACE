import { useState, useEffect } from "react";
import "../styles/MissingCases.css";
import Card from "../components/card/Card";

const API_URL = "http://127.0.0.1:8000/api/missingcases/get/";

const MissingCases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [missingCases, setMissingCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch cases");
      }
      const data = await response.json();
      console.log("Fetched Cases:", data); // Debugging
      setMissingCases(data);
      setFilteredCases(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = missingCases.filter((caseItem) =>
      caseItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCases(filtered);
  };

  return (
    <div className="missing-cases-container">
      <h1 className="missing-cases-title">Missing Cases</h1>

      {/* Search Bar */}
      <form className="search-container" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="spacer"></div> {/* Added space between search and cards */}

      <div className="missing-cases-grid">
        {filteredCases.length > 0 ? (
          filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              id={caseItem.id}
              imageSrc={`http://127.0.0.1:8000${caseItem.photo}`} // Correct image path
              name={caseItem.name}
              age={caseItem.age}
              gender={caseItem.gender}
              contact={caseItem.parent_phone_number}
              buttonText="Learn More"
            />
          ))
        ) : (
          <p className="no-results">No matching cases found.</p>
        )}
      </div>
    </div>
  );
};

export default MissingCases;
