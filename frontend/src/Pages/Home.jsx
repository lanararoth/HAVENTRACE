import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Card from '../components/card/Card';
import missingCases from '../assets/data/Data'; // Import data from Data.jsx

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCases, setFilteredCases] = useState(missingCases.slice(0, 6));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = missingCases.filter((caseItem) =>
      caseItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCases(filtered.slice(0, 6));
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HavenTrace</h1>
          <p className="hero-description">See , Share , Solve</p>

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
        </div>
      </section>

      {/* Card Section */}
      <section className="card-section">
        <div className="card-container">
          {filteredCases.map((caseItem) => (
            <Card
              key={caseItem.id}
              id={caseItem.id} // Pass id here
              imageSrc={caseItem.imageSrc}
              name={caseItem.name}
              age={caseItem.age}
              gender={caseItem.gender}
              contact={caseItem.contact}
              buttonText="Learn More"
            />
          ))}
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