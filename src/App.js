import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import BrowseFundraisers from "./components/BrowseFundraisers";

// Import Fundraiser and Organizer components
import FundraiserFeedback from "./components/fundraiser/fundraiserfeedback"
import DonorList from "./components/organiser/donorlist"
import FundraiserList from "./components/organiser/fundraiserlist"
import EventList from "./components/organiser/eventlist"
import EventForm from "./components/organiser/eventform"
import Payment from "./components/donor/payment"
import ViewDonations from "./components/donor/viewdonation";
import FundraiserCreate from "./components/fundraiser/fundraisercreate";
import FundraiserDashboard from "./components/fundraiser/fundraiserdashbord"; 
import OrganizerDashboard from "./components/organiser/organiserdashboard";
import FundraiserProfile from "./components/fundraiser/fundraiserprofile";
import OrganizerProfile from "./components/organiser/organiserprofile";

// Import Donor components
import DonorDashboard from "./components/donor/donordashboard";

import "./styles.css";

function App() {
  const [user, setUser] = useState(null);

  // Load user data from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Navbar user={user} onSignOut={handleSignOut} />
                <HeroSection />
                <HowItWorks />
                <Footer />
              </>
            }
          />

          {/* Donor Dashboard */}
          <Route
            path="/donor-dashboard"
            element={
              user && user.role === "Donor" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <DonorDashboard user={user} />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />

          {/* View Donations */}
          <Route
            path="/view-donations"
            element={
              user && user.role === "Donor" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <ViewDonations />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />

          {/* Payment Route */}
          <Route path="/payment" element={<Payment />} /> {/* Payment Route */}

          {/* Fundraiser Dashboard */}
          <Route
            path="/fundraiser-dashboard"
            element={
              user && user.role === "Fundraiser" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <FundraiserDashboard user={user} />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />
          <Route
  path="/fundraiser-feedback"
  element={
    user && user.role === "Fundraiser" ? (
      <>
        <Navbar user={user} onSignOut={handleSignOut} />
        <FundraiserFeedback />
        <Footer />
      </>
    ) : (
      <Navigate to={user ? "/" : "/signin"} />
    )
  }
/>



          {/* Fundraiser Create */}
          <Route
            path="/fundraiser-create"
            element={
              user && user.role === "Fundraiser" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <FundraiserCreate />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />

          {/* Organizer Dashboard */}
          <Route
            path="/organizer-dashboard"
            element={
              user && user.role === "Organizer" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <OrganizerDashboard />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />
          <Route
  path="/event-form"
  element={
    user && user.role === "Organizer" ? (
      <>
        <Navbar user={user} onSignOut={handleSignOut} />
        <EventForm />
        <Footer />
      </>
    ) : (
      <Navigate to={user ? "/" : "/signin"} />
    )
  }
/>
<Route
  path="/event-list"
  element={
    user && user.role === "Organizer" ? (
      <>
        <Navbar user={user} onSignOut={handleSignOut} />
        <EventList />
        <Footer />
      </>
    ) : (
      <Navigate to={user ? "/" : "/signin"} />
    )
  }
/>
<Route
  path="/fundraiser-list"
  element={
    user && user.role === "Organizer" ? (
      <>
        <Navbar user={user} onSignOut={handleSignOut} />
        <FundraiserList />
        <Footer />
      </>
    ) : (
      <Navigate to={user ? "/" : "/signin"} />
    )
  }
/>
<Route
  path="/donor-list"
  element={
    user && user.role === "Donor" ? (  // Check if role is Donor
      <>
        <Navbar user={user} onSignOut={handleSignOut} />
        <DonorList user={user} />
        <Footer />
      </>
    ) : (
      <Navigate to={user ? "/" : "/signin"} />
    )
  }
/>



 {/* Fundraiser Profile */}
          <Route
            path="/fundraiser-profile"
            element={
              user && user.role === "Fundraiser" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <FundraiserProfile />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />

          {/* Organizer Profile */}
          <Route
            path="/organizer-profile"
            element={
              user && user.role === "Organizer" ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <OrganizerProfile />
                  <Footer />
                </>
              ) : (
                <Navigate to={user ? "/" : "/signin"} />
              )
            }
          />

          {/* Browse Fundraisers */}
          <Route
            path="/browse-fundraisers"
            element={
              user ? (
                <>
                  <Navbar user={user} onSignOut={handleSignOut} />
                  <BrowseFundraisers />
                  <Footer />
                </>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
