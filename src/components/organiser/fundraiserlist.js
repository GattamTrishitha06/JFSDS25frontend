import React, { useEffect, useState } from 'react';
import axios from 'axios';


function FundraiserList() {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/fundraisers')
            .then((response) => {
                setFundraisers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching fundraisers:', error);
            });
    }, []);

    return (
        <div className="fundraiser-list-container">
            <h1 className="fundraiser-title">Fundraiser List</h1>
            <div className="fundraiser-list">
                {fundraisers.map((fundraiser) => (
                    <div key={fundraiser.id} className="fundraiser-card">
                        <h2 className="fundraiser-name">{fundraiser.name}</h2>
                        <p className="fundraiser-location">Location: {fundraiser.location}</p>
                        <p className="fundraiser-amount">Target Amount: ₹{fundraiser.amount}</p>
                        <p className="fundraiser-raised">Raised Amount: ₹{fundraiser.raisedAmount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FundraiserList;
