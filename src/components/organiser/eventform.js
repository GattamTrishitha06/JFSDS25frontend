import React, { useState } from "react";
import axios from "axios";

function EventForm() {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organization, setOrganization] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    console.log("Selected file:", selectedFile); // Log the selected file
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("organization", organization);
    formData.append("image", image);

    // Debugging FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/events", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Ensure to check the structure of the response
      setMessage(response.data?.message || "Event added successfully");
      setEventName("");
      setLocation("");
      setDate("");
      setOrganization("");
      setImage(null);
    } catch (error) {
      console.error("Error adding event:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to add event. Please try again.");
    }
  };

  return (
    <div className="event-form-container">
      <h3>Add New Event</h3>
      <form onSubmit={handleFormSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Organization Name:</label>
        <input
          type="text"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          required
        />

        <label>Event Image:</label>
        <input type="file" onChange={handleImageChange} required />

        <button type="submit">Add Event</button>
      </form>

      {message && <p>{message}</p>}  {/* Display success or error message */}
    </div>
  );
}

export default EventForm;
