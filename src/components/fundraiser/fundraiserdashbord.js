import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use this to navigate programmatically

const FundraiserDashboard = ({ user }) => {
  const [activeOption, setActiveOption] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Changed from useHistory() to useNavigate()

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/${user.id}/profile`);
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    setActiveOption(option); // Set the active option for UI purposes
  
    if (option === "Fundraise for") {
      navigate("/fundraiser-create"); // Navigate to fundraiser creation
    } else if (option === "Feedback") {
      navigate("/fundraiser-feedback"); // Navigate to the feedback page
    }
    // Add more options as needed
  };
  
  

  return (
    <div className="fundraiser-dashboard">
      <h1 className="dashboard-title">Fundraiser Dashboard</h1>
      <div className="options-container">
        <div className="option-box" onClick={() => handleOptionClick("Profile")}>
          <h3>Profile</h3>
          <p>View and edit your profile details.</p>
          <button className="view-button">View</button>
        </div>

        <div className="option-box" onClick={() => handleOptionClick("Amount Raised")}>
          <h3>Amount Raised</h3>
          <p>Track the total amount raised for your campaigns.</p>
          <button className="view-button">View</button>
        </div>

        <div className="option-box" onClick={() => handleOptionClick("Donor List")}>
          <h3>Donor List</h3>
          <p>See the list of all donors for your fundraisers.</p>
          <button className="view-button">View</button>
        </div>

        <div className="option-box" onClick={() => handleOptionClick("Manage Fundraiser")}>
          <h3>Manage Fundraiser</h3>
          <p>Manage and organize your fundraising campaigns.</p>
          <button className="view-button">View</button>
        </div>

        <div className="option-box" onClick={() => handleOptionClick("Feedback")}>
          <h3>Feedback</h3>
          <p>Check and respond to feedback.</p>
          <button className="view-button">View</button>
        </div>

        <div className="option-box" onClick={() => handleOptionClick("Fundraise for")}>
          <h3>Fundraise for</h3>
          <p>Raise your funds here.</p>
          <button className="view-button">View</button>
        </div>
      </div>

      <main className="main-content">
        {activeOption === "Profile" && (
          <div className="profile-section">
            {loading ? (
              <p>Loading...</p>
            ) : userDetails ? (
              <div className="profile-box">
                <h2>Profile Details</h2>
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Role:</strong> {userDetails.role}</p>
              </div>
            ) : (
              <p>No user details available.</p>
            )}
          </div>
        )}

        {/* Other Options */}
      </main>
    </div>
  );
};

export default FundraiserDashboard;
