import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Card from '../components/card/Card';

const API_URL = "http://127.0.0.1:8000/api/missingcases/get/";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [missingCases, setMissingCases] = useState([]);

  // Fetch latest missing cases from API
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch cases");
        }
        const data = await response.json();
        setMissingCases(data.slice(-6).reverse()); // Get latest 6 cases
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCases();
  }, []);

  // Filter cases dynamically based on search query
  const filteredCases = missingCases.filter((caseItem) =>
    caseItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HavenTrace</h1>
          <p className="hero-description">See , Share , Solve</p>

          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange} // Updates instantly when typing
            />
            <button className="search-button">Search</button> {/* Optional button */}
          </div>
        </div>
      </section>

      {/* Card Section */}
      <section className="card-section">
        <div className="card-container">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                id={caseItem.id} // Pass id here
                imageSrc={`http://127.0.0.1:8000${caseItem.photo}`} // Fetch from backend
                name={caseItem.name}
                age={caseItem.age}
                gender={caseItem.gender}
                contact={caseItem.parent_phone_number}
                buttonText="Learn More"
              />
            ))
          ) : (
            <p className="no-results">❌ No matching cases found.</p> // Message for invalid searches
          )}
        </div>

        {/* More Button */}
        <div className="more-container">
          <Link to="/missing" className="more-link">
            More <span className="arrow">&#x25BC;</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
