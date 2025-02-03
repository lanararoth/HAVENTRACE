import { useState } from "react";
import "../styles/MissingCases.css";
import Card from "../components/card/Card";
import missingCases from "../assets/data/Data";

const MissingCases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCases, setFilteredCases] = useState(missingCases);

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
              imageSrc={caseItem.imageSrc}
              name={caseItem.name}
              age={caseItem.age}
              gender={caseItem.gender}
              contact={caseItem.contact}
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
