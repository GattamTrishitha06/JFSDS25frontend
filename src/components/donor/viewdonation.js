import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom

const ViewDonations = () => {
  const [fundraisers, setFundraisers] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    // Fetch the fundraiser details
    const fetchFundraisers = async () => {
      try {
        const response = await fetch("/api/fundraisers");
        if (response.ok) {
          const data = await response.json();
          setFundraisers(data);
        } else {
          console.error("Failed to fetch fundraisers.");
        }
      } catch (error) {
        console.error("Error fetching fundraisers:", error);
      }
    };

    fetchFundraisers();
  }, []);

  // Function to handle donation button click
  const handleDonate = (fundraiserId) => {
    // Navigate to payment page, passing the fundraiserId as a query parameter (or you can use state)
    navigate(`/payment?fundraiserId=${fundraiserId}`);
  };

  return (
    <div className="view-donations">
      <h1 className="page-title">Available Fundraisers</h1>
      <div className="fundraisers-container">
        {fundraisers.map((fundraiser) => (
          <div className="fundraiser-box" key={fundraiser.id}>
            <img
              src={`data:image/jpeg;base64,${fundraiser.image}`}
              alt={fundraiser.name}
              className="fundraiser-image"
            />
            <div className="fundraiser-details">
              <h3>{fundraiser.name}</h3>
              <p><strong>Location:</strong> {fundraiser.location}</p>
              <p><strong>Target Amount:</strong> ${fundraiser.amount}</p>
              <p><strong>Reason:</strong> {fundraiser.reason}</p>
              {/* Update button to handle donation click */}
              <button
                className="donate-button"
                onClick={() => handleDonate(fundraiser.id)}  // Pass fundraiser id when clicked
              >
                Donate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewDonations;
