import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dateofbirth: "",
    email: "",    // Email is required and will be used as the primary key
    password: "",
    role: "",     // Role will be either "Fundraiser", "Donor", or "Organizer"
    contact: "",
  });

  const [loading, setLoading] = useState(false); // Loading state to disable button during submission
  const [error, setError] = useState(""); // Error state for any error message

  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button while submitting

    // Clear previous errors
    setError("");

    // Validation to make sure the email and password are not empty
    if (!formData.email || !formData.password || !formData.name || !formData.contact) {
      setError("Please fill all the required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/donor/api/donorregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as a JSON object
      });

      if (response.ok) {
        alert("Signup successful!");
        navigate("/signin"); // Redirect to sign-in page after successful sign-up
      } else {
        const result = await response.json();
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Enable button after submission
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <a href="/" className="back-to-home">Back to Home</a>
        <h2>Signup</h2>

        {/* Display error message if exists */}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateofbirth"
              value={formData.dateofbirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Fundraiser">Fundraiser</option>
              <option value="Donor">Donor</option> {/* Corrected the value for Donor */}
              <option value="Organizer">Organizer</option>
            </select>
          </div>
          <div>
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
