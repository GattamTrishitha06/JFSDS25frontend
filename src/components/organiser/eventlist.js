import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setEvents(data.data);
        } else {
          throw new Error(data.message || "Unknown error");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleEdit = (eventId) => {
    console.log("Edit event", eventId);
  };

  const handleDelete = (eventId) => {
    console.log("Delete event", eventId);
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="event-list-container">
      <h1>Event List</h1>
      {events.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Location</th>
              <th>Date</th>
              <th>Organization</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.location}</td>
                <td>{event.date}</td>
                <td>{event.organization}</td>
                <td>
                  <EventImage eventId={event.id} />
                </td>
                <td>
                  <button
                    className="action-button edit-button"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

// EventImage component definition
const EventImage = ({ eventId }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      const image = await fetchEventImage(eventId);
      setImageSrc(image);
    };

    loadImage();
  }, [eventId]);

  return imageSrc ? (
    <img src={imageSrc} alt="Event" style={{ width: "100px", height: "100px" }} />
  ) : (
    <p>Loading image...</p>
  );
};

// Fetch the image (helper function moved to be reusable)
const fetchEventImage = async (eventId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/events/${eventId}/image`);
    const data = await response.json();
    if (data.success) {
      return `data:image/jpeg;base64,${data.data}`; // Return Base64 image string
    } else {
      throw new Error(data.message || "Image not found");
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

export default EventList;
