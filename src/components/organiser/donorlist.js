import React, { useEffect, useState } from "react";



const DonorList = ({ user }) => {
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    console.log("User Role in DonorList:", user?.role);  // Debugging user role
  }, [user]);
  
  if (!user || user.role !== "Organizer") {
    return <p>Access denied. You are not authorized to view this page.</p>;
  }
  

  if (!user || user.role !== "Donor") {
    return <p>Access denied. You are not authorized to view this page.</p>;
  }

  return (
    <div className="donor-list-container">
      <h2 className="donor-list-title">Donor Details</h2>
      {donor ? (
        <div className="donor-details">
          <p>
            <strong>Name:</strong> {donor.name}
          </p>
          <p>
            <strong>Email:</strong> {donor.email}
          </p>
        </div>
      ) : (
        <p>Loading donor details...</p>
      )}
    </div>
  );
};

export default DonorList;
