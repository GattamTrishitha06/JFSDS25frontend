import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DonorDashboard = ({ user }) => {
  const quotes = [
    "We make a living by what we get. We make a life by what we give. - Winston Churchill",
    "Giving does not only precede receiving; it is the reason for it. It is in giving that we receive. - Israelmore Ayivor",
    "Happiness doesn’t result from what we get, but from what we give. - Ben Carson",
    "Remember that the happiest people are not those getting more, but those giving more. - H. Jackson Brown Jr.",
    "The meaning of life is to find your gift. The purpose of life is to give it away. - Pablo Picasso",
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!user) {
    return (
      <div className="error-container">
        <h2>Error: User not found</h2>
        <p>Please log in again.</p>
        <Link to="/signin">Go to Sign In</Link>
      </div>
    );
  }

  return (
    <div className="donor-dashboard">
      <aside className="sidebar">
        <ul>
          <li>
            <Link to="/donor-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/view-donations">View Donations</Link>
          </li>
          <li>
            <Link to="/donate">Donate</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/feedback">Feedback</Link>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="quote-container">
          <h2>Welcome to your Donor Dashboard, {user.name}!</h2>
          <p className="quote">{quotes[quoteIndex]}</p>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
