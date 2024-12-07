import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    try {
      const response = await fetch("http://localhost:8080/donor/api/donorlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const result = await response.json();
        const { email, name, role } = result;

        // Save user data in localStorage
        localStorage.setItem("user", JSON.stringify({ email, name, role }));
        setUser({ email, name, role });

        // Navigate to appropriate dashboard
        if (role === "Donor") {
          navigate("/donor-dashboard");
        } else if (role === "Fundraiser") {
          navigate("/fundraiser-dashboard");
        } else if (role === "Organizer") {
          navigate("/organizer-dashboard");
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form">
        <a href="/" className="back-to-home">close</a>
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        {error && <p className="error">{error}</p>}

        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
}

export default SignIn;
