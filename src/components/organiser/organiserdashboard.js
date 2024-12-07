import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const quotes = [
  "We make a living by what we get. We make a life by what we give. - Winston Churchill",
  "Giving does not only precede receiving; it is the reason for it. It is in giving that we receive. - Israelmore Ayivor",
  "Happiness doesn’t result from what we get, but from what we give. - Ben Carson",
  "Remember that the happiest people are not those getting more, but those giving more. - H. Jackson Brown Jr.",
  "The meaning of life is to find your gift. The purpose of life is to give it away. - Pablo Picasso",
];

function OrganizerDashboard() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="organizer-dashboard">
      <div className="sidebar">
        <ul>
          <li onClick={() => handleNavigation("/event-form")}>Events</li>
          <li onClick={() => handleNavigation("/event-list")}>Event Lists</li> {/* Navigate to Event List */}
          <li onClick={() => handleNavigation("/fundraiser-list")}>Fundraiser List</li>
          
          <li onClick={() => handleNavigation("/donor-list")}>Donor List</li>


          <li>Analysis</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="quote-container">
          <h2>Inspiration for Today</h2>
          <div className="quote">
            <p>{quotes[currentQuoteIndex]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;
