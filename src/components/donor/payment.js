import React, { useState, useEffect } from "react";
import axios from "axios";

// Import images for the payment methods
import creditCardImage from "../../assets/creditcard.png";
import paytmImage from "../../assets/netbanking.png";
import bankTransferImage from "../../assets/banktrnsfer.png";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [donationAmount, setDonationAmount] = useState(100);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [totalDonated, setTotalDonated] = useState(0);
  const [goalAmount, setGoalAmount] = useState(1000); // Set your goal amount
  const [message, setMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const fundraiserId = 1; // Assuming the fundraiser ID is 1

  // Fetch initial fundraiser details from the backend
  useEffect(() => {
    const fetchFundraiserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/fundraisers/${fundraiserId}`);
        const { raisedAmount: donated, amount: goal } = response.data; // Adjusted for correct field names
        setTotalDonated(donated);
        setGoalAmount(goal);
      } catch (error) {
        console.error("Error fetching fundraiser details", error);
      }
    };

    fetchFundraiserData();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setPaymentDetails({});
  };

  const handleDonationAmountChange = (e) => {
    const value = e.target.value;
    setDonationAmount(value);
    setIsValidAmount(value >= 100);
  };

  const handleDonation = async () => {
    try {
      // Send only the donationAmount as the backend expects
      const response = await axios.post(
        `http://localhost:5000/api/fundraisers/${fundraiserId}/donate`,
        donationAmount // Send the raw number directly
      );
  
      // Assuming the server responds with success
      setTotalDonated(totalDonated + parseFloat(donationAmount));
      setMessage("Thank you for your donation!");
  
      // Clear the message after a few seconds
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error submitting donation", error);
      setMessage("Failed to process your donation. Please try again.");
    }
  };
  
  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="payment-container">
      {/* Global Instructions Section */}
      <div className="instructions">
        <h2 className="instructions-title">How to Make a Donation</h2>
        <div className="instructions-content">
          <p><strong>Choose your preferred payment method.</strong></p>
          <p><strong>Fill in the required details for the selected method.</strong></p>
          <p><strong>Enter the amount you wish to donate (minimum $100).</strong></p>
          <p><strong>Click on "Donate" to proceed with your donation.</strong></p>
        </div>
      </div>

      {/* Payment Method Selection */}
      <h2 className="payment-title">Choose Payment Method</h2>
      <div className="payment-options-container">
        <div
          className={`payment-option ${selectedPaymentMethod === "creditCard" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodChange("creditCard")}
        >
          <div className="payment-option-content">
            <img src={creditCardImage} alt="Credit Card" className="payment-icon" />
            <h3>Credit/Debit Card</h3>
          </div>
        </div>

        <div
          className={`payment-option ${selectedPaymentMethod === "netBanking" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodChange("netBanking")}
        >
          <div className="payment-option-content">
            <img src={paytmImage} alt="NetBanking/UPI" className="payment-icon" />
            <h3>NetBanking/UPI</h3>
          </div>
        </div>

        <div
          className={`payment-option ${selectedPaymentMethod === "bankTransfer" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodChange("bankTransfer")}
        >
          <div className="payment-option-content">
            <img src={bankTransferImage} alt="Bank Transfer" className="payment-icon" />
            <h3>Bank Transfer</h3>
          </div>
        </div>
      </div>

      {/* Dynamic Forms for Payment Methods */}
      {selectedPaymentMethod === "creditCard" && (
        <div className="payment-form">
          <h3>Credit Card Details</h3>
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            placeholder="Enter Account Number"
            onChange={handlePaymentDetailsChange}
          />
          <label>Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            onChange={handlePaymentDetailsChange}
          />
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            placeholder="Enter CVV"
            onChange={handlePaymentDetailsChange}
          />
        </div>
      )}

      {selectedPaymentMethod === "netBanking" && (
        <div className="payment-form">
          <h3>Net Banking/UPI Details</h3>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            onChange={handlePaymentDetailsChange}
          />
        </div>
      )}

      {selectedPaymentMethod === "bankTransfer" && (
        <div className="payment-form">
          <h3>Bank Transfer Details</h3>
          <label>Bank Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value="9876543210"
            readOnly
          />
          <label>Account Name</label>
          <input
            type="text"
            name="accountName"
            value="XYZ Charity Fund"
            readOnly
          />
          <label>IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value="ABCDEF12345"
            readOnly
          />
        </div>
      )}

      {/* Donation Amount Section */}
      {selectedPaymentMethod && (
        <div className="donation-amount">
          <input
            type="number"
            value={donationAmount}
            onChange={handleDonationAmountChange}
            min="100"
            placeholder="Enter Donation Amount"
          />
          <button disabled={!isValidAmount} onClick={handleDonation}>
            Donate ${donationAmount}
          </button>
          {!isValidAmount && <p className="invalid-amount">Minimum donation amount is $100.</p>}
        </div>
      )}

      {/* Donation Status */}
      <div className="donation-status">
        <p>Total Donated: ${totalDonated}</p>
        <p>Goal Amount: ${goalAmount}</p>
        <p>Amount Still Needed: ${goalAmount - totalDonated}</p>
      </div>

      {/* Thank You Message */}
      {message && <div className="thank-you-message">{message}</div>}
    </div>
  );
};

export default Payment;
