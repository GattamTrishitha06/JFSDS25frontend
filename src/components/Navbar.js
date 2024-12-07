import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, onSignOut }) => {
  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="logo">DonationSphere</Link>
        <ul className="nav-links">
          {user && user.role === "Fundraiser" ? (
            <>
              <li><Link to="#">Fundraise For</Link></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><Link to="/fundraiser-dashboard">Fundraiser Dashboard</Link></li>
              <li><Link to="/fundraiser-create">Start a Fundraiser</Link></li>
            </>
          ) : user && user.role === "Donor" ? (
            <>
              <li><Link to="/donor-dashboard">Donor Dashboard</Link></li>
              <li><Link to="/browse-fundraisers">Browse Fundraisers</Link></li>
              <li><Link to="#">My Donations</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/browse-fundraisers">Browse Fundraisers</Link></li>
              <li><Link to="/fundraiser-create">Fundraise For</Link></li>

              <li><a href="#how-it-works">How It Works</a></li>
              <li><Link to="#">Search</Link></li>
            </>
          )}
        </ul>
        <div className="nav-buttons">
          {user ? (
            <>
              <span className="welcome-message">Hello, {user.name}!</span>
              <button onClick={onSignOut} className="sign-out-button">Sign Out</button>
            </>
          ) : (
            <Link to="/signin" className="sign-in">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
