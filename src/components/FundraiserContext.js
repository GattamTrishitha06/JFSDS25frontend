import React, { createContext, useState } from "react";

export const FundraiserContext = createContext();

export const FundraiserProvider = ({ children }) => {
  const [fundraisers, setFundraisers] = useState([
    {
      title: "Medical Fundraiser for John Doe",
      description:
        "Help John fight his battle against cancer. Your support can save a life. John needs medical treatment that costs a large amount, and every contribution matters in making his recovery possible. Please donate and share to make a difference.",
      goal: "₹500,000",
      raised: "₹120,000",
    },
    // Add other initial fundraisers if needed
  ]);

  const addFundraiser = (newFundraiser) => {
    setFundraisers((prevFundraisers) => [...prevFundraisers, newFundraiser]);
  };

  return (
    <FundraiserContext.Provider value={{ fundraisers, addFundraiser }}>
      {children}
    </FundraiserContext.Provider>
  );
};
