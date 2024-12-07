import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FundraiserCreate = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    amount: "",
    reason: "",
    image: null,
  });

  const navigate = useNavigate();

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("reason", formData.reason);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    } else {
      alert("Please upload an image.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/fundraisers", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Fundraiser created successfully!");
        navigate("/fundraiser-dashboard");
      } else {
        const errorText = await response.text();
        console.error("Failed to create fundraiser:", errorText);
        alert(`Failed to create fundraiser: ${errorText}`);
      }
    } catch (error) {
      console.error("Error creating fundraiser:", error);
      alert("Error creating fundraiser. Check console for details.");
    }
  };

  return (
    <div className="fundraise-create">
      <h2>Create a Fundraiser</h2>
      <div className="category-selection">
        <h3>Select Fundraising Type</h3>
        <button onClick={() => handleCategorySelect("Food")}>Food</button>
        <button onClick={() => handleCategorySelect("Clothes")}>Clothes</button>
        <button onClick={() => handleCategorySelect("Money")}>Money</button>
      </div>

      {selectedCategory && (
        <form onSubmit={handleSubmit} className="fundraiser-form">
          <h3>Fundraiser Details for {selectedCategory}</h3>
          <label>
            Name of Fundraiser:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          

          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Target Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Reason for Fundraising:
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Upload Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </label>

          <button type="submit">Create Fundraiser</button>
        </form>
      )}
    </div>
  );
};

export default FundraiserCreate;
