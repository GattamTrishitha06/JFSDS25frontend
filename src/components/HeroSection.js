import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/image.png';

const HeroSection = ({ addFundraiser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    status: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add fundraiser to the list
    addFundraiser({
      title: `${formData.purpose} Fundraiser for ${formData.name}`,
      description: `${formData.name} is seeking help for ${formData.purpose.toLowerCase()} expenses. Status: ${formData.status}.`,
      goal: '₹100,000',
      raised: '₹0',
    });

    // Show success message
    setSuccessMessage('Added successfully!');
    
    // Reset form fields
    setFormData({
      name: '',
      email: '',
      phone: '',
      purpose: '',
      status: ''
    });

    // Automatically navigate to the Browse Fundraisers page after a delay
    setTimeout(() => {
      setSuccessMessage(''); // Clear the success message
      navigate('/browse-fundraisers');
    }, 1500);
  };

  return (
    <section className="hero-section">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
        }}
      ></div>
      <div className="background-overlay"></div>

      <div className="content">
        <h2>Medical Crowdfunding is the Best Way to Raise Money for Medical Expenses</h2>
        <p>Now with <strong>0% platform fees</strong></p>
        <p>Dhiraj (Aarohi’s father) raised ₹ 25,00,000 for Aarohi’s Cancer Treatment in Just 20 days</p>
      </div>
      <div className="form-section">
        <h3>Need Money Urgently?</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Mobile Number *"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          >
            <option value="">What will the funds be used for? *</option>
            <option value="Medical">Medical</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Hospitalisation status *</option>
            <option value="Hospitalized">Hospitalized</option>
            <option value="Discharged">Discharged</option>
          </select>
          <button type="submit" className="submit-button">
            START A FUNDRAISER
          </button>
        </form>

        {/* Show success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <p className="info">194 People started a fundraiser in the last 2 days</p>
      </div>
    </section>
  );
};

export default HeroSection;
