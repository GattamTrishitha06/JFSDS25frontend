// HowItWorks.js
import React, { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    const steps = document.querySelectorAll(".step");
    const handleScroll = () => {
      steps.forEach((step) => {
        if (step.getBoundingClientRect().top < window.innerHeight - 100) {
          step.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="how-it-works" id="how-it-works">
      <h1>How It Works</h1>
      <div className="step fade-in">
        <h2>Step 1: Start Your Fundraiser</h2>
        <p>It’ll take only 2 minutes. Just tell us a few details about you and the ones you are raising funds for.</p>
      </div>
      <div className="step fade-in">
        <h2>Step 2: Share Your Fundraiser</h2>
        <p>Share the fundraiser with friends and family. Support will start pouring in from the community.</p>
      </div>
      <div className="step fade-in">
        <h2>Step 3: Withdraw Funds</h2>
        <p>The funds raised can be withdrawn hassle-free directly to your bank account.</p>
      </div>
    </section>
  );
};

export default HowItWorks;
