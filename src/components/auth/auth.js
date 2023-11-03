// Auth.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles.css";
import SignUpForm from "./SignUp";
import SignInForm from "./SignIn";

export default function Auth() {
  const navigate = useNavigate(); // Initialize navigate
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleSignIn = () => {
    // Assume successful sign-in
    navigate("/sidebar"); // Use navigate to navigate to the sidebar
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2>24 Hour Doctor Auth Page</h2>
      <div className={containerClass} id="container">
        {type === "signUp" ? <SignUpForm /> : <SignInForm onSignIn={handleSignIn} />}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
